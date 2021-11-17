import type { NextPage } from 'next'
import Particles, { RecursivePartial, IOptions } from 'react-tsparticles'
import { Layout } from 'components/layout'
import Image from 'next/image'
import logo from 'public/images/header_image.png'
import teamPic from 'public/images/team_pic.jpg'
// TODO: use next/image Image 

const Background = () => {
  const particleParams: RecursivePartial<IOptions> = {
    "particles": {
      "number": {
        "value": 70,
        "density": {
          "enable": true,
          "value_area": 700
        }
      },
      "color": {
        "value": "#ffffff"
      },
      "shape": {
        "type": "circle",
        "stroke": {
          "width": 0,
          "color": "#000000"
        },
        "polygon": {
          "nb_sides": 5
        },
        "image": {
          "src": "img/github.svg",
          "width": 100,
          "height": 100
        }
      },
      "opacity": {
        "value": 0.5,
        "random": false,
        "anim": {
          "enable": false,
          "speed": 1,
          "opacity_min": 0.1,
          "sync": false
        }
      },
      "size": {
        "value": 3,
        "random": false,
        "anim": {
          "enable": false,
          "speed": 80,
          "size_min": 0.1,
          "sync": false
        }
      },
      "line_linked": {
        "enable": true,
        "distance": 200,
        "color": "#ffffff",
        "opacity": 0.4,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 3,
        "direction": "none",
        "random": true,
        "straight": false,
        "out_mode": "out",
        "bounce": false,
        "attract": {
          "enable": false,
          "rotateX": 600,
          "rotateY": 1200
        }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": false,
          "mode": "repulse"
        },
        "onclick": {
          "enable": false,
          "mode": "push"
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 800,
          "line_linked": {
            "opacity": 1
          }
        },
        "bubble": {
          "distance": 800,
          "size": 80,
          "duration": 2,
          "opacity": 0.8,
          // "speed": 3
        },
        "repulse": {
          "distance": 400,
          "duration": 0.4
        },
        "push": {
          "particles_nb": 4
        },
        "remove": {
          "particles_nb": 2
        }
      }
    },
    "retina_detect": true
  }

  return (
    <Particles
      className='w-full h-full'
      options={particleParams}
    />
  );
}

const Home: NextPage<any> = ({ officers }) => {
  return (
    <Layout>
      <section className="h-screen relative -top-20 flex items-center justify-center bg-gradient-to-br from-red-400 to-blue-400">
        <div className="w-4/5 md:w-1/2 left-1/10 md:left-1/4 absolute">
          <Image
            src={logo}
            alt="TJHSST Varsity Math Team"
          />
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke="black" fill="black" style={{ top: '95%' }} className="absolute top-44 animate-bounce">
          <path d="M0 7.33l2.829-2.83 9.175 9.339 9.167-9.339 2.829 2.83-11.996 12.17z" />
        </svg>
        <Background />
      </section>
      <section className="py-10 text-center">
        <h2 className="font-adam text-4xl gradient-text">Who Are We?</h2>
        <p className="m-auto mt-6 mb-10 text-lg text-justify w-4/5 sm:w-2/3">The TJHSST Varsity Math Team is one of the most successful math teams in the nation. We compete in college math competitions across the east coast, as well as prepare students for AMC Series competitions, catering to students with all kinds of math backgrounds. We also have pie eating contests, plank countdowns, guest lectures, and more, so be sure to sign up for VMT Wednesday A and B block!</p>
        <div className="m-auto w-4/5 sm:w-2/3">
          <Image
            src={teamPic}
            alt="VMT About"
          />
        </div>
      </section>
      <section id="activities" className="text-center px-5 md:px-10 py-10">
        <h2 className="font-adam text-5xl text-center gradient-text m-auto">Activities</h2>
        <div className="flex flex-wrap justify-center m-auto sm:w-4/5">
          <div className="my-5 px-5 py-3 shadow-md rounded-lg lg:mx-3 lg:w-2/5">
            <h3 className="text-4xl text-center">Monday Practice</h3>
            <p className="text-lg text-left my-4">Monday practices are led by VMT vetrans and help prepare team members for national competitions in the AMC series. We hold lectures weekly on topics and strategies covered on the AMCs, AIME, and USA(J)MO.</p>
            <a href="monday_practice" target="_blank" className="text-blue-500 hover:text-blue-600">Learn More</a>
          </div>
          <div className="my-5 px-5 py-3 shadow-md rounded-lg lg:mx-3 lg:w-2/5">
            <h3 className="text-4xl text-center">Summer ARML</h3>
            <p className="text-lg text-left my-4">VMT will host three practices over the summer to give freshman an early taste of the VMT experienes. Practices will be in the same format as spring ARML practices: a lecture by a VMT member followed by an unranked set of timed problems.</p>
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSe99szhmqZUyM6s7cKPCoJek6JEqEugdlnYmRsBCxjP8ekCtw/viewform?usp=sf_link" target="_blank" rel="noreferrer" className="text-blue-500 hover:text-blue-600">Learn More</a>
          </div>
          <div className="my-5 px-5 py-3 shadow-md rounded-lg lg:mx-3 lg:w-2/5">
            <h3 className="text-4xl text-center">TJIMO</h3>
            <p className="text-lg text-left my-4">The Thomas Jefferson Intermediate Math Open (TJIMO) is our annual math competition for middle schoolers. TJIMO aims to foster math interest in young students through competiton and fun activities. Students spend a day at TJHSST working through problems with their friends, led by VMT student coaches.</p>
            <a href="tjimo" className="text-blue-500 hover:text-blue-600">Learn More</a>
          </div>
          <div className="my-5 px-5 py-3 shadow-md rounded-lg lg:mx-3 lg:w-2/5">
            <h3 className="text-4xl text-center">8th Period</h3>
            <p className="text-lg text-left my-4">During 8th period, we do all kinds of fun activities, including pie eating contests, plank countdowns, guest lectures, and more!</p>
            <a href="https://ion.tjhsst.edu/" className="text-blue-500 hover:text-blue-600">Learn More</a>
          </div>
        </div>
      </section>
      <section className="bg-gradient-to-br from-red-400 to-blue-400 p-5 xl:px-60">
        <h2 className="font-adam text-white text-center text-5xl">Officers</h2>
        <div className="flex flex-row flex-wrap justify-center">
          {
            officers.map((officer: any) =>
              <div className="w-2/5 m-2 sm:w-40" key={officer.name}>
                <img className="rounded-full w-11/12 m-auto" src={officer.picture} alt={officer.name} />
                <div className="text-center">
                  <p className="text-white text-md">{officer.name}</p>
                  <p className="text-white text-sm">{officer.position}</p>
                </div>
              </div>
            )
          }
        </div>
      </section>
      <section className="text-center py-10">
        <h2 className="font-adam text-5xl gradient-text">Contact Us</h2>
        <form action="" method="POST" className="m-auto md:w-2/3 xl:w-1/2">
          <input type="text" placeholder="Name" className="block m-auto my-5 p-4 text-lg bg-gray-100 focus:bg-gray-200 w-4/5 focus:outline-none transition duration-300 ease-in-out" />
          <input type="email" placeholder="Email" className="block m-auto my-5 p-4 text-lg bg-gray-100 focus:bg-gray-200 w-4/5 focus:outline-none transition duration-300 ease-in-out" />
          <textarea cols={30} rows={10} placeholder="Message" className="block m-auto my-5 p-4 text-lg bg-gray-100 focus:bg-gray-200 w-4/5 focus:outline-none transition duration-300 ease-in-out"></textarea>
          <input type="submit" value="Send" className="block m-auto my-5 pt-3 pb-2 px-10 font-adam text-lg text-white rounded-full bg-gradient-to-br from-red-300 to-blue-300" />
        </form>
      </section>
    </Layout>
  )
}

export async function getStaticProps() {
  return {
    props: {
      officers: [
        { picture: `images/garrett.jpg`, position: "Captain", name: "Garrett Heller" },
        { picture: `images/drew.jpg`, position: "Co-Captain", name: "Andrew Kim" },
        { picture: `images/mirza.jpg`, position: "Co-Captain", name: "Mirza Hussain" },
        { picture: `images/pranav.jpg`, position: "Statistician", name: "Pranav Mathur" },
        { picture: `images/alvancaleb.png`, position: "Statistician", name: "Alvan Caleb Arulandu" },
        { picture: `images/nikhil.png`, position: "Finance Officer", name: "Nikhil Pesaladinne" },
        { picture: `images/mihika.jpg`, position: "Finance Officer", name: "Mihika Dusad" },
        { picture: `images/aarav.jpg`, position: "Secretary", name: "Aarav Bajaj" },
        { picture: `images/shyla.jpg`, position: "Historian", name: "Shyla Bisht" }
      ]
    }
  }
}

export default Home
