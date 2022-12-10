import type { NextPage } from 'next'
import { Layout } from '@/components/layout'
import Image from 'next/image'
import Link from 'next/link';

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
        src="/images/duke.JPG"
        alt="Duke Picture"
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
              src="/images/officers.JPG"
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
            Ms. Razzino + Dr. Lampazzi
          </span>
        </p>
      </div>

      {/* </div> */}
    </section>
  );
};

  export async function getStaticProps() {
    return {
      props: {
        officers: [
          {
            picture: `/images/officers/nikhil.png`,
            position: "Captain",
            name: "Nikhil Pesaladinne",
          },
          {
            picture: `/images/officers/caleb.png`,
            position: "Co-Captain",
            name: "Alvan Caleb Arulandu",
          },
          {
            picture: `/images/officers/isabella.png`,
            position: "Co-Captain",
            name: "Isabella Zhu",
          },
          {
            picture: `/images/officers/michelle.png`,
            position: "Statistician",
            name: "Michelle Kang",
          },
          {
            picture: `/images/officers/laura.png`,
            position: "Statistician",
            name: "Laura Zhang",
          },
          {
            picture: `/images/officers/avni.png`,
            position: "Finance Officer",
            name: "Avni Garg",
          },
          {
            picture: `/images/officers/zani.png`,
            position: "Finance Officer",
            name: "Zani Xu",
          },
          {
            picture: `/images/officers/mihika.png`,
            position: "Secretary",
            name: "Mihika Dusad",
          },
          {
            picture: `/images/officers/madhav.png`,
            position: "Historian",
            name: "Madhav Krishnaswamy",
          },
        ],
      },
    };
  }

  const Sponsor = ({ text, img, company, link }) => {
    return (
      <div
        className={`m-4 p-4 sm:w-6/8 lg:w-2/5 bg-navy-light bg-opacity-80 rounded-md "opacity-100 translate-x-0" : "-translate-x-12 opacity-0"
        } flex transition-all duration-300`}
      >
        <div className="w-full text-center items-center">
          <a href={link}>
            <img
            src={img}
            alt={company}
            className="max-h-40 mx-auto my-2"
            />
          </a> 
          <p className="text-white text-lg p-2">{text}</p>
        </div>
      </div>
    );
  };

  const BronzeSponsor = ({ img, company, link }) => {
    return (
      <div
        className={`m-4 p-4 sm:w-6/8 lg:w-2/5 bg-navy-light bg-opacity-80 rounded-md "opacity-100 translate-x-0" : "-translate-x-12 opacity-0"
        } flex transition-all duration-300`}
      >
        <div className="w-full text-center items-center">
          <a href={link}>
            <img
            src={img}
            alt={company}
            className="max-h-40 mx-auto my-2"
            />
          </a> 
        </div>
      </div>
    );
  };

const SponsorSection = () => {
    return (
        <section className="pt-24 md:max-w-2/3 xl:max-w-1/2 text-white bg-navy bg-opacity-50">
        <h1 className="text-5xl text-white text-center">Sponsors</h1>
        <h2 className="mt-12 text-3xl font-bold text-yellow-500 text-center">Gold Sponsors</h2>
        <div className = "mt-6 w-full flex flex-wrap justify-center items-start">
            <Sponsor
                text = "The TJ Partnership Fund (TJPF) is a nonprofit foundation dedicated to supporting Thomas Jefferson High School for Science and Technology (TJHSST) and works closely with the school administration to help further its unique mission."
                img = "/images/sponsors/TJPF.JPG"
                company = "TJ Partnership Fund"
                link = "https://www.tjpartnershipfund.org/"
            />
            <Sponsor
                text = "Wolfram uniquely unifies algorithms, data, notebooks, linguistics and deployment—enabling powerful workflows across desktop, cloud, server and mobile. Whatever your field, whatever your application, Wolfram technology provides the ultimate computation platform."
                img = "/images/sponsors/wolfram.jpg"
                company = "Wolfram"
                link = "https://www.wolfram.com/"
            />
            <Sponsor
                text = "The Russian School of Mathematics (RSM) is an award winning K-12 after-school math program that has empowered students to achieve excellence for over twenty years."
                img = "/images/sponsors/RSM.png"
                company = "RSM"
                link = "https://www.russianschool.com/"
            />
        </div>
        <h2 className="mt-8 text-3xl text-neutral-300 font-bold text-center">Silver Sponsors</h2>
        <div className = "mt-6 w-full flex flex-wrap justify-center items-start">
            <Sponsor
                text = "The Summer Program for Applied Rationality and Cognition (SPARC) is a free two-week program for talented high schoolers to develop quantitative skills and apply them to the world."
                img = "/images/sponsors/SPARC.png"
                company = "SPARC"
                link = "https://www.sparc-camp.com/"
            />
            <Sponsor
                text="Jane Street is a quantitative trading firm with offices worldwide. We hire smart, humble people who love to solve problems, build systems, and test theories. Our success is driven by our people and we never stop improving."
                img="/images/sponsors/jane_street.png"
                company="Jane Street"
                link = "https://janestreet.com"
            />
            <Sponsor
                text="The Daily Challenge is the first and only online math course that captivates. It was invented by world famous math professor Po-Shen Loh. Lessons are taught live by instructors who are not only brilliant at math, but also skilled in improvisational comedy and performance."
                img="/images/sponsors/daily_challenge.png"
                company="The Daily Challenge"
                link = "https://daily.poshenloh.com/"
            />
        </div>
        <h2 className="mt-8 text-3xl font-bold text-[#916b1a] text-center">Bronze Sponsors</h2>
        <div className = "mt-6 w-full flex flex-wrap justify-center items-start">
          <BronzeSponsor
            img = "/images/sponsors/aops.png"
            company = "AoPS"
            link = "https://artofproblemsolving.com"
          />
          <BronzeSponsor
            img = "/images/sponsors/vienna.png"
            company = "AoPS Vienna"
            link = "https://vienna.aopsacademy.org/"
          />
        </div>
      </section>
    )
}

const Home: NextPage<any> = ({ officers }) => {
  return (
    <Layout>
      <AboutUsSection/>
      <LeadershipSection officers={officers}/>
      <SponsorSection/>
    </Layout>
  );
};

export default Home