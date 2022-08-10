import type { NextPage } from 'next'
import { Layout } from '@/components/layout'
import Image from 'next/image'
import Link from 'next/link';
import { db } from '@/lib/db/db'
import { authorize } from '@/lib/api/authorize';

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

  return {
    props: {
      user: user
    }
  }
}

const Dashboard: NextPage<any> = ({ user }) => {
  return (
    <Layout>
      <section className="mx-4 sm:mx-12 lg:mx-24 min-h-screen flex flex-col items-center justify-center">
        {
          user ?
            <>
              <h1 className='text-white text-4xl'>Dashboard</h1>
              <p className='text-white text-xl'>WOW! Your PFP is so cool :))</p>
              <img alt="pfp" src={user.profilePic}/>
            </>
            : <h1 className='text-white text-4xl'>Log in to view Dashboard.</h1>
        }
      </section>
    </Layout>
  )
}

export default Dashboard