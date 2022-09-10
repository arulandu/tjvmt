import type { NextPage } from 'next'
import { Layout } from '@/components/layout'
import Image from 'next/image'
import Link from 'next/link';
import { db } from '@/lib/db/db'
import { InputField } from '@/components/InputField';
import { useEffect, useState } from 'react';
import OutlineButton from '@/components/OutlineButton';
import { useSession } from '@/components/SessionProvider';
import { authorize } from '@/lib/api/authorize';
import { useRouter } from 'next/router';
import { handleInputChange } from '@/lib/handleInputChange';
import { Dropdown } from '@/components/Dropdown';

export const getServerSideProps = async ({ req, res }) => {
  const { authorized, user } = await authorize(req, res)

  if (!authorized) return { redirect: { destination: '/404', permanent: true } }

  const picRes = await fetch(`https://ion.tjhsst.edu/api/profile/${user.ionId}/picture`, { headers: { 'Authorization': req.headers.authorization } })
  //@ts-ignore
  const buffer = await picRes.arrayBuffer()
  const pic = `data:${picRes.headers.get('content-type')};base64,${Buffer.from(buffer).toString("base64")}`
  user.profilePic = pic

  const polls = (await (await fetch(`${process.env.BASE_URL}/api/poll`, { headers: { 'Authorization': req.headers.authorization } })).json()).polls

  return {
    props: {
      user,
      polls
    }
  }
}

// POLLS

const PollOption = ({ name = "", className = "", selected = false, onClick = () => { } }) => {
  return <button className={`w-full px-2 py-1 text-md border-solid border-2 ${selected ? 'bg-pink border-pink text-pink' : 'bg-white border-white text-white'} bg-opacity-0 hover:bg-opacity-10 transition-all ease-in-out ${className}`} onClick={onClick}>{name}</button>
}

const Poll = ({ data, edit, setView }) => {
  const { session } = useSession();
  const [choice, setChoice] = useState(data.responses.length > 0 ? { optionIndex: data.responses[0].optionIndex, response: data.responses[0] } : null)

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
        pollId: data.id,
        optionIndex: ind
      })
    })

    const newResponse = (await res.json()).response

    setChoice({ optionIndex: ind, response: newResponse })
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

  return (
    <div className='p-4 mx-2 bg-navy-light bg-opacity-50 rounded-md'>
      <div className='flex justify-start'>
        <p className='text-white text-sm'>Status: {data.closed ? 'Closed' : 'Open'}</p>
      </div>
      <p className='text-white text-xl'>{data.text}</p>
      <div className='flex flex-col flex-nowrap justify-center items-center'>
        {data.options.map((op, i) => <PollOption key={i} name={op} className='m-1' onClick={() => vote(i)} selected={choice && choice.response.optionIndex == i} />)}
        {
          edit ?
            <>
              <hr className='my-2 border border-white border-solid w-full'></hr>
              <div className='w-full flex justify-center'>
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
  const { session } = useSession()
  const [input, setInput] = useState({
    text: '',
    choices: ''
  })
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
        options: input.choices.split(';').map(c => c.trim())
      })
    })

    setInput({ text: '', choices: '' })
    router.reload()
  }

  return (
    <div className='w-96 bg-navy-light bg-opacity-50 p-4'>
      <h3 className='text-white text-3xl font-bold'>Create a Poll</h3>
      <p className='text-white mt-2 text-md'>Provide some description your poll and list the choices using ; to separate.</p>
      <InputField id='text' name='Description' value={input.text} onChange={(e) => handleInputChange(e, input, setInput)} />
      <InputField id='choices' name='Choices' value={input.choices} onChange={(e) => handleInputChange(e, input, setInput)} />
      <OutlineButton name='Create' className='mt-4' onClick={create} />
    </div>
  );
}

const PollSection = ({ user, polls }) => {
  const [view, setView] = useState(null)

  return (
    <>
      <div className='w-full flex flex-col items-center border-2 border-white border-solid'>
        {user.admin ? <CreatePoll /> : null}
        <div className='w-full'>
          <h3 className='text-white mt-16 text-center text-3xl font-bold'>Polls</h3>
          <div className='w-full mt-8 flex justify-center flex-wrap'>
            {polls.map((p) =>
              <Poll key={p.id} data={p} edit={user.admin} setView={setView} />
            )}
          </div>
        </div>
        {user.admin ?
          <div className='w-full'>
            <h3 className='text-white mt-16 text-center text-3xl font-bold'>Responses</h3>
            <div className='w-full h-96 overflow-y-scroll mt-8 p-4 bg-navy-light bg-opacity-50 flex flex-wrap justify-center items-center'>
              {
                view ?
                  view.map((v, i) => <p key={i} className='text-white m-2 text-md'>{v}</p>)
                  : <h1 className='text-white text-center text-xl'>View poll results here.</h1>
              }
            </div>
          </div>
          : null}
      </div>
    </>
  );
}

// GRADER
const ViewTSTs = ({ tsts }) => {
  const { session } = useSession()

  const grade = async (tstId) => {
    await fetch('/api/tst/grade', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.access_token}`
      },
      body: JSON.stringify({ tstId })
    })
  }

  return (
    <div>
      <h3 className='text-white text-2xl font-bold text-center'>TSTs</h3>
      <div className='flex justify-center items-center'>
        {tsts.map(tst =>
          <div key={tst.id} className='m-2 p-2 md:p-4 bg-navy-light bg-opacity-50'>
            <h4 className='text-white text-xl'>{tst.name}</h4>
            <p className='text-white text-md'>Grading Type: {tst.weighted ? "Weighted" : "Un-Weighted"}</p>
            <OutlineButton name='Grade' onClick={() => grade(tst.id)} className='mt-2' />
          </div>
        )}
      </div>
    </div>
  );
}

const CreateTST = () => {
  const { session } = useSession();
  const [input, setInput] = useState({
    name: "",
    weighted: "NO",
  })

  const create = async () => {
    console.log(input)

    const res = await fetch('/api/tst', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.access_token}`
      },
      body: JSON.stringify({
        name: input.name,
        weighted: input.weighted == "YES"
      })
    })
    const resBody = await res.json();
    console.log(resBody)
  }

  return (
    <div className='p-2 md:p-4 bg-navy-light bg-opacity-50'>
      <h1 className='text-white text-2xl font-bold'>Create a TST</h1>
      <div className='mt-6'>
        <InputField id="name" name="Name" value={input.name} onChange={(e) => handleInputChange(e, input, setInput)} />
      </div>

      <Dropdown id="weighted" label="Weighted" options={[{ label: 'Yes', value: "YES" }, { label: 'No', value: 'NO' }]} value={input.weighted} onChange={(e) => handleInputChange(e, input, setInput)} />

      <div>
        <OutlineButton className="content-center" name='Create' onClick={create} />
      </div>
    </div>
  );
}

const CreateSelection = () => {
  const { session } = useSession();
  const [input, setInput] = useState({
    name: "",
    weights: "",
    size: 0,
    drops: 0
  })

  const create = async () => {
    const ws = {}
    input.weights.split(';').map(e => e.trim().split(',').map(t => t.trim())).forEach(c => ws[c[0]] = parseFloat(c[1]))

    const res = await fetch('/api/selection', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.access_token}`
      },
      body: JSON.stringify({
        name: input.name,
        size: parseInt(String(input.size)),
        drops: parseInt(String(input.drops)),
        weights: ws
      })
    })
    const resBody = await res.json();
  }

  return (
    <div className='p-2 md:p-4 max-w-xs bg-navy-light bg-opacity-50'>
      <h1 className='text-white text-2xl font-bold'>Create a Selection</h1>
      <p className='text-white text-sm'>For each tst weight, write the tst name exactly followed by a comma followed by the weight as a decimal. Seperate each tst weight combination with a semicolon (;).</p>
      <div className='mt-6'>
        <InputField id="name" name="Name" value={input.name} onChange={(e) => handleInputChange(e, input, setInput)} />
      </div>
      <div className='mt-6'>
        <InputField id="size" name="Size" value={input.size} onChange={(e) => handleInputChange(e, input, setInput)} />
      </div>
      <div className='mt-6'>
        <InputField id="drops" name="Drops" value={input.drops} onChange={(e) => handleInputChange(e, input, setInput)} />
      </div>
      <div className='mt-6'>
        <InputField id="weights" name="Weights" value={input.weights} onChange={(e) => handleInputChange(e, input, setInput)} />
      </div>

      <div>
        <OutlineButton className="content-center" name='Create' onClick={create} />
      </div>

    </div>
  );
}

const ViewSelections = ({ selections }) => {
  const { session } = useSession()

  const grade = async (selectionId) => {
    await fetch('/api/selection/grade', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.access_token}`
      },
      body: JSON.stringify({ selectionId })
    })
  }

  return (
    <div>
      <h3 className='text-white text-2xl font-bold text-center'>Selections</h3>
      <div className='flex justify-center items-center'>
        {selections.map(selection =>
          <div key={selection.id} className='m-2 p-2 md:p-4 bg-navy-light bg-opacity-50'>
            <h4 className='text-white text-xl'>{selection.name}</h4>
            <p className='text-white text-md'>{selection.drops} drop{selection.drops > 1 ? "s" : ""}</p>
            <p className='text-white text-md'>Weights: {Object.entries(selection.weights).map(([k, v], h) => `${k} (${v})`).reduce((a, b) => `${a}, ${b}`)}</p>
            <OutlineButton name='Grade' onClick={() => grade(selection.id)} className='mt-2' />
          </div>
        )}
      </div>
    </div>
  );
}

const SubmitGrade = ({ tsts, users }) => {
  const { session } = useSession()
  const [input, setInput] = useState({
    answers: '',
    tstId: '',
    userId: ''
  })

  useEffect(() => {
    if (tsts.length > 0) setInput({ ...input, tstId: tsts[0].id })
  }, [tsts])
  useEffect(() => {
    if (users.length > 0) setInput({ ...input, userId: users[0].id })
  }, [users])


  const submit = async () => {
    console.log(input.answers, input.tstId)
    const res = await fetch('/api/tst/submission', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.access_token}`
      },
      body: JSON.stringify({
        answers: input.answers.split(' ').map(e => parseInt(e.trim())),
        tstId: input.tstId,
        userId: input.userId
      })
    })

    setInput({ ...input, answers: '' })
  }

  return (
    <div className='mt-2 w-96 bg-navy-light bg-opacity-50 p-4'>
      <h3 className='text-white text-2xl font-bold'>Submit Grade</h3>
      <p className='text-white mt-2 text-md'>Key in answers using space to separate.</p>
      <Dropdown id="tstId" label="TST" options={tsts.map(tst => ({ label: tst.name, value: tst.id }))} value={input.tstId} onChange={(e) => handleInputChange(e, input, setInput)} className='mt-2' />
      <Dropdown id="userId" label="ION" options={users.map(user => ({ label: user.ionUsername, value: user.id }))} value={input.userId} onChange={(e) => handleInputChange(e, input, setInput)} className='mt-2' />
      <InputField id='answers' name='Answers' value={input.answers} onChange={(e) => handleInputChange(e, input, setInput)} />
      {/* <InputField id='tstId' name='Choices' value={input.tstId} onChange={(e) => handleInputChange(e, input, setInput)} /> */}
      <OutlineButton name='Submit' className='mt-4' onClick={submit} />
    </div>
  );
}

const GraderSection = ({ selections }) => {
  const { session } = useSession();
  const [tsts, setTsts] = useState([])
  const [users, setUsers] = useState([])

  useEffect(() => {
    if (!session) return
    const options = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.access_token}`
      }
    }
    fetch('/api/tst', options).then(res => res.json()).then((data) => setTsts(data.tsts))
    fetch('/api/user?competitor=true', options).then(res => res.json()).then((data) => setUsers(data.users))
  }, [session])

  return (
    <div className='my-2 p-2 w-full flex flex-col items-center border-solid border-2 border-white'>
      <SubmitGrade tsts={tsts} users={users} />
      <ViewTSTs tsts={tsts} />
      <CreateTST />
      <CreateSelection />
      <ViewSelections selections={selections} />
    </div>
  );
}

const RankingsSection = ({ selections }) => {
  const { session } = useSession();
  const [data, setData] = useState({ cutoff: -1, userInd: -1, submissions: [], rankings: [] })
  const [input, setInput] = useState({
    selectionId: ''
  })

  useEffect(() => {
    if (selections.length > 0) {
      const selectionId = selections[0].id
      const options = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`
        },
      }
      fetch(`/api/ranking?selectionId=${selectionId}`, options).then(res => res.json()).then((data) => setData(data))
      setInput({ ...input, selectionId })
    }
  }, [selections])

  useEffect(() => {
    if (!session) return

  }, [session])

  return (
    <div className='my-2 p-2 w-full flex flex-col items-center border-solid border-2 border-white'>
      <table className='text-white text-center'>
        <thead>
          <tr>
            <th>TST</th>
            <th>Index</th>
            <th>Breakdown</th>
          </tr>
        </thead>
        <tbody>
          {data.submissions.map(sub =>
          <tr className='border-y border-solid'>
            <th className='p-2'>{sub.tst.name}</th>

            <th className='p-2'>{sub.index.toFixed(2)}</th>
            <th className='p-2'>{sub.answers.join("")}</th>
          </tr>
          )}
        </tbody>
      </table>

      <Dropdown id="selectionId" label="Selection" options={selections.map(s => ({ label: s.name, value: s.id }))} value={input.selectionId} onChange={(e) => handleInputChange(e, input, setInput)} className='mt-2' />

      <table className='text-white text-center'>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Index</th>
          </tr>
        </thead>
        <tbody>
          {data.rankings.map((r, i) =>
            <tr key={i} className={`border-y border-solid ${i == data.userInd ? ' bg-pink' : 'bg-navy-light'}`}>
              <td>{r.rank}</td>
              <td>{r.name}</td>
              <td>{r.index.toFixed(2)}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

const Dashboard: NextPage<any> = ({ user, polls }) => {
  const { session } = useSession();
  const [selections, setSelections] = useState([])

  useEffect(() => {
    if (!session) return
    const options = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.access_token}`
      }
    }
    fetch('/api/selection', options).then(res => res.json()).then((data) => setSelections(data.selections))
  }, [session])

  return (
    <Layout>
      <section className='mx-4 sm:mx-12 lg:mx-24 min-h-screen flex flex-col items-center justify-center'>
        <div className="h-screen flex flex-col items-center justify-center">
          <h1 className='text-white text-center text-4xl'>Dashboard{user.admin ? ' (Admin)' : ''}</h1>
          <p className='text-white text-center text-xl mt-4'>Welcome to the dashboard! Your one stop shop for all things VMT.</p>
        </div>
        <PollSection user={user} polls={polls} />
        {user.admin ? <GraderSection selections={selections} /> : null}
        <RankingsSection selections={selections} />
      </section>
    </Layout >
  )
}

export default Dashboard