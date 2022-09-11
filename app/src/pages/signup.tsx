import type { NextPage } from 'next'
import { Layout } from '@/components/layout'
import Image from 'next/image'
import Link from 'next/link';
import OutlineButton from '@/components/OutlineButton';
import { useState } from 'react';
import { useSession } from '@/components/SessionProvider';
import Router from 'next/router';
import { InputField } from '@/components/InputField';
import { handleInputChange } from '@/lib/handleInputChange';

const SignUp: NextPage<any> = () => {
  const { session } = useSession()
  const [input, setInput] = useState({
    email: ''
  })

  const submit = async () => {
    const userRes = await fetch('/api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.access_token}`
      },
      body: JSON.stringify({
        email: input.email
      })
    })

    if (userRes.status != 200) {
      console.error('You already exist? fix later :*')
    } else {
      Router.push('/dashboard')
    }
  }

  return (
    <Layout>
      <section className="mx-4 sm:mx-12 lg:mx-24 min-h-screen flex flex-col items-center justify-center">
        <div className='bg-white bg-opacity-5 p-4'>
          <div className='w-full'>
            <h1 className='text-white text-3xl'>Welcome to VMT!</h1>
            <p className='text-white text-xl mt-2'>Create an account to access rankings, attendance, and other information.</p>
          </div>

          <div className='w-full mt-4 flex justify-start flex-wrap'>
            <div className='w-72 mr-4'>
              <InputField name="Personal Email" id="email" value={input.email} onChange={(e) => handleInputChange(e, input, setInput)} />
            </div>
            <div className='mt-4 flex items-center justify-center'>
              <OutlineButton name="Register" onClick={submit} />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default SignUp