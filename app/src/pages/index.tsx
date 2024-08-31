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
          text="“Ever since I’ve come to TJ, VMT has been a club that I could call home. Being a froshmore, while making friends was difficult, VMT really made me feel like I was part of something special at TJ. I’ve had several opportunities to work with so many amazingly smart people that have now become my closest friends. While teachers might throw projects and deadlines at me at variable frequency, VMT has been a constant joy that I could hold onto. I wouldn’t trade my time in VMT for anything else in the world.”"
          img="/images/officers/24/abhi.png"
          author="Abhinav Palikala"
        />
        <Quote
          text="“What sets VMT apart from other clubs is the impact we have on our local communities. The attendance at TJIMO was the largest since the pandemic, and we had a blast hosting a day of math for everyone. It was amazing to see familiar faces from TJIMO among the incoming freshmen to TJ. The connections we make through math carry on throughout the years and can only get strengthened at VMT.”"
          img="/images/officers/24/olivia.png"
          author="Olivia Wu"
        />
        <Quote
          text="“VMT has been a great experience for the past two years of high school. Beyond the exhilarating competitions and rigorous problem-solving sessions, it has helped me build lasting friendships and connected me to many new people. It is an essential part of my life, and I couldn’t imagine high school without it.”"
          img="/images/quotes/luv.png"
          author="Luv Udeshi"
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
