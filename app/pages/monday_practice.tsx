import type { NextPage } from 'next'
import { Layout } from 'components/layout'

// TODO: Weekly problems - better rendering system without just <script mathjax> in index

const MondayPractice: NextPage<any> = () => {
    return (
        <Layout>

            <section className="flex flex-col items-center justify-center pt-24 mb-10">
                <h1 className="m-auto font-adam text-4xl gradient-text text-center">Monday Practice</h1>
                <p className="font-bold">4:10 PM - 6:00 PM @ TJHSST</p>
                <a
                    href="https://drive.google.com/drive/folders/1EJWop2g32qJgn_9cgHaCFJUv6eeH3TGX?usp=sharing"
                    target="_blank"
                    className="inline-block font-adam text-center text-l my-5 pt-3 pb-2 px-5 mx-4 rounded-full border-solid border-black border-2 hover:bg-gray-100">
                    Lectures</a>
            </section>
            <section className="flex flex-col items-center justify-center">
                <script src="https://polyfill.io/v3/polyfill.min.js?features=es6"></script>
                <script id="MathJax-script" src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js" async></script>

                <h2 className="m-auto font-adam text-3xl gradient-text text-center">Problem of the Week</h2>
                <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLScIvHE8KJ61tHlAfRA2D_dp5b-tNX0HaBCr4XKsFnzEFazA_g/viewform?usp=sf_link"
                    target="_blank"
                    className="block text-blue-500 hover:underline">
                    Submit Here</a>
            </section>
        </Layout>
    )
}

export default MondayPractice
