import type { NextPage } from 'next'
import { Layout } from '@/components/layout'
import Image from 'next/image'
import Link from 'next/link';

const ArchiveEmbed = ({name, id}) => {
  return (
    <div className='mx-6 my-2 bg-opacity-90'>
      <Link href={`https://drive.google.com/drive/folders/${id}`} passHref>
        <a className='text-xl text-white opacity-50 hover:opacity-100 transition-all' target="_blank">{name}</a>
      </Link>
    </div>
  );
}

const Resources: NextPage<any> = () => {
  return (
    <Layout>
      <section className="mx-4 sm:mx-12 lg:mx-24 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="mb-6 text-white text-5xl gradient-text text-center">Archive</h1>
          <div className="flex justify-center flex-wrap">
            <ArchiveEmbed name="2022-2023" id="1rlZPq5Y5ndRdE1XwOSI4zSiJF0ln6s4L#list"/>
            <ArchiveEmbed name="2021-2022" id="19Mt2b4CUkF44IeTVX-2S6Wm5PfXzs7tY#list"/>
            <ArchiveEmbed name="2020-2021" id="13q2j2KyFUE25osA9djcVbnjvUlml2ekC#list"/>
            <ArchiveEmbed name="2019-2020" id="1qAMlsBoHTgOCdpqP5ShykJqiDrelXSab#list"/>
            <ArchiveEmbed name="2018-2019" id="18i9qIIYXwkyLdKj6WjJrIQJG6jVtJSMz#list"/>
            <ArchiveEmbed name="2017-2018" id="0B_PFJ4obRn43MkozQlVNTWx1bE0#list"/>
            <ArchiveEmbed name="2016-2017" id="0B_PFJ4obRn43aFNQU3lWaUJQb0U#list"/>
            <ArchiveEmbed name="Older" id="0B_PFJ4obRn43MThpS3RHQjRTT00#list"/>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default Resources