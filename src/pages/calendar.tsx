import type { NextPage } from 'next'
import { Layout } from '@/components/layout'
import Image from 'next/image'
import Link from 'next/link';
import { authorize } from '@/lib/api/authorize';

export const getServerSideProps = async ({ req, res }) => {
  const { user } = await authorize(req, res)

  return {
    props: {
      user
    }
  }
}

const News: NextPage<any> = ({ user }) => {
    return (
        <Layout dim user={user}>

            <section className="flex flex-col items-center justify-center pt-24">
                <h2 className="mb-6 text-white text-5xl gradient-text text-center">Calendar</h2>
                <iframe className = "w-10/12 h-screen" src="https://calendar.google.com/calendar/embed?src=vmtofficers%40gmail.com&ctz=America/New_York"
                    ></iframe>
                <br></br>
                <p>
                    <small className="mb-6 text-white text-base gradient-text text-center">
                        If there are any questions concerning the calendar, please email {' '}
                        <a className="text-blue-500 hover:underline" href="mailto:vmtofficers@gmail.com">vmtofficers@gmail.com</a>
                        .
                    </small>
                </p>
            </section>
        </Layout >
    )
}

export default News