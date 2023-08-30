import type { NextPage } from "next";
import { Layout } from "@/components/layout";
import Image from "next/image";
import { useState, useEffect, useLayoutEffect, useRef } from "react";
import Header from "@/components/header";
import { Footer } from "@/components/footer";
import Background from "@/components/Background";
import React from "react";

const HeroSection = () => {
  return (
    <section
      id="hero"
      className="h-screen flex items-center justify-center bg-transparent"
    >
      <div className="m-4 sm:m-12 md:w-3/4 xl:w-1/2 md:scale-90 hover:scale-100 transition-all duration-300 ease-in-out">
        <p className="pr-4 text-white font-semibold text-base sm:text-2xl">
          Hello, we are...
        </p>
        <div className="mt-2 relative w-full aspect-[18/5]">
          <Image
            src="/images/nametag.png"
            alt="TJHSST Varsity Math Team"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <p className="ml-4 mt-4 text-white font-semibold text-base sm:text-2xl text-right">
          ...one of the most successful math teams in the nation.
        </p>
      </div>
    </section>
  );
};

const ExperienceCard = ({
  title,
  content,
  img,
}: {
  title: string;
  content: JSX.Element[];
  img: string;
}) => {
  return (
    <div className="w-96 xl:w-[36rem] mx-2 my-12 md:m-12 p-9 flex flex-col items-center border-solid border border-white bg-navy bg-opacity-75">
      <div className="border-solid border-4 border-white relative w-40 sm:w-52 xl:w-64 aspect-[3/4]">
        <Image src={img} alt={title} layout="fill" />
      </div>
      <h3 className="mt-12 self-start text-white font-bold text-2xl xl:text-4xl">
        {title}
      </h3>
      <ul>
        {content.map((item, ind) => {
          const key = title + new String(ind);
          return (
            <li key={key} className="mt-6 flex justify-start">
              <div className="mt-0 mb-auto w-12 xl:w-24 relative aspect-square">
                <p className="text-pink text-2xl xl:text-4xl">▹</p>
              </div>
              <p className="text-white text-base xl:text-2xl">{item}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const ExperienceSection = () => {
  return (
    <section id="experience" className="">
      <div className="flex flex-wrap items-start justify-center">
        <ExperienceCard
          img="/images/experience/L1.png"
          title="The Individual"
          content={[
            <>
              Develop your problem solving skills weekly by attending guest
              lectures and afterschool Monday Practices.
            </>,
            <>
              Learn new math topics to prepare for national competitions and
              become a better mathlete.
            </>,
          ]}
        />
        <ExperienceCard
          img="/images/experience/L2.png"
          title="The Friend Group"
          content={[
            <>
              VMT is a great place to meet new people who share your passion for
              math!
            </>,
            <>
              Form lifelong connections with fellow mathletes who will help you
              grow.
            </>,
          ]}
        />
        <ExperienceCard
          img="/images/experience/L3_new.png"
          title="The Community"
          content={[
            <>
              Here at VMT we have lots of fun. Join us for pie eating contests,
              plank countdowns, and more!
            </>,
            <>
              Give back to the math community by volunteering at outreach events
              like Techstravaganza and TJIMO.
            </>,
          ]}
        />
        <ExperienceCard
          img="/images/experience/L4_new.png"
          title="The Journey"
          content={[
            <>
              Our team meets during 8th period on Wednesday A and B block as
              well as Thursday after school in spring.
            </>,
            <>
              Whether your an experienced mathlete or curious beginner, VMT is
              an excellent way to spend your time in high school.
            </>,
          ]}
        />
      </div>
    </section>
  );
};

const Quote = ({ text, img, author }) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      setVisible(entries[0].isIntersecting);
    });
    observer.observe(ref.current);
    return () => observer.disconnect();
  });

  return (
    <div
      ref={ref}
      className={`m-4 p-4 max-w-lg bg-navy-light bg-opacity-80 rounded-md ${
        visible ? "opacity-100 translate-x-0" : "-translate-x-12 opacity-0"
      } flex transition-all duration-300`}
    >
      <img
        src={img}
        alt={author}
        className="w-20 h-20 mr-4 rounded-full border-solid border-white border-2"
      />
      <div className="w-full">
        <h4 className="text-white text-2xl font-bold p-2">{author}</h4>
        <p className="text-white text-lg p-2">{text}</p>
      </div>
    </div>
  );
};

const QuotesSection = () => {
  return (
    <section id="relative mx-4 sm:mx-8 lg:mx-8 py-24 flex flex-wrap xl:flex-nowrap items-start">
      <h2 className="mt-12 mb-4 text-center text-white text-5xl font-bold">
        Testimonials
      </h2>
      <div className="w-full flex flex-wrap justify-center items-start">
        <Quote
          text="“ARML was my very first competition with VMT, soI didn’t know what to expect; however, it
          turned out to be one of the best experiences I had all year. The memories I made having fun
          participating in the competition while being in a welcoming and inclusive environment have me
          constantly excited for our next competition. From group ultimate frisbee to celebrating our
          placement to taking countless photos, I always remember having a smile on my face.
          Logistically, it was very well organized, and we always had clear communication and instructions
          from our sponsors and officers, and that was something I appreciated greatly.”"
          img="/images/quotes/ryan.png"
          author="Ryan Singh"
        />
        <Quote
          text="ARML was one of the most memorable experiences of the year! We spent a long time practicing, and it was all worth it in the end. From the bus rides to trekking across the Penn State campus, I enjoyed spending time with all my friends in VMT. I also met incredibly talented people from other schools, and I gained so much insight about math just from talking to them. The opportunity to compete at ARML wasn’t just the culmination of weeks of practice, but also the opportunity to explore new things and bond with members of the community."
          img="/images/officers/olivia23.png"
          author="Olivia Wu"
        />
        <Quote
          text="“I had a lot of fun at ARML! Whether it was playing ultimate frisbee with the team or singing
          karaoke with my friends or complaining about the dorms or cheering for TJ at the awards
          ceremony, this trip was definitely one of my most memorable moments at TJ. I had so much fun
          and made a lot of new friends!”"
          img="/images/quotes/andrew.png"
          author="Andrew Chen"
        />
        <Quote
          text="Seeing all the students gathered at TJIMO was heartwarming because it was clear everyone was happy to be there and do math together. As the day progressed, the students in my team grew closer, and that strengthened their teamwork during the multiple rounds. TJIMO brought together an array of bright minds, and each student left with a newfound appreciation for the challenging problems VMT had presented them."
          img="/images/officers/marina23.png"
          author="Marina Lin"
        />
      </div>
    </section>
  );
};

const Home: NextPage<any> = ({ officers }) => {
  return (
    <Layout>
      <HeroSection />
      <ExperienceSection />
      <QuotesSection />
    </Layout>
  );
};


export default Home;
