import type { NextPage } from 'next'
import { Layout } from '@/components/layout'
import Image from "next/legacy/image"
import { useState, useEffect, useLayoutEffect, useRef } from "react";
import Carousel, { CarouselItem } from "@/components/Carousel";
import { authorize } from '@/lib/api/authorize';

export const getServerSideProps = async ({ req, res }) => {
  const { user } = await authorize(req, res)

  return {
    props: {
      user
    }
  }
}

// TODO: pascal case for acronyms — i have no idea 🤷‍♂️

const images = [
  "/images/tjimo/img1.jpg",
  "/images/tjimo/img2.jpg",
  "/images/tjimo/img3.jpg",
  "/images/tjimo/img4.jpg",
  "/images/tjimo/img5.jpg",
  "/images/tjimo/img6.jpg",
  "/images/tjimo/img7.jpg",
  "/images/tjimo/img8.jpg",
  "/images/tjimo/img9.jpg"
];

const Slide = ({ number }) => (
  <div>
    <img src={`${images[number-1]}`} />
  </div>
);

const TjimoPage: NextPage<any> = ({ user }) => {
  return (
    <Layout user={user}>
      {/* <div className='fixed w-screen h-screen opacity-40 z-[-1]'>
        <Image src="/images/tjimo23.JPG" layout="fill" objectFit='cover' />
      </div> */}
      <section className="flex items-center justify-center">
        <div className="mt-24">
          <h1 className="m-auto mb-3 text-6xl text-white text-center">TJIMO</h1>
          <p className="text-center text-2xl text-white mb-6">October 19, 2024 @ TJHSST</p>
          <p className = "text-center mt-3"><a className = "text-2xl font-bold text-pink" href = "https://tjvmt.com/u/tjimo/registration24">2024 Registration</a></p>
          <p className = "text-center mt-3"><a className = "text-2xl font-bold text-pink" href = "https://tjvmt.com/u/tjimo/guide">TJIMO Guide</a></p>
          <p className = "mt-6"></p>
        </div>

        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke="white" fill="white" className="absolute bottom-4 animate-bounce">
          <path d="M0 7.33l2.829-2.83 9.175 9.339 9.167-9.339 2.829 2.83-11.996 12.17z" />
        </svg>
      </section>

      <section className="flex items-center justify-center">
        <div className="w-4/6">
          <div></div>
          <Carousel>
            <CarouselItem width="100%">
              <Slide number={1} />
            </CarouselItem>
            <CarouselItem width="100%">
              <Slide number={2} />
            </CarouselItem>
            <CarouselItem width="100%">
              <Slide number={3} />
            </CarouselItem>
            <CarouselItem width="100%">
              <Slide number={4} />
            </CarouselItem>
            <CarouselItem width="100%">
              <Slide number={5} />
            </CarouselItem>
            <CarouselItem width="100%">
              <Slide number={6} />
            </CarouselItem>
            <CarouselItem width="100%">
              <Slide number={7} />
            </CarouselItem>
            <CarouselItem width="100%">
              <Slide number={8} />
            </CarouselItem>
            <CarouselItem width="100%">
              <Slide number={9} />
            </CarouselItem>
          </Carousel>
        </div>
      </section>

      <section className="mx-4 sm:mx-12 lg:mx-24 px-5 py-10 md:max-w-2/3 xl:max-w-1/2 text-white bg-navy bg-opacity-50">
        <h2 className="text-3xl font-bold text-left mb-4">What is TJIMO?</h2>
        <p className="mb-10">
          The Thomas Jefferson Intermediate Math Open (TJIMO) is a contest that the Thomas Jefferson Varsity Math Team holds for middle schools in the
          Washington, DC area. Students learn a variety of problem-solving strategies from experienced VMT student coaches and apply these strategies in a mathematics competition.
        </p>
        <h2 className="text-3xl font-bold text-left mb-4">Sponsorship</h2>
        <p className = "mb-4">
        Sponsors allow us to provide the best experience possible for TJIMO participants by helping 
        us host a competition full of learning, collaboration, fulfillment, and fun. Our full list of sponsors can be found on 
        the <a className = "font-bold text-pink" href = "/sponsors">sponsors</a> page.
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
          <span className="font-bold">A</span>: Up to 6.<br /><br />
          <span className="font-bold">Q</span>: Can I register as an individual or homeschool student or with an organization outside of my school?<br />
          <span className="font-bold">A</span>: If you are homeschooled, you may register individually and indicate that you are homeschooled on the form. If you attend a public or private school, we ask that you ask your school’s math teacher/math team coordinator to register for you. We do not allow non-school organizations to participate. Please email us at vmtofficers@gmail.com if you have any questions.<br /><br />
          <span className="font-bold">Q</span>: What is the role of the teacher/coordinator?<br />
          <span className="font-bold">A</span>: The role of the teacher/coordinator is simply being the link between us, the organizers, and the students - an essential role at TJIMO. In other words, they will stay at TJ during the event and be responsible for making sure the students are at the right place at the right time and relaying information to students. The teacher/coordinator can be any math teacher or even a parent willing to be the team coordinator.<br /><br />
          <span className="font-bold">Q</span>: Will students from the same school compete as a team?<br />
          <span className="font-bold">A</span>: No, students will be assigned to teams balanced by math level during the individual round.<br /><br />
          <span className="font-bold">Q</span>: What will students need for the competition? <br />
          <span className="font-bold">A</span>: Pencils, paper, a calculator, and a <strong>willingness to learn!</strong>
        </p>
      </section>
    </Layout>
  )
}

export default TjimoPage