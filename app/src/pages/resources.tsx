import type { NextPage } from 'next'
import { Layout } from '@/components/layout'
import Image from 'next/image'
import Link from 'next/link';
import { authorize } from '@/lib/api/authorize';

export const getServerSideProps = async ({ req, res }) => {
  const { user } = await authorize(req, res)

  return {
    props: {
      user
    }
  }
}

const ArchiveEmbed = ({ name, id }) => {
  return (
    <div className='mx-6 my-2 bg-opacity-90'>
      <Link href={`https://drive.google.com/drive/folders/${id}`} passHref>
        <a className='text-xl text-white opacity-50 hover:opacity-100 transition-all' target="_blank">{name}</a>
      </Link>
    </div>
  );
}

const Competition = ({ name, date, location, link, text, selection, withTJ = false }) => {
  return (
    <div
      className={`m-4 p-4 max-w-lg bg-navy-light bg-opacity-80 rounded-md flex transition-all duration-300 ${withTJ ? 'bg-navy-lightest' : 'bg-navy-light'}`}
    >
      <div className="w-full text-center items-center">
        {link ?
          <a href={link} className='text-white hover:underline text-3xl' target={link ? "_blank" : "_self"}>{name}</a>
          : <p className='text-white text-3xl'>{name}</p>
        }
        <p className="text-white text-lg p-2">{date} @ {location}</p>
        <p className="text-white text-lg p-2">{text}</p>
        <p className="text-white text-lg p-2">{selection}</p>
      </div>
    </div>
  );
}

const CalendarSection = () => {
  return (
    <iframe className="w-10/12 h-screen" src="https://calendar.google.com/calendar/embed?src=vmtofficers%40gmail.com&ctz=America/New_York" />
  );
}

const InternalResource = ({ link, name, newTab = true }) => {
  return (
    <div className='text-center'>
      <Link href={link} passHref>
        <a className='text-xl text-pink opacity-80 hover:opacity-100 hover:underline transition-al' target={newTab ? "_blank" : "_self"}>{name}</a>
      </Link>
    </div>
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
        <CalendarSection />
        <br></br>
        <p>
          <small className="mb-6 text-white text-base gradient-text text-center">
            If there are any questions concerning the calendar, please
            email: <a className="text-pink hover:underline" href="mailto:vmtofficers@gmail.com">vmtofficers@gmail.com</a>.
          </small>
        </p>
      </section>
      <section className="flex flex-col items-center justify-center pt-24">
        <div className="text-center">
          <h2 className="mb-6 text-white text-5xl gradient-text text-center">Archive</h2>
          <div className="flex justify-center flex-wrap">
            <ArchiveEmbed name="2024-2025" id="1uvDdTfmed3VCunEcDVyW7gsuPlkgN-h6#list" />
            <ArchiveEmbed name="2023-2024" id="1Lpw4cR9vX_H6AZHj6xwofYsGNXAqq4Mw#list" />
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
      {user ?
        <>
          <section className="flex flex-col items-center justify-center pt-24">
            <h2 className="mb-6 text-white text-5xl gradient-text text-center">Upcoming Competitions</h2>
            <p className="text-center">
              <small className="mb-6 text-white text-base gradient-text text-center">
                Check the competitions guide for more information on VMT sponsored travel competitions.
              </small>
              <br />
              <small className="mb-6 text-white text-base gradient-text text-center">
              Click on the title for the link to the competition website. Brighter boxes are TJ sponsored competitions.
              </small>
            </p>
            <div className="flex justify-center flex-wrap">
              <Competition name="MMATHS" date="Oct 26, 2024" location="UMD or Yale" link='https://www.mmaths.org/' text="Open to anyone, make teams of 6." selection='This contest is self organized, so you can make your own team and register!' />
              <Competition name="CMWMC" date="Oct 26, 2024" location="CMU" link='https://cmimc.math.cmu.edu/cmwmc' text="Beginner friendly competition for girls." selection='This contest is self organized, so you can make your own team and register!' />
              <Competition name="Duke Math Meet" date="Nov 6, 2024?" location="Duke" link='https://math.duke.edu/duke-math-meet' text="Duke is okay. Will take 4 teams of 6." selection='Team selection using a combination of Proof TST and 4 Duke TSTs.' withTJ={true} />
              <Competition name="PUMaC" date="Nov 12, 2024?" location="Princeton" link='https://pumac.princeton.edu/' text="The problems at the competition are... certainly interesting. Will take 2 teams of 8." selection='Team selection using a combination of Proof TST and the top 3 Subject TSTs.' withTJ={true} />
              {/* <Competition name="ARML Power Fall" date='TBD' location='TJ' link='' text='Unrelated to ARML, but we have two teams of 15 take the contest during 8th period or after school one day.' selection='Teams decided using Duke Rankings probably.' /> */}
              {/* <Competition name="INTEGIRLS DC" date='Dec 9, 2023' location='Montgomery College' link='https://dc.integirls.org/math' text='Beginner friendly competition for girls.' selection='This contest is self organized, so you can make your own team and register!' /> */}
              {/* <Competition name="BMT Online" date="Jan 2025" location="Home (Virtual)" link='https://berkeley.mt/' text='Online version of BMT 2024 (must not have competed in a prior iteration of BMT 2024).' selection='This contest is self organized, so you can make your own team and register (costs $8)!' /> */}
              <Competition name="University of Houston Math Contest" date="February 8, 2025" location="Home (Virtual)" link='https://mathcontest.uh.edu/' text='Free online competition with prizes of Amazon gift cards up to $100.' selection='Check the pinned messages in the VMT messenger chat or message an officer for the codes.' />
              <Competition name="HMMT" date="Feb 15, 2025" location="MIT" link='https://www.hmmt.org/' text="The most competitive competition in the nation. Will take at least 1 team of 8." selection='Team selection using a combination of Proof TST, top 3 Subject TSTs, and 2 HMMT General TSTs.' withTJ={true} />
              <Competition name="Girls in Math at Yale" date="Feb-March 2025" location="Yale" link='https://www.mmaths.org/girls-in-math-at-yale.html' text='Open to all girls.' selection='This contest is self organized, so you can make your own team and register!' />
              <Competition name="CMIMC" date='March-April 2025' location='CMU' link='https://cmimc.math.cmu.edu/' text='Chillest competiiton of the year. Last year we were able to take 8 teams of 6.' selection='Aside from A team, there are no TSTs! Choosing people based on club commitment.' withTJ={true} />
              <Competition name="Purple Comet" date='April 2025' location='TJ' link='https://purplecomet.org/' text='Fun team competition which takes place before an ARML Practice. Allowed to use anything excpet for the internet :o.' selection='No TSTs! We will release a sign up form and all teams who sign up will be able take the contest.' withTJ={true} />
              <Competition name="SMT" date="Spring 2025" location="Home (Virtual) or Stanford" link='https://www.stanfordmathtournament.com/' text='You can fly to Stanford if you want.' selection='This contest is self organized, so you can make your own team and register!' />
              <Competition name="JHMT" date='Spring 2025' location="John Hopkins" link='https://math.jhu.edu/~mathclub/jhmt.html' text='Divisions are grades 9-10 and 11-12. Teams of 4.' selection='This contest is self organized, so you can make your own team and register!' />
              <Competition name="ARML Local" date='Spring 2025' location="Home (or maybe at TJ)" link='https://www.arml.com/' text='ARML Local is a great way to get a feel for the ARML competition. Requires a parent proctor for each team.' selection='No TSTs! We will release a sign up form and all teams who sign up will be able take the contest.' withTJ={true} />
              {/* <Competition name="ARML Power Spring" date='TBD' location='TJ' link='' text='Unrelated to ARML, but we have two teams of 15 take the contest after school one day.' selection='Teams decided using ARML Rankings and possibly the Proof TST.' /> */}
              <Competition name="ARML" date="May 31, 2025" location="Penn State" link="https://www.arml.com/" text="ARML is the last and biggest competition of the year! We usually take 3 teams of 15 plus a couple alternates." selection='TSTs taken every Thursday after school, starting around late February. Estimated 2 drops with the rest of the TSTs weighted equally.' withTJ={true}/>
            </div>
          </section>
          <br />
          <section className='mt-6 sm:mx-12 lg:mx-24 flex flex-col items-center justify-center border-solid border-2 border-white'>
            <div className='m-8 items-center justify-center'>
              <h1 className='text-white text-center text-3xl font-bold mb-4'>Internal Resources (Do Not Share)</h1>
              {/* <InternalResource link="https://docs.google.com/document/d/1y5xmvv1OFQOh21uZ-EA5KX4Od82mfpp0gqyD8J0nCts/edit?usp=sharing" name="AMCs Guide (Isabella Zhu '23)" /> */}
              {/* <InternalResource link="https://tjvmt.com/u/peezza" name="ARML Pizza" /> */}
              {/* <InternalResource link="/arml" name="ARML Information" newTab={false} /> */}
              <InternalResource link="https://tjvmt.com/u/compguide" name="2024-25 Competitions Guide" />
              <InternalResource link="https://tjvmt.com/u/opportunities" name="Summer Programs and Opportunities Guide" />
              <InternalResource link="https://tjvmt.com/u/thursday_practice" name="Thursday Practice Schedule" />
              <InternalResource link="https://tjvmt.com/u/information" name="Orientation Packet 2024-25" />
              <InternalResource link="https://tjvmt.com/u/discord_" name="Discord" />
            </div>
          </section>
        </>
        : null}

    </Layout>
  )
}

export default Resources
