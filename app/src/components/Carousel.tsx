// Taken from https://codesandbox.io/p/sandbox/react-auto-scroll-carousel-ulp1r1

import React, { useEffect, useRef, useState } from "react";
// import "./Carousel.css";

export const CarouselItem = ({ children, width }) => {
  return (
    <div className="carousel-item" style={{ width: width }}>
      {children}
    </div>
  );
};

const Carousel = ({ children }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const swipe = useRef({});

  const css = `
    .carousel {
        overflow: hidden;
    }

    .inner {
        white-space: nowrap;
        transition: transform 2s;
    }

    .carousel-item {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        max-height: 100%;
        max-width: 100%;
    }
    `;

  const updateIndex = (newIndex) => {
    if (newIndex >= React.Children.count(children) || newIndex < 0) {
      newIndex = 0;
    }
    setActiveIndex(newIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      updateIndex(activeIndex + 1);
    }, 5000);
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [activeIndex]);

  return (
    <div className="carousel">
        <style>
            {css}
        </style>
      <div
        className="inner"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {React.Children.map(children, (child) => {
          return React.cloneElement(child, { width: "100%" });
        })}
      </div>
    </div>
  );
};

export default Carousel;
