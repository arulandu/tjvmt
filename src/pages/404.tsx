import { Layout } from '@/components/layout';
import OutlineButton from '@/components/OutlineButton';
import { useSession } from '@/components/SessionProvider';
import { useEffect, useState } from 'react';
import Error from 'next/error'
import { useRouter } from 'next/router';

const Custom404 = () => {
  const { session } = useSession()
  const router = useRouter()
  const [path, setPath] = useState(router.asPath)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setPath(window.location.href.match(/^https?:\/{2}[\w:\.]*/)[0] + '/dashboard')
    }
  }, [path])

  return (
    <Layout>
      <section className='h-screen flex flex-col justify-center items-center'>
        {/* <div> */}
          <p className=' text-white text-xl md:text-3xl text-center mx-4'>Hmm... this page doesn't exist.</p>
          {session ? null :
            <div className='mt-4 flex items-center'>
              <p className='text-white text-lg md:text-xl font-light text-center'>Maybe try logging in...?</p>
              <a className='' href={`/api/auth/ion?path=${path}`}>
                <OutlineButton className='mt-4 md:ml-4 md:mt-0' name="Log In" />
              </a>
            </div>
          }
        {/* </div> */}

      </section>
    </Layout>
  );
}

export default Custom404