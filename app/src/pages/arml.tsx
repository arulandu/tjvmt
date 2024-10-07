import type { NextPage } from 'next'
import { Layout } from '@/components/layout'
import { authorize } from '@/lib/api/authorize';
import Link from 'next/link'

export const getServerSideProps = async ({ req, res }) => {
    const { authorized } = await authorize(req, res)
    return authorized ? { props: {} } : { redirect: { destination: '/404', permanent: true } }
}

const AnnoucementsSection = () => {
    return (
        <div className='mt-6 sm:mx-12 lg:mx-24 items-center justify-center'>
            <h1 className='text-white text-center text-3xl font-bold mb-4'>Reminders</h1>
            <u>
                <li className='text-white text-center text-lg'>Everyone (unless you have indicated you play a sport on the form) must check in with a teacher in math commons before 4:30pm</li>
                <li className='text-white text-center text-lg'>Extra pizza is typically not ordered, so if you want to buy pizza make sure to fill out the form by 4:30pm as well ($2 per slice)</li>
                <li className='text-white text-center text-lg'><b>Attendance on website is due by 5:30pm</b>. If you do not fill out attendance in time or if you fill out attendance but don't show up, you will be penalized 1% on your overall TST score (if you need to show up late due to a sport/other reason, please inform an officer).</li>
                <li className='text-white text-center text-lg'>Lectures are required (unless you have sports practice)</li>
            </u>
        </div>
    )
}

const Resource = ({ link, name }) => {
    return (
        <div className='text-center'>
            <Link href={link} passHref>
                <a className='text-xl text-pink opacity-80 hover:opacity-100 hover:underline transition-al' target="_blank">{name}</a>
            </Link>
        </div>
    );
}

const ARML: NextPage<any> = ({ authorized }) => {
    return (
        <Layout user={authorized}>
            <div className="mx-4 sm:mx-8 lg:mx-8 pt-24 items-center">
                <h2 className="mb-6 text-center text-white text-5xl">ARML!</h2>
                <p className="relative w-11/12 lg:w-9/12 my-8 mx-auto text-center text-white text-lg lg:text-2xl font-light">
                    Welcome to ARML! Here you can find all things ARML related.
                </p>
                <p className="relative w-11/12 lg:w-9/12 my-8 mx-auto text-white text-base gradient-text text-center">
                    ARML is the last and biggest competition of the year! We usually take 3 teams of 15 plus a couple alternates. TSTs taken every Thursday after school. Practice runs from 6:15-9pm, with lectures from 6:15-7pm and TSTs from 7-9pm. TSTs consist of team round (20%), individual (70%), and relay (10%). Final index is calculated with 2 drops and the rest of the TSTs weighted equally. If you have any questions, feel free to ask an officer.
                </p>

                <AnnoucementsSection />

                <div className='m-8 items-center justify-center'>
                    <h1 className='text-white text-center text-3xl font-bold mb-4'>Links</h1>
                    <Resource link="https://tjvmt.com/u/armlpermform" name="Permission Form (due 2/15)" />
                    <Resource link="https://tjvmt.com/u/pizza" name="Pizza Order (due 4:30)" />
                    <Resource link="https://tjvmt.com/u/armlteams" name="Teams" />
                    <Resource link="https://tjvmt.com/u/armlrankings" name="Rankings" />
                </div>

            </div>
        </Layout >
    )
}

export default ARML