import type { NextPage } from 'next'
import { Layout } from '@/components/layout'
import { useEffect, useState } from 'react';
import { useSession } from '@/components/SessionProvider';
import { authorize } from '@/lib/api/authorize';
import { Directory } from '@/components/dashboard/directory';
import { ProblemSection } from '@/components/dashboard/problems';
import { RankingsSection } from '@/components/dashboard/rankings';
import { GraderSection } from '@/components/dashboard/grader';
import { PollSection } from '@/components/dashboard/polls';
import { handleInputChange } from '@/lib/handleInputChange';
import { Spinner } from '@/components/Spinner';
import { TabSelect } from '@/components/TabSelect';

export const getServerSideProps = async ({ req, res }) => {
  const { authorized } = await authorize(req, res)
  return authorized ? { props: {} } : { redirect: { destination: '/404', permanent: true } }
}



const Dashboard: NextPage<any> = ({ }) => {
  let { user } = useSession()
  const [input, setInput] = useState({ tab: 'polls' })
  const tabs = [
    { label: 'Polls', value: 'polls' },
    { label: 'Problems', value: 'problems'},
    { label: 'Rankings', value: 'rankings' },
    { label: 'Directory', value: 'directory' },
    user.admin ? {label: 'Grader', value: 'grader'} : null
  ].filter(v => v)

  const tabMap = {
    'polls': <PollSection />,
    'problems': <ProblemSection/>,
    'rankings': <RankingsSection/>,
    'directory': <Directory/>,
    'grader': <GraderSection/>
  }

  return (
    <Layout>
      <section className='mx-4 sm:mx-12 lg:mx-24 min-h-screen flex flex-col items-center justify-center'>
        <div className="h-screen flex flex-col items-center justify-center">
          <div className='w-32 h-32 rounded-full border-solid border-4 border-white bg-black overflow-hidden'>
            <img alt="Profile Picture" src={user.profilePicData} className='w-full h-full object-cover' />
          </div>
          <h1 className='mt-4 text-white text-center text-4xl'>Dashboard{user.admin ? ' (Admin)' : ''}</h1>
          <p className='text-white text-center text-xl mt-4'>Welcome to the dashboard! Your one stop shop for all things VMT.</p>
          <TabSelect id="tab" options={tabs} value={input.tab} onChange={(x) => setInput({...input, tab: x})} className='mt-8 flex-col sm:flex-row' />
        </div>
        {input.tab ? tabMap[input.tab] : null}
      </section>
    </Layout >
  )
}

export default Dashboard