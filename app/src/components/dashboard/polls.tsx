import { handleInputChange } from "@/lib/handleInputChange";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { notify, ToastType } from "../header";
import { InputField } from "../InputField";
import OutlineButton from "../OutlineButton";
import { useSession } from "../SessionProvider";
import { Spinner } from "../Spinner";
import { TabSelect } from "../TabSelect";
import { useToasts } from "../ToastProvider";

const PollOption = ({ name = "", className = "", selected = false, onClick = () => { } }) => {
  return <button className={`w-full px-2 py-1 text-md border-solid border-2 ${selected ? 'bg-pink border-pink text-pink' : 'bg-white border-white text-white'} bg-opacity-0 hover:bg-opacity-10 transition-all ease-in-out ${className}`} onClick={onClick}>{name}</button>
}

const Poll = ({ data, edit, setView }) => {
  const { session } = useSession();
  const { toastDispatch } = useToasts();
  const [choice, setChoice] = useState(data.responses.length > 0 ? { optionIndex: data.responses[0].optionIndex, response: data.responses[0] } : null)
  const [input, setInput] = useState({ password: '' })

  const close = async () => {
    const res = await fetch('/api/poll', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.access_token}`
      },
      body: JSON.stringify({
        id: data.id
      })
    })

    notify(toastDispatch, "", "Closed Poll: " + data.text, ToastType.SUCCESS)
  }

  const vote = async (ind) => {
    if (data.closed) return;

    const res = await fetch('/api/poll/response', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.access_token}`
      },
      body: JSON.stringify({
        responseId: choice ? choice.response.id : undefined,
        password: input.password.length > 0 ? input.password.trim() : undefined,
        pollId: data.id,
        optionIndex: ind
      })
    })

    if (res.status == 200) {
      const newResponse = (await res.json()).response
      setChoice({ optionIndex: ind, response: newResponse })
      notify(toastDispatch, "", `Voted "${data.options[ind]}" in poll: ${data.text}`, ToastType.SUCCESS)
    } else {
      notify(toastDispatch, "", `Invalid password for poll ${data.text}`, ToastType.DANGER)
    }
  }

  const view = async () => {
    const res = await (await fetch(`/api/poll/response?id=${data.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.access_token}`
      },
    })).json()

    const d = res.responses.map(r => r.author.name + " (" + data.options[r.optionIndex] + ")")
    setView(d)
  }
  const startDate = new Date(data.startDate)
  const startDateTxt = `${startDate.getMonth() + 1}/${startDate.getDay()}/${startDate.getFullYear()} ${startDate.getHours() % 12}:${startDate.getMinutes() < 10 ? '0' : ''}${startDate.getMinutes()} ${startDate.getHours() >= 12 ? 'PM' : 'AM'} `

  return (
    <div className='p-4 mx-2 bg-navy-light bg-opacity-50 rounded-md'>
      <div className=''>
        <p className='text-white text-sm'>Status: <b>{data.closed ? 'Closed' : 'Open'}</b></p>
        <p className='text-white text-sm'>Posted: {startDateTxt}</p>
        {edit ? <p className='text-white text-sm'>Password: {data.password}</p> : null}
      </div>
      <p className='text-white text-xl'>{data.text}</p>
      <div className='flex flex-col flex-nowrap justify-center items-center'>
        {data.options.map((op, i) => <PollOption key={i} name={op} className='m-1' onClick={() => vote(i)} selected={choice && choice.response.optionIndex == i} />)}
        <InputField id="password" name="Password" value={input.password} onChange={(e) => handleInputChange(e, input, setInput)} className='mt-6' />
        {
          edit ?
            <>
              <div className='mt-2 w-full flex justify-center'>
                {!data.closed ? <OutlineButton className='mx-1' name='Close' onClick={close} /> : null}
                <OutlineButton className='mx-1' name='View' onClick={view} />
              </div>
            </>
            : null
        }
      </div>
    </div>
  );
}

const CreatePoll = () => {
  const getInput = (block) => {
    let pass = "";
    let s = "qwertyupadfghjkxcvbnm346789";
    for (let i = 0; i < 6; i++) pass += s[Math.floor(Math.random()*s.length)];
    const d = new Date();
    let day = d.getDay();
    d.setDate(d.getDate() + (10-day)%7);

    return {"text": `${d.getMonth()/d.getDate()}`, "choices": `{block} Block`, "password": pass};
  }

  const { toastDispatch } = useToasts();
  const { session } = useSession()
  const [input, setInput] = useState(getInput("A"));
  const router = useRouter()

  const create = async () => {
    const res = await fetch('/api/poll', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.access_token}`
      },
      body: JSON.stringify({
        text: input.text,
        options: input.choices.split(';').map(c => c.trim()),
        password: input.password.length > 0 ? input.password : undefined
      })
    })

    notify(toastDispatch, "", `Created poll: ${input.text}`, ToastType.SUCCESS)

    setInput(getInput("B"))
    router.reload()
  }

  return (
    <div className='mt-6 sm:w-60 md:w-96 bg-navy-light bg-opacity-50 p-4 mx-auto'>
      <h3 className='text-white text-2xl font-bold'>Create a Poll</h3>
      <p className='text-white mt-2 text-md'>Provide some description your poll and list the choices using ; to separate. Password field is optional.</p>
      <InputField id='text' name='Description' value={input.text} onChange={(e) => handleInputChange(e, input, setInput)} />
      <InputField id='choices' name='Choices' value={input.choices} onChange={(e) => handleInputChange(e, input, setInput)} />
      <InputField id="password" name="Password" value={input.password} onChange={(e) => handleInputChange(e, input, setInput)} />
      <OutlineButton name='Create' className='mt-4' onClick={create} />
    </div>
  );
}

export const PollSection = () => {
  const [view, setView] = useState(null)
  const { session, user } = useSession();
  const [polls, setPolls] = useState([])
  const [input, setInput] = useState({
    status: 'open'
  })

  useEffect(() => {
    if (!session) return
    const options = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.access_token}`
      }
    }
    fetch('/api/poll', options).then(res => res.json()).then((data) => setPolls(data.polls))
  }, [session])

  return (
    <>
      <div className='relative mt-4 p-2 w-full flex flex-col items-center min-h-fit justify-center text-white'>
        <h3 className='text-white text-center text-3xl font-black'>Polls</h3>
        <Spinner className="absolute -top-16 left-1/2 -ml-8 h-16 w-16 mx-auto my-0" show={polls.length <= 0} />
        <TabSelect id='status' options={[{label: 'Open Only', value: 'open'}, {label: 'All', value: 'all'}]} value={input.status} onChange={(x) => setInput({...input, status: x})} className='mt-4'/>
        <div className='w-full my-8 flex justify-center flex-wrap gap-x-2 gap-y-8'>
          {polls.map((p) =>
            input.status === 'all' || !p.closed ? <Poll key={p.id} data={p} edit={user.admin} setView={setView} /> : null
          )}
        </div>
        {user.admin ?
          <div>
            <div className='p-4 mx-auto'>
              <CreatePoll />
            </div>

            <div className='w-full p-8 items-center'>
              <h3 className='text-white mt-16 text-center text-3xl font-bold'>Responses</h3>
              <div className='w-full h-96 p-2 overflow-y-scroll mt-8 bg-navy-light bg-opacity-50 flex flex-col items-center text-center'>
                {
                  view ?
                    view.map((v, i) => <p key={i} className='text-white m-2 text-md'>{v}</p>)
                    : <h1 className='text-white text-center text-xl'>View poll results here.</h1>
                }
              </div>
            </div>
          </div>
          : null}

      </div>
    </>
  );
}
