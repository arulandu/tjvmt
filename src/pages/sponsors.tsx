import type { NextPage } from 'next'
import { Layout } from '@/components/layout'
import Image from "next/legacy/image"
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

const Sponsor = ({ text, img, company, link }) => {
  return (
    <div
      className={`m-4 p-4 max-w-lg bg-navy-light bg-opacity-80 rounded-md "opacity-100 translate-x-0" : "-translate-x-12 opacity-0"
      } flex transition-all duration-300`}
    >
      <div className="w-full text-center items-center">
        <a href={link} target="_blank">
          <img
            src={img}
            alt={company}
            className="max-h-40 mx-auto my-2"
          />
        </a>
        <p className="text-white text-lg p-2" dangerouslySetInnerHTML={{ __html: text }}></p>
      </div>
    </div>
  );
};

const SmallerSponsor = ({ img, company, link }) => {
  return (
    <div
      className={`m-4 p-4 sm:w-6/8 lg:w-2/5 bg-navy-light bg-opacity-80 rounded-md "opacity-100 translate-x-0" : "-translate-x-12 opacity-0"
      } flex transition-all duration-300`}
    >
      <div className="w-full text-center items-center">
        <a href={link} target="_blank">
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
      <p className="relative w-11/12 lg:w-9/12 my-8 mx-auto text-center text-white text-lg lg:text-2xl font-light">
        We would like to thank our sponsors for their generous support!
      </p>
      <h2 className="mt-12 text-3xl font-bold text-yellow-500 text-center">Gold Sponsors</h2>
      <div className="mt-6 w-full flex flex-wrap justify-center items-start">
        <Sponsor
          text="The TJ Partnership Fund (TJPF) is a nonprofit foundation dedicated to supporting Thomas Jefferson High School for Science and Technology (TJHSST) and works closely with the school administration to help further its unique mission."
          img="/images/sponsors/TJPF.JPG"
          company="TJ Partnership Fund"
          link="https://www.tjpartnershipfund.org/"
        />
        <Sponsor
          text="TJ Academic Boosters (TJAB) constitutes a devoted organization of parent volunteers who are committed to supporting students and their academic team activities at Thomas Jefferson High School for Science and Technology (TJHSST)."
          img="/images/sponsors/tjab.png"
          company="TJ Academic Boosters"
          link="https://www.tjacademic.org/home"
        />
        <Sponsor
          text="<a href='https://www.citadel.com/careers/' target='_blank' rel='noopener noreferrer' class='text-pink underline'>Citadel</a> is one of the world's leading alternative investment firms, pursuing superior long-term returns for the world's preeminent public and private institutions. <a href='https://www.citadelsecurities.com/careers/' target='_blank' rel='noopener noreferrer' class='text-pink underline'>Citadel Securities</a> are the next-generation capital markets firms, delivering critical liquidity and helping to shape the markets of tomorrow."
          img="/images/sponsors/Citadel_CSEC.png"
          company="Citadel"
          link=""
        />
        <Sponsor
          text="Susquehanna is a global quantitative trading firm founded by a group of friends who share a passion for game theory and probabilistic thinking. Our rigorous and analytical approach to decision making has led Susquehanna to become one of the largest and most successful proprietary trading firms in the world. Our employees are relentless problem solvers who collaborate to make optimal decisions."
          img="/images/sponsors/susquehanna.png"
          company="Susquehanna"
          link="https://sig.com/"
        />
        {/*
        <Sponsor
          text="The Cake Shop Capital is led by its three founders: Dr. Lauren Cohen, Dr. William Powley and David Kim. In their more than decade working together, they have pioneered numerous techniques and ideas in Behavioral Finance that have been used throughout the field of asset management. This award winning work has been cited throughout academic and practitioner journals, and is widely cited in the popular press."
          img="/images/sponsors/cake_shop_capital.jpg"
          company="The Cake Shop Capital"
          link="https://www.thecakeshopcapital.com/"
        />
        */}
      </div>
      <h2 className="mt-8 text-3xl text-neutral-300 font-bold text-center">Silver Sponsors</h2>
      <div className="mt-6 w-full flex flex-wrap justify-center items-start">
        <Sponsor
          text="The Russian School of Mathematics (RSM) is an award winning K-12 after-school math program that has empowered students to achieve excellence for over twenty years."
          img="/images/sponsors/RSM.png"
          company="RSM"
          link="https://www.russianschool.com/"
        />
        <Sponsor
          text="Wolfram uniquely unifies algorithms, data, notebooks, linguistics and deployment—enabling powerful workflows across desktop, cloud, server and mobile. Whatever your field, whatever your application, Wolfram technology provides the ultimate computation platform."
          img="/images/sponsors/wolfram.jpg"
          company="Wolfram"
          link="https://www.wolfram.com/"
        />
        <Sponsor
          text="Hudson River Trading (HRT) is a multi-asset class quantitative trading firm based in New York City. Founded in 2002, HRT develops automated trading algorithms that provide liquidity and facilitate price discovery on exchanges and alternative trading systems. With offices around the world, HRT trades equities, futures, options, currencies and fixed income on over 200 markets worldwide."
          img="/images/sponsors/HRT.png"
          company="Hudson River Trading"
          link="https://www.hudsonrivertrading.com/"
        />
        <Sponsor
          text="We are the Vienna branch of Art of Problem Solving.  We offer afterschool and weekend math and language arts classes for advanced students who need more stimulating material than what they receive at school. Almost all of TJ's VMT are current or former AoPS students!"
          img="/images/sponsors/vienna.png"
          company="AoPS Vienna"
          link="https://vienna.aopsacademy.org/"
        />
        <Sponsor
          text="We offer quality math enrichment for gifted upper elementary and middle school students in the metropolitan Washington DC area. We’re here to help students appreciate the beauty and power of serious and challenging mathematics through our summer camps and small group enrichment sessions."
          img="/images/sponsors/math_reasoning.png"
          company="Math Reasoning"
          link="https://mathreasoning.com/"
        />
        {/* <Sponsor
          text="The Summer Program for Applied Rationality and Cognition (SPARC) is a free two-week program for talented high schoolers to develop quantitative skills and apply them to the world."
          img="/images/sponsors/SPARC.png"
          company="SPARC"
          link="https://www.sparc-camp.com/"
        /> */}
      </div>
      <h2 className="mt-8 text-3xl font-bold text-[#916b1a] text-center">Bronze Sponsors</h2>
      <div className="mt-6 w-full flex flex-wrap justify-center items-start">
        {/*
        <SmallerSponsor
          // text="Jane Street is a quantitative trading firm with offices worldwide. We hire smart, humble people who love to solve problems, build systems, and test theories. Our success is driven by our people and we never stop improving."
          img="/images/sponsors/jane_street.png"
          company="Jane Street"
          link="https://janestreet.com"
        />*/}
        <SmallerSponsor
          img="images/sponsors/awesomemath.png"
          company="AwesomeMath"
          link="https://www.awesomemath.org/"
        />
      </div>
      <h2 className="mt-8 text-3xl font-bold text-[#3896e8] text-center">Prize Sponsors</h2>
      <div className="mt-6 w-full flex flex-wrap justify-center items-start">
        <SmallerSponsor
          // text="The Daily Challenge is the first and only online math course that captivates. It was invented by world famous math professor Po-Shen Loh. Lessons are taught live by instructors who are not only brilliant at math, but also skilled in improvisational comedy and performance."
          img="/images/sponsors/daily_challenge.png"
          company="The Daily Challenge"
          link="https://daily.poshenloh.com/"
        />
        <SmallerSponsor
          img="/images/sponsors/desmos.png"
          company="Desmos"
          link="https://www.desmos.com/"
        />
        <SmallerSponsor
          img="/images/sponsors/aops.png"
          company="AoPS"
          link="https://artofproblemsolving.com"
        />
        {/* <SmallerSponsor
          img="/images/sponsors/geogebra.png"
          company="GeoGebra"
          link="https://geogebra.org"
        /> */}
      </div>
      <section className="relative w-11/12 lg:w-9/12 my-8 mx-auto text-center text-2xl text-white mb-6 font-light">
        <p> Interested in sponsoring with us for TJIMO or supporting us in our many travel competitions? </p>
        <p> Check out our <a className="font-bold text-pink" target="_blank" href="https://tjvmt.com/u/sponsorship">sponsorship packet</a> for more information! </p>
        <p> You can also get in touch with us anytime at <a className="font-bold text-pink" href="mailto:vmtofficers@gmail.com">vmtofficers@gmail.com</a>.</p>
      </section>
    </section>
  )
}

const Sponsors: NextPage<any> = ({ user }) => {
  return (
    <Layout user={user}>
      <SponsorSection />
    </Layout >
  );
};

export default Sponsors