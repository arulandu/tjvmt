import type { NextPage } from 'next'
import { Layout } from '@/components/layout'
import Image from 'next/image'
import Link from 'next/link';
import { db } from '@/lib/db/db'
import { InputField } from '@/components/InputField';
import { useState } from 'react';
import OutlineButton from '@/components/OutlineButton';
import { useSession } from '@/components/SessionProvider';
import { authorize } from '@/lib/api/authorize';

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

const TSTPanel = () => {
  const { session } = useSession();

  const [input, setInput] = useState({
    name: "",
    weighted: "NO",
  })

  const handleInputChange = (e) => {
    const target = e.target
    const val = target.type == 'checkbox' ? target.checked : target.value
    const name = target.name.toLowerCase();

    //@ts-ignore
    setInput({
      ...input,
      [name]: val
    })
  }

  const createTST = async () => {
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

  const [isShown, setIsShown] = useState(false);
  const view = async () => {
    setIsShown(current => !current);
  }


  return (
    <div className='mt-8'>
      <h1 className='text-white text-2xl'>Create a TST</h1>
      <div className='mt-6'>
        <InputField id="name" name="Name" value={input.name} onChange={handleInputChange} />
      </div>

      <div className='mt-10 mb-6'>
        <InputField id="weighted" name="Weighted" value={input.weighted} onChange={handleInputChange} />
      </div>

      <div>
        <OutlineButton className="content-center" name='Create' onClick={createTST} />
      </div>
    </div>
  );
}

const Dashboard: NextPage<any> = ({ user, polls }) => {
  const [view, setView] = useState(null)

  return (
    <Layout>
      <section className='mx-4 sm:mx-12 lg:mx-24 min-h-screen flex flex-col items-center justify-center'>
        <div className="h-screen flex flex-col items-center justify-center">
          <h1 className='text-white text-center text-4xl'>Dashboard{user.admin ? ' (Admin)' : ''}</h1>
          <p className='text-white text-center text-xl mt-4'>Welcome to the dashboard! Your one stop shop for all things VMT.</p>
        </div>
        <div className='w-full'>
          <h3 className='text-white mt-16 text-center text-3xl font-bold'>Polls</h3>
          <div className='w-full mt-8 flex justify-center flex-wrap'>
            {polls.map((p) =>
              <Poll key={p.id} data={p} edit={user.admin} setView={setView} />
            )}
          </div>
          {user.admin ?
            <div className='w-full'>
              <h3 className='text-white mt-16 text-center text-3xl font-bold'>Responses</h3>
              <div className='w-full h-96 overflow-y-scroll mt-8 p-4 bg-navy-light bg-opacity-50 flex flex-wrap justify-center items-center'>
                {
                  view ?
                    view.map((v, i) => <p key={i} className='text-white m-2 text-md'>{v}</p>)
                    : <h1 className='text-white text-center text-4xl'>View poll results here.</h1>
                }
              </div>
            </div>
          : null}
        </div>
        {/* <TSTPanel/> */}
      </section>
    </Layout>
  )
}

export default Dashboard