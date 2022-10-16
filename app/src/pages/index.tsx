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
          img="/images/experience/L3_v2.png"
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
          img="/images/experience/L4.png"
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
          text="VMT is such a magical community. Some of my most treasured memories come from VMT, from chasing middle schoolers at TJIMO to belting my lungs out during ARML karaoke. VMT was the first place at TJ where I felt like I truly belonged. VMT is so much more than just a bunch of math nerds. We’re a family <3."
          img="/images/quotes/laura.jpg"
          author="Laura Zhang (2024)"
        />
        <Quote
          text="For the past 3 years, VMT has been an integral part of my experience at TJ. From attending my first travel competition with a bunch of upperclassmen in my freshman year, to bringing Chips Ahoy to every ARML practice, VMT has always been a great community. It's one the most unique experiences at TJ."
          img="/images/officers/nikhil.png"
          author="Nikhil Pesaladinne (2023)"
        />
        <Quote
          text="It feels so great to be part of a connected community. You know if you're ever feeling down, you'll have VMT to cheer you up."
          img="/images/quotes/utkarsh.png"
          author="Utkarsh Goyal (2023)"
        />
        <Quote
          text="VMT is one of my favorite clubs at TJ, as it is where I met my closest friends and made my favorite memories."
          img="/images/quotes/akshaya.png"
          author="Akshaya Chakravarthy (2024)"
        />
      </div>
    </section>
  );
};

const LeadershipSection = ({
  officers,
}: {
  officers: { picture: string; position: string; name: string }[];
}) => {
  return (
    <section
      id="leadership"
      className="mx-4 sm:mx-8 lg:mx-8 py-24 flex flex-wrap xl:flex-nowrap items-start"
    >
      {/* <div className='w-full flex items-start'> */}
      <div>
        <h2 className="mb-12 text-center text-white text-5xl font-bold">
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
          would not be possible without the help of our sponsors:
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

const Home: NextPage<any> = ({ officers }) => {
  return (
    <Layout>
      <HeroSection />
      <ExperienceSection />
      <QuotesSection />
      <LeadershipSection officers={officers} />
    </Layout>
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

export default Home;
