import type { NextPage } from 'next'
import { Layout } from '@/components/layout'
import Image from 'next/image'
import { useState, useEffect, useLayoutEffect, useRef } from "react";

// TODO: pascal case for acronyms — i have no idea 🤷‍♂️

const Sponsor = ({ text, img, company, level, link }) => {
  return (
    <div
      className={`m-4 p-4 max-w-lg bg-navy-light bg-opacity-80 rounded-md "opacity-100 translate-x-0" : "-translate-x-12 opacity-0"
      } flex transition-all duration-300`}
    >
      <div className="w-full text-center items-center">
        <h2 className = "text-white text-xl font-bold">{level}</h2>
        <a href={link}>
          <img
          src={img}
          alt={company}
          className="mx-auto my-2"
          />
        </a> 
        <p className="text-white text-lg p-2">{text}</p>
      </div>
    </div>
  );
};

const TjimoPage: NextPage<any> = () => {
  return (
    <Layout>
      <div className='fixed w-screen h-screen opacity-90 z-[-1]'>
        <Image src="/images/tj_dome.jpg" layout="fill" objectFit='cover' />
      </div>
      <section className="h-screen flex items-center justify-center">
        <div>
          <h1 className="m-auto mb-3 text-6xl text-white text-center">TJIMO</h1>
          <p className="text-center text-2xl text-white mb-6">December 10, 2022 @ TJHSST</p>
          <p className = "text-center mt-3"><a className = "text-2xl font-bold text-pink" href = "https://tjvmt.com/u/tjimo/registration">Registration Form</a></p>
          <p className = "text-center mt-3"><a className = "text-2xl font-bold text-pink" href = "https://tjvmt.com/u/sponsorship">Sponsorship Packet</a></p>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke="white" fill="white" className="absolute bottom-4 animate-bounce">
          <path d="M0 7.33l2.829-2.83 9.175 9.339 9.167-9.339 2.829 2.83-11.996 12.17z" />
        </svg>
      </section>
      <section className="mx-4 sm:mx-12 lg:mx-24 px-5 py-10 md:max-w-2/3 xl:max-w-1/2 text-white bg-navy bg-opacity-50">
        <h2 className="text-3xl font-bold text-left mb-4">What is TJIMO?</h2>
        <p className="mb-10">
          The Thomas Jefferson Intermediate Math Open (TJIMO) is a contest that the Thomas Jefferson Varisty Math Team holds for middle schools in the
          Washington, DC area. Students learn a variety of problem-solving strategies from experienced VMT student coaches and apply these strategies in a mathematics competition.
        </p>
        <h2 className="text-3xl font-bold text-left mb-4">Registration</h2>
        <p className="mb-10">
        Please complete the Google form by November 25th: <a className = "font-bold text-pink break-word" href = "https://tjvmt.com/u/tjimo/registration">registration form</a>.
        </p>
        <h2 className="text-3xl font-bold text-left mb-4">Sponsorship</h2>
        <p className = "mb-4">
        Sponsors allow us to provide the best experience possible for TJIMO participants by helping 
        us host a competition full of learning, collaboration, fulfillment, and fun.
        </p>
        <p className = "mb-10">
        Interested in sponsoring or partnering with us for TJIMO? 
        Check out our <a className = "font-bold text-pink" href = "https://tjvmt.com/u/sponsorship">sponsorship packet</a> for more information!
        You can also get in touch with us anytime at <a className = "font-bold text-pink" href = "mailto:vmtofficers@gmail.com">vmtofficers@gmail.com</a>.
        </p>
        <h2 className="text-3xl font-bold text-left mb-4">How Does the Contest Work?</h2>
        <p className="mb-4">TJIMO consists of four rounds of tests that challenge students' mathematical problem solving skills. A large block of the event is dedicated to coaching,
          in which students are assigned to small groups and learn strategies from VMT student coaches. See below for more details on each round.</p>
        <ul className="mb-10 px-5 list-disc">
          <li><span className="font-bold">Individual Round</span>: The individual round is a one hour 30 problem round modeled after MATHCOUNTS' sprint round. Top scorers in the individual round
            will recieve awards at the end of the event. Scores from this round is also used to create balanced teams for the later rounds.</li>
          <li><span className="font-bold">Coaching</span>: After the individual round, students will be assigned to small groups and be coached by VMT members.
            They will be able to go over problems from the individual round and learn new strategies that will help in the team rounds later.</li>
          <li><span className="font-bold">Team and Power Rounds</span>: The team and power rounds consists of harder problems in different formats based on those seen in college math competitions.
            Students will be given sample rounds during coaching to familarize themselves with the format and learn how to write formal proofs.</li>
          <li><span className="font-bold">Guts Round</span>: The guts round is a special team round in which students are given several consecutive sets of problems and try to solve them as fast as possible.</li>
          <li><span className = "font-bold">Orienteering Round</span>: The orienteering round involves solving problems in different locations around the building. Students work together to finish all the problems.</li>
        </ul>
        <h2 className="text-3xl font-bold text-left mb-4">FAQ</h2>
        <p className="mb-4">
          <span className="font-bold">Q</span>: Who can participate?<br />
          <span className="font-bold">A</span>: Middle schoolers from grades 6-8 that are currently taking Geometry or a lower level math class in school. We only allow 6th graders in elementary school to attend if this is their last year of eligibility (i.e., they are currently enrolled in Algebra I and plan on taking Geometry over the summer or are currently enrolled in Geometry). Elementary schoolers must also have a parent or teacher present at the competition for the entire duration.<br /><br />
          <span className="font-bold">Q</span>: Who can register?<br />
          <span className="font-bold">A</span>: ONE math teacher or math team coordinator from each school can register students from their school to participate in TJIMO.<br /><br />
          <span className="font-bold">Q</span>: How many students can attend from a school?<br />
          <span className="font-bold">A</span>: Up to 7.<br /><br />
          <span className="font-bold">Q</span>: Can I register as an individual or homeschool student or with an organization outside of my school?<br />
          <span className="font-bold">A</span>: If you are homeschooled, you may register individually and indicate that you are homeschooled on the form. If you attend a public or private school, we ask that you ask your school’s math teacher/math team coordinator to register for you. We do not allow non-school organizations to participate. Please email us at vmtofficers@gmail.com if you have any questions.<br /><br />
          <span className="font-bold">Q</span>: What is the role of the teacher/coordinator?<br />
          <span className="font-bold">A</span>: The role of the teacher/coordinator is simply being the link between us, the organizers, and the students - an essential role at TJIMO. In other words, they will be responsible for making sure the students are at the right place at the right time and relaying information to students.<br /><br />
          <span className="font-bold">Q</span>: Will students from the same school compete as a team?<br />
          <span className="font-bold">A</span>: No, students will be assigned to teams balanced by math level during the individual round.<br /><br />
          <span className="font-bold">Q</span>: What will students need for the competition? <br />
          <span className="font-bold">A</span>: Pencils, paper, a calculator, and a <strong>willingness to learn!</strong>
        </p>
      </section>
      <section className="mt-12 mx-4 sm:mx-12 lg:mx-24 px-5 py-10 md:max-w-2/3 xl:max-w-1/2 text-white bg-navy bg-opacity-50">
        <h1 className="mb-6 text-5xl font-bold text-white text-center">Sponsors</h1>
        <div className = "w-full flex flex-wrap justify-center items-start grid-cols-2">
        <Sponsor
            text = "The Russian School of Mathematics (RSM) is an award winning K-12 after-school math program that has empowered students to achieve excellence for over twenty years."
            img = "/images/sponsors/RSM.png"
            company = "RSM"
            level = "Gold"
            link = "https://www.russianschool.com/"
          />
          <Sponsor
            text = "The Summer Program for Applied Rationality and Cognition (SPARC) is a free two-week program for talented high schoolers to develop quantitative skills and apply them to the world."
            img = "/images/sponsors/SPARC.png"
            company = "SPARC"
            level = "Silver"
            link = "https://www.sparc-camp.com/"
          />
          <Sponsor
            text="Jane Street is a quantitative trading firm with offices worldwide. We hire smart, humble people who love to solve problems, build systems, and test theories. You’ll learn something new every day in our office—whether it’s connecting with a colleague to share perspectives, or participating in a talk, class, or game night. Our success is driven by our people and we never stop improving."
            img="/images/sponsors/jane_street.png"
            company="Jane Street"
            level = "Silver"
            link = "https://janestreet.com"
          />
          <Sponsor
            text="The Daily Challenge is the first and only online math course that captivates. It was invented by world famous math professor Po-Shen Loh. Lessons are taught live by instructors who are not only brilliant at math, but also skilled in improvisational comedy and performance."
            img="/images/sponsors/daily_challenge.png"
            company="The Daily Challenge"
            level = "Silver"
            link = "https://daily.poshenloh.com/"
          />
          <Sponsor
            text = ""
            img = "/images/sponsors/aops.png"
            company = "AoPS"
            level = "Bronze"
            link = "https://artofproblemsolving.com"
          />
        </div>
      </section>
    </Layout>
  )
}

export default TjimoPage