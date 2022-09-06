import type { NextPage } from 'next'
import { Layout } from '@/components/layout'
import Image from 'next/image'
import Link from 'next/link';
import { db } from '@/lib/db/db'
import { authorize } from '@/lib/api/authorize';
import { InputField } from '@/components/InputField';
import { useState } from 'react';
import OutlineButton from '@/components/OutlineButton';
import { useSession } from '@/components/SessionProvider';

export const getServerSideProps = async ({ req, res }) => {
  const { authorized, profileBody } = await authorize(req, res)

  if (!authorized) return { props: {} }

  const user = await db.user.findFirst({
    where: {
      ionId: String(profileBody.id)
    }
  })

  const picRes = await fetch(`https://ion.tjhsst.edu/api/profile/${profileBody.id}/picture`, { headers: { 'Authorization': req.headers.authorization } })
  //@ts-ignore
  const buffer = await picRes.arrayBuffer()
  const pic = `data:${picRes.headers.get('content-type')};base64,${Buffer.from(buffer).toString("base64")}`
  user.profilePic = pic

  const users = await db.user.findMany ({
    where: {
      attendance: true
    }

    }
  )
  var listOfNames = []

  for(let i = 0; i < users.length; i++)
  {
    listOfNames[i] = users[i].ionUsername
  }
  listOfNames.sort()

  return {
    props: {
      user: user,
      users: users,
      listOfNames: listOfNames
    }
  }
  
}

const AdminDashboard: NextPage<any> = ({ user, users, listOfNames }) => {
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

  const {session} = useSession();

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

  const reset = async () => {
    const res = await fetch('/api/attendance', {
      method: 'PUT',
    })
  }

  const [isShown, setIsShown] = useState(false);
  const view = async() => {
    setIsShown(current => !current);
  }

  return (
    <Layout>
      <section className="mx-4 sm:mx-12 lg:mx-24 min-h-screen flex flex-col items-center justify-center">
        {
          user ?
            <>
              <h1 className='text-white text-4xl'>Admin Dashboard</h1>
              <div className = 'mt-8'>
              <h1 className='text-white text-2xl'>Create a TST</h1>
                <div className = 'mt-6'>
                  <InputField name="Name" value={input.name} onChange={handleInputChange}/>
                </div>

                <div className = 'mt-10 mb-6'>
                  <InputField name="Weighted" value={input.weighted} onChange={handleInputChange}/>
                </div>

                <div>
                  <OutlineButton className = "content-center" name='Create' onClick={createTST}/>
                </div>

                <div className = 'mt-6'>
                  <OutlineButton className = 'm-4' name='Reset Attendance' onClick={reset}/>
                </div>

                <div>
                  <OutlineButton className = 'm-4' name='View Attendance' onClick={view}/>
                  {isShown && (
                    <div>
                      <ul className='text-white'>
                        {listOfNames.map(name => (
                        <li>{name}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </>
            : <h1 className='text-white text-4xl'>Log in to view Dashboard.</h1>
        }
      </section>
    </Layout>
  )
}

export default AdminDashboard