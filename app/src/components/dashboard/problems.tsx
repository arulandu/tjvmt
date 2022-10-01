import { handleInputChange } from "@/lib/handleInputChange";
import { useEffect, useState } from "react";
import { notify, ToastType } from "../header";
import { InputField } from "../InputField";
import { MathText } from "../MathText";
import OutlineButton from "../OutlineButton";
import { useSession } from "../SessionProvider";
import { Spinner } from "../Spinner";
import { TextArea } from "../Textarea";
import { useToasts } from "../ToastProvider";

const CreateProblem = () => {
  const { session } = useSession();
  const { toastDispatch } = useToasts();
  const [input, setInput] = useState({
    name: "",
    content: "",
    answer: "",
  })

  const create = async () => {
    const res = await fetch('/api/problem', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.access_token}`
      },
      body: JSON.stringify({
        name: input.name,
        content: input.content,
        answer: input.answer.trim(),
      })
    })

    notify(toastDispatch, "", `Created Problem: ${input.name}`, ToastType.SUCCESS)
    setInput({ name: "", content: "", answer: "" })
  }

  return (
    <div className='my-4 w-64 md:w-96 p-2 md:p-4 bg-navy-light bg-opacity-50'>
      <h1 className='text-white text-2xl font-bold'>Create a Problem</h1>
      <div className='mt-6'>
        <InputField id="name" name="Title" value={input.name} onChange={(e) => handleInputChange(e, input, setInput)} />
      </div>
      <h3 className='mt-4 text-white text-xl font-medium'>Problem</h3>
      <div className='w-full flex flex-col'>
        <TextArea id="content" label="Content" value={input.content} onChange={(e) => handleInputChange(e, input, setInput)} className='w-full h-64' />
        <MathText inline dynamic className='w-full pt-1 border-t border-solid border-white'>{input.content}</MathText>
      </div>
      <InputField id="answer" name="Answer" value={input.answer} onChange={(e) => handleInputChange(e, input, setInput)} />
      <div className='mt-2'>
        <OutlineButton className="content-center" name='Create' onClick={create} />
      </div>
    </div>
  );
}

const Problem = ({ problem }) => {
  const { session } = useSession();
  const { toastDispatch } = useToasts();
  const [input, setInput] = useState({ answer: "" })

  const decide = async (status) => {
    const res = await fetch('/api/problem/decide', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.access_token}`
      },
      body: JSON.stringify({
        id: problem.id,
        decision: status
      })
    })

    notify(toastDispatch, "", `${status ? "Approved" : "Denied"} Problem: ${problem.name}`, ToastType.SUCCESS)
  }

  const check = async () => {
    const res = await (await fetch('/api/problem/check', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.access_token}`
      },
      body: JSON.stringify({
        id: problem.id,
        answer: input.answer
      })
    })).json()

    if (res.status) {
      notify(toastDispatch, "", `Solved problem: ${problem.name}`, ToastType.SUCCESS)
    } else {
      notify(toastDispatch, "", `Incorrect answer to ${problem.name}`, ToastType.DANGER)
    }
  }

  return (
    <div className=' m-2 p-2 min-w-[20rem] rounded-md bg-navy-light bg-opacity-50'>
      <h3 className='text-xl text-white font-medium'>{problem.name}</h3>
      <p className='text-white font-light'>By {problem.author.name}</p>
      <div className='mt-2 block text-md overflow-x-auto overflow-y-auto md:max-h-80'>
        <MathText inline dynamic className='w-full'>{problem.content}</MathText>
      </div>
      {problem.approved ? problem.solved ?
        <p className='text-green-300 text-md'>Solved</p>
        :
        <div className='flex'>
          <InputField id="answer" name="Answer" value={input.answer} onChange={(e) => handleInputChange(e, input, setInput)} />
          <OutlineButton name="Solve" onClick={check} className='ml-2' />
        </div>
        : null
      }
      {!problem.approved ?
        <>
          <p className="text-white">Answer: {problem.answer}</p>

          <div className='mt-2 flex'>
            <OutlineButton name='Approve' onClick={() => decide(true)} className='' />
            <OutlineButton name='Deny' onClick={() => decide(false)} className='ml-2 ' />
          </div>

        </>
        : null}

    </div>
  );
}

export const ProblemSection = () => {
  const { session, user } = useSession();
  const [problems, setProblems] = useState([])
  useEffect(() => {
    if (!session) return
    const options = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.access_token}`
      }
    }
    fetch('/api/problem', options).then(res => res.json()).then((data) => setProblems(data.problems))
  }, [session])

  return (
    <div className='relative w-full min-h-fit flex flex-col justify-center items-center text-white'>
      <h3 className='text-white text-3xl font-black'>Problems</h3>
      <Spinner className="absolute -top-16 left-1/2 -ml-8 h-16 w-16 mx-auto my-0" show={problems.length <= 0} />

      <div className='w-full h-full overflow-x-auto '>
        <div className='w-full m-2 p-2 flex justify-start items-start'>
          {problems.map((p, i) => user.admin || p.approved ? <Problem key={i} problem={p} /> : null)}
        </div>
      </div>
      <CreateProblem />
    </div>
  );
}

