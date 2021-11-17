import type { NextPage } from 'next'
import Image from 'next/image'
import { Layout } from 'components/layout'
import logo from 'public/images/logo.png'

const Construction: NextPage<any> = ({ officers }) => {
    return (
        <Layout>
            <section className="flex justify-center pt-40">
                <div>
                    <div className="m-auto my-8 w-1/5 relative">
                        <Image
                            src={logo}
                            alt="VMT Logo"
                        />
                    </div>
                    <p className="text-center text-xl">Website currently under construction - this page is coming soon!<br />
                        <a href="/" className="text-blue-500 hover:underline">Click Here to return to the homepage</a>
                    </p>
                </div>
            </section>
        </Layout>
    )
}

export default Construction
