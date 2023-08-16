import type { NextPage } from 'next'
import { Layout } from '@/components/layout'
import Image from 'next/image'
import Link from 'next/link';
// import { authorize } from '@/lib/api/authorize';

// export const getServerSideProps = async ({ req, res }) => {
//   const { user } = await authorize(req, res)

//   return {
//     props: {
//       user
//     }
//   }
// }

const ArchiveEmbed = ({ name, id }) => {
  return (
    <div className='mx-6 my-2 bg-opacity-90'>
      <Link href={`https://drive.google.com/drive/folders/${id}`} passHref>
        <a className='text-xl text-white opacity-50 hover:opacity-100 transition-all' target="_blank">{name}</a>
      </Link>
    </div>
  );
}

const CalendarSection = () => {
  return (
      <iframe className = "w-10/12 h-screen" src="https://calendar.google.com/calendar/embed?src=vmtofficers%40gmail.com&ctz=America/New_York"/>
  );
}

const Resources: NextPage<any> = ({ user }) => {
  return (
    <Layout dim>
      {/* <div className = "mx-4 sm:mx-8 lg:mx-8 pt-24 items-center">
        <h1 className="mb-6 text-center text-white text-5xl"> Resources</h1>
      </div> */}
      <section className="flex flex-col items-center justify-center pt-24">
          <h2 className="mb-6 text-white text-5xl gradient-text text-center">Calendar</h2>
          <CalendarSection/>
          <br></br>
          <p>
              <small className="mb-6 text-white text-base gradient-text text-center">
                  If there are any questions concerning the calendar, please 
                  email: <a className="text-pink hover:underline" href="mailto:vmtofficers@gmail.com">vmtofficers@gmail.com</a>.
              </small>
          </p>
      </section>
      <section className="mx-4 sm:mx-8 lg:mx-8 pt-24 items-center">
        <div className="text-center">
          <h2 className="mb-6 text-white text-5xl gradient-text text-center">Archive</h2>
          <div className="flex justify-center flex-wrap">
            <ArchiveEmbed name="2022-2023" id="1rlZPq5Y5ndRdE1XwOSI4zSiJF0ln6s4L#list" />
            <ArchiveEmbed name="2021-2022" id="19Mt2b4CUkF44IeTVX-2S6Wm5PfXzs7tY#list" />
            <ArchiveEmbed name="2020-2021" id="13q2j2KyFUE25osA9djcVbnjvUlml2ekC#list" />
            <ArchiveEmbed name="2019-2020" id="1qAMlsBoHTgOCdpqP5ShykJqiDrelXSab#list" />
            <ArchiveEmbed name="2018-2019" id="18i9qIIYXwkyLdKj6WjJrIQJG6jVtJSMz#list" />
            <ArchiveEmbed name="2017-2018" id="0B_PFJ4obRn43MkozQlVNTWx1bE0#list" />
            <ArchiveEmbed name="2016-2017" id="0B_PFJ4obRn43aFNQU3lWaUJQb0U#list" />
            <ArchiveEmbed name="Older" id="0B_PFJ4obRn43MThpS3RHQjRTT00#list" />
          </div>
        </div>
      </section>
      {/* {user ?
        <section className='mt-6 sm:mx-12 lg:mx-24 flex flex-col items-center justify-center border-solid border-2 border-white'>
          <div className='m-8 items-center justify-center'>
            <h1 className='text-white text-center text-3xl font-bold mb-4'>Internal Resources (Do Not Share)</h1>
            <div className='text-center'>
              <Link href={`https://docs.google.com/document/d/1y5xmvv1OFQOh21uZ-EA5KX4Od82mfpp0gqyD8J0nCts/edit?usp=sharing`} passHref>
                <a className='text-xl text-white opacity-100 hover:opacity-50 transition-al' target="_blank">AMCs Guide (Isabella Zhu)</a>
              </Link>
            </div>
            <div className='text-center mt-2'>
              <Link href={`https://tjvmt.com/u/arml_teams`} passHref>
                <a className='text-xl text-white opacity-100 hover:opacity-50 transition-al' target="_blank">ARML Teams Spreadsheet</a>
              </Link>
            </div>
            <div className='text-center mt-2'>
              <Link href={`https://tjvmt.com/u/orderpizza`} passHref>
                <a className='text-xl text-white opacity-100 hover:opacity-50 transition-al' target="_blank">ARML Pizza Form</a>
              </Link>
            </div>
            <div className='text-center mt-2'>
              <Link href={`https://docs.google.com/spreadsheets/d/1s1D4J-Q3RpOx26tAgkUapoPli1bRKR_P2vlOBHC4asg/edit?usp=sharing`} passHref>
                <a className='text-xl text-white opacity-100 hover:opacity-50 transition-al' target="_blank">ARML Rankings</a>
              </Link>
            </div>
          </div>
        </section>
        : null} */}

    </Layout>
  )
}

export default Resources
