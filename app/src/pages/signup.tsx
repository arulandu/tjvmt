import type { NextPage } from 'next'
import { Layout } from '@/components/layout'
import Image from 'next/image'
import Link from 'next/link';
import OutlineButton from '@/components/OutlineButton';
import { useState } from 'react';
import { useSession } from '@/components/SessionProvider';
import Router from 'next/router';

const SignUp: NextPage<any> = () => {
  const { session } = useSession()
  const [input, setInput] = useState({
    email: ''
  })
  
  const handleInputChange = (e) => {
    const target = e.target
    const val = target.type == 'checkbox' ? target.checked : target.value
    const name = target.name

    //@ts-ignore
    setInput({
      [name]: val
    })
  }

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

    if(userRes.status != 200){
      console.error('You already exist? fix later :*')
    } else {
      Router.push('/dashboard')
    }
  }

  return (
    <Layout>
      <section className="mx-4 sm:mx-12 lg:mx-24 min-h-screen flex flex-col items-center justify-center">
        <div className='text-center'>
          <h1 className='text-white text-3xl'>Welcome to VMT!</h1>
          <p className='text-white text-xl'>Before we get started, could you give us a little more information about yourself?</p>
        </div>
        
        <div>
          <label htmlFor='email'/>
          <input name='email' id="email" type="email" placeholder='email' value={input.email} onChange={handleInputChange}></input>
          <OutlineButton name="Let's go!" onClick={submit}/>
        </div>
      </section>
    </Layout>
  )
}

export default SignUp