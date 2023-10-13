import type { NextPage } from 'next'
import { Layout } from '@/components/layout'
import Image from 'next/image'
import Link from 'next/link';

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
        <p className="text-white text-lg p-2">{text}</p>
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
          text="The Cake Shop Capital is led by its three founders: Dr. Lauren Cohen, Dr. William Powley and David Kim. In their more than decade working together, they have pioneered numerous techniques and ideas in Behavioral Finance that have been used throughout the field of asset management. This award winning work has been cited throughout academic and practitioner journals, and is widely cited in the popular press."
          img="/images/sponsors/cake_shop_capital.jpg"
          company="The Cake Shop Capital"
          link="https://www.thecakeshopcapital.com/"
        />
        <Sponsor
          text="We are the Vienna branch of Art of Problem Solving.  We offer afterschool and weekend math and language arts classes for advanced students who need more stimulating material than what they receive at school. Almost all of TJ's VMT are current or former AoPS students!"
          img="/images/sponsors/vienna.png"
          company="AoPS Vienna"
          link="https://vienna.aopsacademy.org/"
        />
        <Sponsor
          text="Wolfram uniquely unifies algorithms, data, notebooks, linguistics and deployment—enabling powerful workflows across desktop, cloud, server and mobile. Whatever your field, whatever your application, Wolfram technology provides the ultimate computation platform."
          img="/images/sponsors/wolfram.jpg"
          company="Wolfram"
          link="https://www.wolfram.com/"
        />
      </div>
      <h2 className="mt-8 text-3xl text-neutral-300 font-bold text-center">Silver Sponsors</h2>
      <div className="mt-6 w-full flex flex-wrap justify-center items-start">
        <Sponsor
          text="The Russian School of Mathematics (RSM) is an award winning K-12 after-school math program that has empowered students to achieve excellence for over twenty years."
          img="/images/sponsors/RSM.png"
          company="RSM"
          link="https://www.russianschool.com/"
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
        <SmallerSponsor
          // text="The Daily Challenge is the first and only online math course that captivates. It was invented by world famous math professor Po-Shen Loh. Lessons are taught live by instructors who are not only brilliant at math, but also skilled in improvisational comedy and performance."
          img="/images/sponsors/daily_challenge.png"
          company="The Daily Challenge"
          link="https://daily.poshenloh.com/"
        />
        <SmallerSponsor
          // text="Jane Street is a quantitative trading firm with offices worldwide. We hire smart, humble people who love to solve problems, build systems, and test theories. Our success is driven by our people and we never stop improving."
          img="/images/sponsors/jane_street.png"
          company="Jane Street"
          link="https://janestreet.com"
        />
        <SmallerSponsor
          img="images/sponsors/awesomemath.png"
          company="AwesomeMath"
          link="https://www.awesomemath.org/"
        />
      </div>
      <h2 className="mt-8 text-3xl font-bold text-[#3896e8] text-center">Prize Sponsors</h2>
      <div className="mt-6 w-full flex flex-wrap justify-center items-start">
        <SmallerSponsor
          img="/images/sponsors/aops.png"
          company="AoPS"
          link="https://artofproblemsolving.com"
        />
        <SmallerSponsor
          img="/images/sponsors/geogebra.png"
          company="GeoGebra"
          link="https://geogebra.org"
        />
      </div>
      <section className="relative w-11/12 lg:w-9/12 my-8 mx-auto text-center text-2xl text-white mb-6 font-light">
        <p> Interested in sponsoring with us for TJIMO or supporting us in our many travel competitions? </p>
        <p> Check out our <a className="font-bold text-pink" target="_blank" href="https://tjvmt.com/u/sponsorship">sponsorship packet</a> for more information! </p>
        <p> You can also get in touch with us anytime at <a className="font-bold text-pink" href="mailto:vmtofficers@gmail.com">vmtofficers@gmail.com</a>.</p>
      </section>
    </section>
  )
}

const Sponsors: NextPage<any> = () => {
  return (
    <Layout>
      <SponsorSection />
    </Layout >
  );
};

export default Sponsors