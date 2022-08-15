import type { NextPage } from 'next'
import { Layout } from '@/components/layout'
import Image from 'next/image'
import Link from 'next/link';

const News: NextPage<any> = () => {
    return (
        <Layout>

            <section className="flex flex-col items-center justify-center pt-24">
                <h2 className="mb-6 text-white text-5xl gradient-text text-center">Calendar</h2>
                <iframe src="https://calendar.google.com/calendar/embed?src=vmtofficers%40gmail.com&ctz=America/New_York"
                    className="border-0" width={800} height={600} scrolling="no"></iframe>
                <br></br>
                <p>
                    <small className="mb-6 text-white text-base gradient-text text-center">
                        If there are any questions concerning the calendar, please email {' '}
                        <a className="text-blue-500 hover:underline" href="mailto:vmtofficers@gmail.com">vmtofficers@gmail.com</a>
                        .
                    </small>
                </p>
            </section>
            {/* TODO: Add back announcments functionality. 
            This section was removed as it wasn't updated when 
            weekly emails were sent in the beginning of the year. */}
        </Layout >
    )
}

export default News