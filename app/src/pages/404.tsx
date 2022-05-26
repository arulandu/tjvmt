import { Layout } from '@/components/layout';
import Error from 'next/error'

const Custom404 = () => {
  return (
    <Layout>
      <section className='h-screen flex justify-center items-center'>
        <p className=' text-white text-xl md:text-3xl text-center mx-4'>Hmm... this page doesn't exist. Maybe go back?</p>
      </section>
      {/* <Error statusCode={404} /> */}
    </Layout>
  );
}

export default Custom404