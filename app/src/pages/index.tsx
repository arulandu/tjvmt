import type { NextPage } from 'next'
import { Layout } from '@/components/layout'
import Image from 'next/image'
import Header from '@/components/header';
import { Footer } from '@/components/footer';
import Background from '@/components/Background';

const HeroSection = () => {
  return (
    <section id="hero" className='h-screen flex items-center justify-center bg-transparent'>
      <div className='m-4 sm:m-12 md:w-3/4 xl:w-1/2 md:scale-90 hover:scale-100 transition-all duration-300 ease-in-out'>
        <p className='pr-4 text-white font-semibold text-base sm:text-2xl'>Hello, we are...</p>
        <div className='mt-2 relative w-full aspect-[18/5]'>
          <Image src='/images/nametag.png' alt="TJHSST Varsity Math Team" layout='fill' objectFit='cover'/>
        </div>
        <p className='ml-4 mt-4 text-white font-semibold text-base sm:text-2xl text-right'>...one of the most successful math teams in the nation.</p>
      </div>
    </section>
  );
}

const ExperienceCard = ({title, content, img}: {title: string, content: JSX.Element[], img: string}) => {
  return (
    <div className='w-96 xl:w-[36rem] mx-2 my-12 md:m-12 p-9 flex flex-col items-center border-solid border border-white bg-navy bg-opacity-75'>
      <div className='border-solid border-4 border-white relative w-40 sm:w-52 xl:w-64 aspect-[3/4]'>
        <Image src={img} alt={title} layout='fill'/>
      </div>
      <h3 className='mt-12 self-start text-white font-bold text-2xl xl:text-4xl'>{title}</h3>
      <ul>
      {
        content.map((item, ind) => {
          const key = title+new String(ind)
          return (
            <li key={key} className='mt-6 flex justify-start'>
              <div className='mt-0 mb-auto w-12 xl:w-24 relative aspect-square'>
                <p className='text-pink text-2xl xl:text-4xl'>▹</p>
              </div>
              <p className='text-white text-base xl:text-2xl'>{item}</p>
            </li>
          );
        })
      }
      </ul>
    </div>
  );
}

const ExperienceSection = () => {
  return (
    <section id="experience" className=''>
      <div className='flex flex-wrap items-start justify-center'>
        <ExperienceCard img="/images/experience/L1.png" title='The Individual' content={[
          <>Develop your problem solving skills weekly by attending guest lectures and afterschool Monday Practices.</>,
          <>Learn new math topics to prepare for national competitions and become a better mathlete.</>
        ]}/>
        <ExperienceCard img="/images/experience/L2.png" title='The Friend Group' content={[
          <>VMT is a great place to meet new people who share your passion for math!</>,
          <>Form lifelong connections with fellow mathletes who will help you grow.</>
        ]}/>
        <ExperienceCard img="/images/experience/L3_v2.png" title='The Community' content={[
          <>Here at VMT we have lots of fun. Join us for pie eating contests, plank countdowns, and more!</>,
          <>Give back to the math community by volunteering at outreach events like Techstravaganza and TJIMO.</>
        ]}/>
        <ExperienceCard img="/images/experience/L4.png" title='The Journey' content={[
          <>Our team meets during 8th period on Wednesday A and B block as well as Thursday after school in spring.</>,
          <>Whether your an experienced mathlete or curious beginner, VMT is an excellent way to spend your time in high school.</>
        ]}/>        
      </div>
    </section>
  );
}

const LeadershipSection = ({officers}: {officers: {picture: string, position: string, name: string}[]}) => {
  return (
    <section id="leadership" className='mx-4 sm:mx-12 lg:mx-24 py-24 flex flex-wrap xl:flex-nowrap items-start'>
      {/* <div className='w-full flex items-start'> */}
        <div className='flex-grow'>
          <div className='relative aspect-[13/10]'>
            <Image src="/images/team.png" alt="Team Picture" layout='fill' className=''/>
          </div>
          <h2 className='mt-8 text-white text-5xl font-bold'>Leadership</h2>
          <p className='mt-4 text-white text-2xl font-light'>By giving lectures and organizing activities, our officers work regularly to provide a great VMT experience for everyone, and VMT would not be possible without the help of our sponsors: 
          <span className='text-pink font-medium'> Ms. Razzino + Dr. Lampazzi</span>
          </p>
        </div>
        <div className='mt-16 xl:mt-0 ml-auto flex-grow flex flex-wrap items-center justify-around xl:justify-end'>
          {/* <h1 className='mb-4 w-full text-center text-white text-3xl font-bold'>Officers (2021-2022)</h1> */}
          {
            officers.map((officer) => {
              return (
                <div key={officer.name} className='m-2 group flex justify-center'>
                  <div className='relative w-64 aspect-[3/2] '>
                    <div className='absolute z-20 w-full bg-white opacity-0 -bottom-4 group-hover:bottom-0 group-hover:opacity-50 transition-all ease-in-out duration-200'>
                      <p className='text-navy text-base font-bold text-center'>{officer.name} ({officer.position})</p>
                      {/* <p className=''></p> */}
                    </div>
                    <Image src={officer.picture} alt={`${officer.name} (${officer.position})`} layout='fill' className='' />
                  </div>
                </div>
              );
            })
          }
        </div>
      {/* </div> */}
    </section>
  );
}

const Home: NextPage<any> = ({ officers }) => {
  return (
    <Layout>
      <HeroSection/>
      <ExperienceSection/>
      <LeadershipSection officers={officers}/>
    </Layout>
    
  )
}

export async function getStaticProps() {
  return {
    props: {
      officers: [
        { picture: `/images/officers/garrett.jpg`, position: "Captain", name: "Garrett Heller" },
        { picture: `/images/officers/drew.jpg`, position: "Co-Captain", name: "Andrew Kim" },
        { picture: `/images/officers/hilal.jpg`, position: "Co-Captain", name: "Mirza Hussain" },
        { picture: `/images/officers/caleb.jpg`, position: "Statistician", name: "Alvan Caleb Arulandu" },
        { picture: `/images/officers/pranav.jpg`, position: "Statistician", name: "Pranav Mathur" },
        { picture: `/images/officers/nikhil.jpg`, position: "Finance Officer", name: "Nikhil Pesaladinne" },
        { picture: `/images/officers/mihika.jpg`, position: "Finance Officer", name: "Mihika Dusad" },
        { picture: `/images/officers/aarav.jpg`, position: "Secretary", name: "Aarav Bajaj" },
        { picture: `/images/officers/shyla.jpg`, position: "Historian", name: "Shyla Bisht" }
      ]
    }
  }
}

export default Home
