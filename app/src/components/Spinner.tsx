import { useEffect, useState } from "react";

export const Spinner = ({ className, show, cycle=2 }) => {
  const [cycled, setCycled] = useState(false)
  useEffect(() => {
    const delay = setTimeout(() => {
      setCycled(true)
    }, cycle*1000/2)
  }, [])
  return (
    <>
      {show || !cycled ?
        <span className={`m-4 aspect-square ${className}`}>
          {/* <span className="animate-spin absolute w-32 h-32 border-solid border-x-4 border-b-4 border-t-0 border-pink rounded-full top-0 left-0 "/> */}
          <span className="absolute w-full h-full top-0 left-0 rounded-full border-solid border-4 border-white" style={{
            animationFillMode: 'both',
            animation: 'scale, fade',
            animationDuration: `${cycle}s`,
            animationIterationCount: 'infinite',
            animationTimingFunction: 'cubic-bezier(0.165, 0.84, 0.44, 1), cubic-bezier(0.3, 0.61, 0.355, 1)',
            animationDelay: `-${cycle/2}s`
          }} />
          <span className="absolute w-full h-full top-0 left-0 rounded-full border-solid border-4 border-white" style={{
            animationFillMode: 'both',
            animation: 'scale, fade',
            animationDuration: `${cycle}s`,
            animationIterationCount: 'infinite',
            animationTimingFunction: 'cubic-bezier(0.165, 0.84, 0.44, 1), cubic-bezier(0.3, 0.61, 0.355, 1)',
            animationDelay: '0s'
          }} />
        </span>
        : null
      }
    </>

  );
}