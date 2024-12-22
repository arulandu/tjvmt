import type { NextPage } from 'next'
import { Layout } from '@/components/layout'
import Image from 'next/image'
import Link from 'next/link';
import { authorize } from '@/lib/api/authorize';
import { useState } from 'react';

export const getServerSideProps = async ({ req, res }) => {
  const { user } = await authorize(req, res)

  return {
    props: {
      user,

      officers: [
        {
          picture: `/images/officers/24/abhi.jpg`,
          position: "Captain",
          name: "Abhi Palikala",
        },
        {
          picture: `/images/officers/24/samarth.jpg`,
          position: "Co-Captain",
          name: "Samarth Bhargav",
        },
        {
          picture: `/images/officers/24/avni.jpg`,
          position: "Co-Captain",
          name: "Avni Garg",
        },
        {
          picture: `/images/officers/24/calvin.jpg`,
          position: "Statistician",
          name: "Calvin Wang",
        },
        {
          picture: `/images/officers/24/olivia.jpg`,
          position: "Statistician",
          name: "Olivia Wu",
        },
        {
          picture: `/images/officers/24/anderson.jpg`,
          position: "Finance Officer",
          name: "Anderson Hao",
        },
        {
          picture: `/images/officers/24/sophia.jpg`,
          position: "Finance Officer",
          name: "Sophia Hou",
        },
        {
          picture: `/images/officers/24/alex.jpg`,
          position: "Secretary",
          name: "Alexander Gu",
        },
        {
          picture: `/images/officers/24/michelle.jpg`,
          position: "Historian",
          name: "Michelle Zuo",
        },
      ],

      awards: [
        {
          picture: `/images/awards/duke24_all.jpg`,
          name: "Duke 2024",
          team: ["TJ A: 1st Place","TJ B: 2nd Place", "TJ C: 4th Place"],
          indiv: ["Shunyao Yan: 1st Place", "Sophia Hou: 3rd Place", "Alexander Gu: 4th Place", "Avnith Vijayram: 5th Place"]
        },
        {
          picture: `/images/awards/mmaths24.jpg`,
          name: "MMATHS 2024",
          team: ["The Snorlaxes: 1st Place"],
          indiv: ["Alexander Gu: 1st Place", "Alexander Liu: 4th Place", "Patrick Du: 5th Place", "Shunyao Yan: 8th Place, 2nd in Lightning Finals"]
        },
        {
          picture: `/images/awards/pumac24.jpg`,
          name: "PUMaC 2024",
          team: ["TJ A: 2nd Overall, 5th in Team, 10th in Power"],
          indiv : ["Calvin Wang: 3rd Overall, 5th in Algebra, 5th in Number Theory", "Sophia Hou: 3rd in Geometry",
            "Anderson Hao: 3rd in Geometry", "Patrick Du: 4th in Combinatorics", "Alexander Liu: 4th in Combinatorics",
            "Arjun Pagidi: 8th in Combinatorics", "Max Zhao: 10th in Algebra"
          ]
        },
      ]
    }
  }
}

// export async function getStaticProps() {
//   return {
//     props: {,
//     },
//   };
// }

const AboutUsSection = () => {
  return (
    <div className = "mx-4 sm:mx-8 lg:mx-8 pt-24 items-center">
      <h2 className="mb-6 text-center text-white text-5xl">
          About Us
      </h2>
      <p className="relative w-11/12 lg:w-9/12 my-8 mx-auto text-center text-white text-lg lg:text-2xl font-light">
      Welcome to the TJ Varsity Math Team (VMT)! We aim to foster a passion for mathematics 
      and a community of learners through engaging student-led lectures and practice tests.
      We consistently participate and place at various college-hosted competitions. We also host
      our own annual competition for middle schoolers. 
      </p>
      <div className ="mx-auto relative w-11/12 lg:w-9/12 aspect-[4/3]">
      <Image
        src="/images/arml24.png"
        alt="ARML Picture"
        layout="fill"
      />
      </div>
    </div>
  )
}


const LeadershipSection = ({
  officers,
}: {
  officers: { picture: string; position: string; name: string }[];
}) => {
  return (
    <section
      id="leadership"
      className="mx-4 sm:mx-8 lg:mx-8 pt-24 flex flex-wrap xl:flex-nowrap items-start"
    >
      {/* <div className='w-full flex items-start'> */}
      <div>
        <h2 className="mb-12 text-center text-white text-5xl">
          Leadership
        </h2>
        <div className="flex flex-wrap lg:flex-nowrap justify-center">
          <div className="relative aspect-[13/10] w-11/12 lg:w-8/12 mb-8 lg:mb-0">
            <Image
              src="/images/officers/officers24.jpg"
              alt="Officer Picture"
              layout="fill"
              className="object-contain"
            />
          </div>
          <div className="w-1/2 lg:grid lg:grid-cols-3 lg:ml-16 flex flex-grow flex-wrap items-center justify-around xl:justify-center">
            {officers.map((officer) => {
              return (
                <div
                  key={officer.name}
                  className="m-2 group flex justify-center"
                >
                  <div className="relative w-60 aspect-[1/1] ">
                    <div className="absolute z-20 w-full bg-white opacity-0 -bottom-4 group-hover:bottom-0 group-hover:opacity-50 transition-all ease-in-out duration-200">
                      <p className="text-navy text-base font-bold text-center">
                        {officer.name} ({officer.position})
                      </p>
                    </div>
                    <Image
                      src={officer.picture}
                      alt={`${officer.name} (${officer.position})`}
                      layout="fill"
                      className="object-contain"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <p className="mt-8 text-center text-white text-2xl font-light">
          By giving lectures and organizing activities, our officers work
          regularly to provide a great VMT experience for everyone, and VMT
          would not be possible without the help of our teacher sponsors:
          <span className="text-pink font-medium">
            {" "}
            Ms. Razzino + Dr. Lampazzi + Ms. Juster
          </span>
        </p>
      </div>

      {/* </div> */}
    </section>
  );
};

const AwardsSection = ({
  awards,
}: {
  awards: { picture: string; name: string; team: string[]; indiv: string[]}[];
}) => {

  const [openAward, setOpenAward] = useState<string | null>(null);
  const toggleDropdown = (awardName: string) => {
    setOpenAward(openAward === awardName ? null : awardName);
  };
  return (
    <section
      id="awards"
      className="mx-4 sm:mx-8 lg:mx-8 pt-24 flex flex-wrap xl:flex-nowrap items-start"
    >
      <div>
        <h2 className="mb-4 text-center text-white text-5xl w-screen">
          Awards
        </h2>
        <p className = "text-center">
          <small className="mb-6 text-white text-base gradient-text text-center">
            Click image for detailed results.
          </small>
        </p>
        <div className="flex flex-wrap justify-center m-2">
          {awards.map((award) => { return (
            /*<div className="relative w-1/4 aspect-[1/1] group m-2">
              {/*<div className="absolute z-20 w-full bg-white opacity-0 -bottom-4 group-hover:bottom-0 group-hover:opacity-50 transition-all ease-in-out duration-200">
                <p className="text-navy text-base font-bold text-center">
                  {award.name}
                </p>
              </div>
              <Image
                src={award.picture}
                alt={award.name}
                layout="fill"
                className="object-contain"
              />
            </div>*/
            <div key={award.name} className = "relative w-1/4 aspect-[13/11] group m-2">
              <div
                className="relative w-full aspect-[13/10] cursor-pointer"
                onClick={() => toggleDropdown(award.name)}
              >
              <Image
                src={award.picture}
                alt={award.name}
                layout="fill"
                className="object-contain"
              />
              </div>
              <div className="relative z-10 w-full bg-white opacity-0 -bottom-4 group-hover:bottom-0 group-hover:opacity-50 transition-all ease-in-out duration-200">
                <p className="text-navy text-base font-bold text-center">
                  {award.name}
                </p>
              </div>
              {openAward === award.name && (award.team || award.indiv) && (
                <div className="absolute z-30 left-0 w-full mt-2 p-2 bg-gray-300 rounded-md shadow-md transition-all ease-in-out duration-300">
                <h4 className="text-center font-bold mb-1">Team Results</h4>
                <ul className="list-disc pl-4 text-sm">
                  {award.team.map((detail, index) => (
                    <li key={index}>{detail}</li>
                  ))}
                  <br /> 
                </ul>
                <h4 className="text-center font-bold mb-1">Individual Results</h4>
                <ul className="list-disc pl-4 text-sm">
                  {award.indiv.map((detail, index) => (
                    <li key={index}>{detail}</li>
                  ))}
                </ul>
              </div>
              )}
            </div>
          )})}
        </div>
      </div>
    </section>
  );
};

const Home: NextPage<any> = ({ officers, awards, user }) => {
  return (
    <Layout user={user}>
      <AboutUsSection/>
      <LeadershipSection officers={officers}/>
      <AwardsSection awards={awards}/>
      {/* <SponsorSection/> */}
    </Layout>
  );
};

export default Home