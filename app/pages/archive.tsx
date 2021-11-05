import type { NextPage } from 'next'
import { Layout } from 'components/layout'

const Archive: NextPage<any> = () => {
    return (
        <Layout>
            <section className="flex items-center justify-center pt-24">
                <div className="w-4/5 text-center">
                    <h1 className="m-auto font-adam text-5xl gradient-text text-center">Archive</h1>
                    <div className="flex justify-center flex-wrap">
                        <div className="my-12">
                            <h2 className="font-adam text-xl">2021-2022</h2>
                            <iframe src="https://drive.google.com/embeddedfolderview?id=19Mt2b4CUkF44IeTVX-2S6Wm5PfXzs7tY#list"></iframe>
                        </div>
                        <div className="my-12">
                            <h2 className="font-adam text-xl">2020-2021</h2>
                            <iframe src="https://drive.google.com/embeddedfolderview?id=13q2j2KyFUE25osA9djcVbnjvUlml2ekC#list" className="h-auto"></iframe>
                        </div>
                        <div className="my-12">
                            <h2 className="font-adam text-xl">2019-2020</h2>
                            <iframe src="https://drive.google.com/embeddedfolderview?id=1qAMlsBoHTgOCdpqP5ShykJqiDrelXSab#list"></iframe>
                        </div>
                        <div className="my-12">
                            <h2 className="font-adam text-xl">2018-2019</h2>
                            <iframe src="https://drive.google.com/embeddedfolderview?id=18i9qIIYXwkyLdKj6WjJrIQJG6jVtJSMz#list"></iframe>
                        </div>
                        <div className="my-12">
                            <h2 className="font-adam text-xl">2017-2018</h2>
                            <iframe src="https://drive.google.com/embeddedfolderview?id=0B_PFJ4obRn43MkozQlVNTWx1bE0#list"></iframe>
                        </div>
                        <div className="my-12">
                            <h2 className="font-adam text-xl">2016-2017</h2>
                            <iframe src="https://drive.google.com/embeddedfolderview?id=0B_PFJ4obRn43aFNQU3lWaUJQb0U#list"></iframe>
                        </div>
                        <div className="my-12">
                            <h2 className="font-adam text-xl">Older</h2>
                            <iframe src="https://drive.google.com/embeddedfolderview?id=0B_PFJ4obRn43MThpS3RHQjRTT00#list"></iframe>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    )
}

export default Archive
