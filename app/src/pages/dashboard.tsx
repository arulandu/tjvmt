import type { NextPage } from 'next'
import { Layout } from '@/components/layout'
import { InputField } from '@/components/InputField';
import { useEffect, useState } from 'react';
import OutlineButton from '@/components/OutlineButton';
import { useSession } from '@/components/SessionProvider';
import { authorize } from '@/lib/api/authorize';
import { useRouter } from 'next/router';
import { handleInputChange } from '@/lib/handleInputChange';
import { Dropdown } from '@/components/Dropdown';
import { useToasts } from '@/components/ToastProvider';
import { notify, ToastType } from '@/components/header';
import { Textarea } from '@/components/Textarea';
import { MathText } from '@/components/MathText';

export const getServerSideProps = async ({ req, res }) => {
  const { authorized, user } = await authorize(req, res)

  if (!authorized) return { redirect: { destination: '/404', permanent: true } }

  let users = (await (await fetch(`${process.env.BASE_URL}/api/user`, { headers: { 'Authorization': req.headers.authorization } })).json()).users

  users = await Promise.all(users.map(async (u) => {
    const picRes = await fetch(`https://ion.tjhsst.edu/api/profile/${u.ionId}/picture`, { headers: { 'Authorization': req.headers.authorization } })
    //@ts-ignore
    const buffer = await picRes.arrayBuffer()
    const pic = `data:${picRes.headers.get('content-type')};base64,${Buffer.from(buffer).toString("base64")}`
    u.profilePic = pic
    return u
  }))

  user.profilePic = users.filter(u => u.id == user.id)[0].profilePic

  const polls = (await (await fetch(`${process.env.BASE_URL}/api/poll`, { headers: { 'Authorization': req.headers.authorization } })).json()).polls

  return {
    props: {
      user,
      users,
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
  const { toastDispatch } = useToasts();
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
        pollId: data.id,
        optionIndex: ind
      })
    })

    const newResponse = (await res.json()).response
    setChoice({ optionIndex: ind, response: newResponse })
    notify(toastDispatch, "", `Voted "${data.options[ind]}" in poll: ${data.text}`, ToastType.SUCCESS)
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
        <p className='text-white text-sm'>Status: <b>{data.closed ? 'Closed' : 'Open'}</b></p>
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
  const { toastDispatch } = useToasts();
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

    notify(toastDispatch, "Created Poll", "", ToastType.SUCCESS)

    setInput({ text: '', choices: '' })
    router.reload()
  }

  return (
    <div className='mt-6 sm:w-60 md:w-96 bg-navy-light bg-opacity-50 p-4'>
      <h3 className='text-white text-2xl font-bold'>Create a Poll</h3>
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
      <div className='w-full mt-4 flex flex-col items-center border-2 border-white border-solid'>
        <div className='w-full mb-8'>
          <h3 className='text-white mt-8 text-center text-3xl font-bold'>Polls</h3>
          <div className='w-full mt-8 flex justify-center flex-wrap gap-x-2 gap-y-8'>
            {polls.map((p) =>
              <Poll key={p.id} data={p} edit={user.admin} setView={setView} />
            )}
          </div>
        </div>
        {user.admin ?
          <div className='w-full p-8 items-center'>
            <h3 className='text-white mt-16 text-center text-3xl font-bold'>Responses</h3>
            <div className='w-full p-2 overflow-y-scroll mt-8 bg-navy-light bg-opacity-50 justify-center text-center'>
              {
                view ?
                  view.map((v, i) => <p key={i} className='text-white m-2 text-md'>{v}</p>)
                  : <h1 className='text-white text-center text-xl'>View poll results here.</h1>
              }
            </div>
          </div>
          : null}
        {user.admin ?
          <div className='mt-16 mb-4 p-4'>
            <CreatePoll />
          </div>
          : null}
      </div>
    </>
  );
}

// GRADER
const ViewTSTs = ({ tsts }) => {
  const { session } = useSession()
  const { toastDispatch } = useToasts()

  const grade = async (tstId) => {
    await fetch('/api/tst/grade', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.access_token}`
      },
      body: JSON.stringify({ tstId })
    })

    notify(toastDispatch, "", `Re-computed ${tsts.filter(t => t.id == tstId)[0].name} indices`)
  }

  return (
    <div>
      <h3 className='text-white text-2xl font-bold text-center'>TSTs</h3>
      <div className='flex flex-wrap justify-center items-center'>
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
  const { toastDispatch } = useToasts();
  const [input, setInput] = useState({
    name: "",
    weighted: "NO",
  })

  const create = async () => {
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

    notify(toastDispatch, "", `Created ${input.name} TST`, ToastType.SUCCESS)
  }

  return (
    <div className='my-4 w-60 p-2 md:p-4 bg-navy-light bg-opacity-50'>
      <h1 className='text-white text-2xl font-bold'>Create a TST</h1>
      <div className='mt-6'>
        <InputField id="name" name="Name" value={input.name} onChange={(e) => handleInputChange(e, input, setInput)} />
      </div>

      <Dropdown id="weighted" label="Weighted" options={[{ label: 'Yes', value: "YES" }, { label: 'No', value: 'NO' }]} value={input.weighted} onChange={(e) => handleInputChange(e, input, setInput)} />

      <div className='mt-2'>
        <OutlineButton className="content-center" name='Create' onClick={create} />
      </div>
    </div>
  );
}

const CreateSelection = () => {
  const { session } = useSession();
  const { toastDispatch } = useToasts();

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
    notify(toastDispatch, "", `Created selection: ${input.name}`, ToastType.SUCCESS)
  }

  return (
    <div className='p-4 md:p-4 sm:w-60 md:w-96 bg-navy-light bg-opacity-50'>
      <h1 className='text-white text-2xl font-bold'>Create a Selection</h1>
      <p className='text-white text-sm'>For each TST weight, write the TST name exactly followed by a comma followed by the weight as a decimal. Seperate each TST weight combination with a semicolon (;).</p>
      <br></br>
      <p className='text-white text-sm'>Example: Duke 1, 0.25; Duke 2, 0.25; Duke 3, 0.5</p>
      <div className='mt-6'>
        <InputField id="name" name="Name" value={input.name} onChange={(e) => handleInputChange(e, input, setInput)} />
      </div>
      <div className='mt-6'>
        <InputField id="size" name="Number of competitors" value={input.size} onChange={(e) => handleInputChange(e, input, setInput)} />
      </div>
      <div className='mt-6'>
        <InputField id="drops" name="Drops" value={input.drops} onChange={(e) => handleInputChange(e, input, setInput)} />
      </div>
      <div className='mt-6'>
        <InputField id="weights" name="Weights" value={input.weights} onChange={(e) => handleInputChange(e, input, setInput)} />
      </div>

      <div className='mt-3'>
        <OutlineButton className="content-center" name='Create' onClick={create} />
      </div>

    </div>
  );
}

const ViewSelections = ({ selections }) => {
  const { session } = useSession()
  const { toastDispatch } = useToasts();

  const grade = async (selectionId) => {
    await fetch('/api/selection/grade', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.access_token}`
      },
      body: JSON.stringify({ selectionId })
    })

    notify(toastDispatch, "", `Re-computed rankings for ${selections.filter(s => s.id == selectionId)[0].name}`)
  }

  return (
    <div>
      <h3 className='text-white text-2xl font-bold text-center'>Selections</h3>
      <div className='flex flex-wrap justify-center items-center'>
        {selections.map(selection =>
          <div key={selection.id} className='m-2 p-2 md:p-4 bg-navy-light bg-opacity-50'>
            <h4 className='text-white text-xl'>Name: {selection.name}</h4>
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
  const { toastDispatch } = useToasts()
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
    notify(toastDispatch, "", `Graded ${tsts.filter(t => t.id == input.tstId)[0].name} for ${users.filter(u => u.id == input.userId)[0].ionUsername}`)
    setInput({ ...input, answers: '' })
  }

  return (
    <div className='mt-2 max-w-96 bg-navy-light bg-opacity-50 p-4'>
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
    <div className='my-6 p-2 w-full flex flex-col items-center border-solid border-2 border-white'>
      <h3 className='text-white mt-12 text-center text-3xl font-bold'>TST Grading</h3>
      <div className='m-6'> <SubmitGrade tsts={tsts} users={users} /> </div>
      <div className='m-6 content-center items-center flex flex-col'>
        <ViewTSTs tsts={tsts} />
        <div><CreateTST /></div>
      </div>
      <div className='m-6'><CreateSelection /></div>
      <div className='m-6'><ViewSelections selections={selections} /></div>
    </div>
  );
}

const RankingsSection = ({ selections }) => {
  const { session } = useSession();
  const { toastDispatch } = useToasts();
  const [data, setData] = useState({ cutoff: -1, userInd: -1, submissions: [], rankings: [] })
  const [input, setInput] = useState({
    selectionId: ''
  })

  useEffect(() => {
    if (selections.length > 0) {
      const selectionId = selections[0].id
      setInput({ ...input, selectionId })
    }
  }, [selections])

  useEffect(() => {
    if (!session || input.selectionId.length <= 0) return
    const options = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.access_token}`
      },
    }
    fetch(`/api/ranking?selectionId=${input.selectionId}`, options).then(res => res.json()).then((data) => {
      setData(data);
      notify(toastDispatch, "", `Calculated your ranking for selection ${selections.filter(s => s.id == input.selectionId)[0].name}`);
    })

  }, [session, input.selectionId])

  return (
    <div className='mt-4 p-2 w-full flex flex-col items-center border-solid border-2 border-white'>
      <h1 className='mt-8 text-white text-center text-3xl font-bold'>Rankings</h1>
      <table className='text-white text-center m-6'>
        <thead>
          <tr>
            <th>TST</th>
            <th>Index</th>
            <th>Breakdown</th>
            <th>Solves</th>
          </tr>
        </thead>
        <tbody>
          {data.submissions?.map(sub =>
            <tr key={sub.id} className='border-y border-solid'>
              <th className='p-2'>{sub.tst.name}</th>
              <th className='p-2'>{sub.index.toFixed(2)}</th>
              <th className='p-2'>{sub.answers.join(" ")}</th>
              <th className='p-2'>{sub.tst.solves.map(s => s >= 0 ? s : "?").join(" ")}</th>
            </tr>
          )}
        </tbody>
      </table>

      <Dropdown id="selectionId" label="Selection:" options={selections.map(s => ({ label: s.name, value: s.id }))} value={input.selectionId} onChange={(e) => handleInputChange(e, input, setInput)} className='mt-2' />
      <div className='m-2'>
        {data.cutoff >= 0 ? <p className='text-white text-xl'>Cutoff: {data.cutoff}</p> : null}
      </div>

      <table className='text-white text-center mt-2 mb-8'>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Index</th>
          </tr>
        </thead>
        <tbody>
          {data.rankings?.map((r, i) =>
            <tr key={i} className={`border-y border-solid ${i == data.userInd ? ' bg-pink' : 'bg-navy-light'}`}>
              <td className='p-2'>{r.rank}</td>
              <td className='p-2'>{r.name}</td>
              <td className='p-2'>{r.index >= 0 ? r.index.toFixed(2) : '???'}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

const CreateProblem = () => {
  const { session } = useSession();
  const { toastDispatch } = useToasts();
  const [input, setInput] = useState({
    name: "",
    content: "",
    answer: ""
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
        answer: input.answer.trim()
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
        <Textarea id="content" label="Content" value={input.content} onChange={(e) => handleInputChange(e, input, setInput)} className='w-full h-64' />

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
    <div className='m-2 p-2 max-w-xs rounded-md bg-navy-light bg-opacity-50'>
      <h3 className='text-xl text-white font-medium'>{problem.name}</h3>
      <div className='mt-2 block text-md'>
        <MathText inline dynamic className='w-full'>{problem.content}</MathText>

      </div>
      {problem.solved ?
        <p className='text-green-300 text-md'>Solved</p>
        :
        <div className='flex'>
          <InputField id="answer" name="Answer" value={input.answer} onChange={(e) => handleInputChange(e, input, setInput)} />
          <OutlineButton name="Solve" onClick={check} className='ml-2' />
        </div>
      }
      {!problem.approved ?
        <div className='mt-2 flex'>
          <OutlineButton name='Approve' onClick={() => decide(true)} className='' />
          <OutlineButton name='Deny' onClick={() => decide(false)} className='ml-2 ' />
        </div>
        : null}
    </div>
  );
}

const ProblemSection = ({ user }) => {
  const { session } = useSession();
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
    <div className='w-full flex flex-col justify-center items-center text-white border border-solid border-white'>
      <h3 className='text-white text-2xl font-bold'>Problems</h3>
      <div className='m-2 p-2 w-full flex flex-wrap justify-center items-start'>
        {problems.map((p, i) => user.admin || p.approved ? <Problem key={i} problem={p} /> : null)}
      </div>
      <CreateProblem />
    </div>
  );
}

const UserCard = ({ user }) => {
  const { session } = useSession()

  return (
    <div className='m-2 w-64 flex bg-navy-light bg-opacity-50 rounded-md border'>
      <img alt="Profile Picture" src={user.profilePic} className='w-16 h-16 object-cover rounded-full border-4 border-solid border-white' />
      <div className='ml-2 text-white'>
        <p className={`${user.admin ? "text-pink": "text-white"} font-medium`}>{user.name}</p>
        <p className='font-light'>{user.ionUsername}</p>
        <p className='text-green-300'>{user.solvedProblemIds.length} solves</p>
      </div>
    </div>
  );
}

const UserSection = ({ users }) => {
  const { session } = useSession();

  return (
    <div className='my-4 border-solid border-2 border-white w-full flex flex-col justify-center items-center'>
      <h3 className='text-white text-2xl font-bold'>Directory</h3>
      <p className='text-white'>Solve more POTDs!</p>
      <div className='flex flex-wrap justify-center items-center'>
        {users.map((u) =>
          <UserCard key={u.id} user={u} />
        )}
      </div>
    </div>

  );
}

const Dashboard: NextPage<any> = ({ user, users, polls }) => {
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
          {/* <img alt="Profile Picture" src={user.profilePic} className='w-32 h-32 object-cover rounded-full border-4 border-solid border-white' /> */}
          <img alt="Profile Picture" src={user.profilePic} className='w-32 h-32 object-cover rounded-full border-4 border-solid border-white' />
          <h1 className='mt-4 text-white text-center text-4xl'>Dashboard{user.admin ? ' (Admin)' : ''}</h1>
          <p className='text-white text-center text-xl mt-4'>Welcome to the dashboard! Your one stop shop for all things VMT.</p>
        </div>
        <ProblemSection user={user} />
        <PollSection user={user} polls={polls} />
        {user.admin ? <GraderSection selections={selections} /> : null}
        <RankingsSection selections={selections} />
        <UserSection users={users} />
      </section>
    </Layout >
  )
}

export default Dashboard