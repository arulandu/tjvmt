import Particles, { IOptions, RecursivePartial } from "react-tsparticles";

const Background = ({className}) => {
  const particleParams: RecursivePartial<IOptions> = {
    "particles": {
      "number": {
        "value": 70,
        "density": {
          "enable": true,
           "area": 450
        }
      },
      "color": {
        "value": "#ffffff"
      },
      "size": {
        "value": 10,
        "random": true
      },
      "opacity": {
        "value": 0.8,
        "random": true,
      },
      "move": {
        "enable": true,
        "speed": {min: 1, max: 2},
        "direction": "bottom",
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
    "retina_detect": true,
  }

  return (
    <div className='fixed top-0 left-0 w-full h-full bg-navy z-[-1]'>
      <Particles
        className={`w-full h-full ${className}`}
        options={particleParams}
      />
    </div>
  );
}

export default Background;