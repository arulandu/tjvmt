import type { NextPage } from 'next'
import { Layout } from 'components/layout'

const Construction: NextPage<any> = ({ officers }) => {
    return (
        <Layout>
            <section className="flex justify-center pt-40">
                <div>
                    <img src="images/logo.png" alt="VMT Logo" className="block m-auto my-8 w-1/5" />
                    <p className="text-center text-xl">Website currently under construction - this page is coming soon!<br/>
                    <a href="/" className="text-blue-500 hover:underline">Click Here to return to the homepage</a>
                    </p>
                </div>
            </section>
        </Layout>
    )
}

export default Construction
