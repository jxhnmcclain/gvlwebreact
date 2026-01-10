import React, { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const counterRef = useRef(null);
  const [counter, setCounter] = useState(0);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          onComplete();
        }
      });

      // Animate counter
      const counterObj = { value: 0 };
      tl.to(counterObj, {
        value: 100,
        duration: 1.5,
        ease: "power2.inOut",
        onUpdate: () => {
          setCounter(Math.round(counterObj.value));
        }
      });

      // Reveal Text
      tl.from(textRef.current, {
        y: 100,
        opacity: 0,
        duration: 0.8,
        ease: "power4.out",
        skewY: 7
      }, "-=1");

      // Slide up curtain
      tl.to(containerRef.current, {
        yPercent: -100,
        duration: 1,
        ease: "expo.inOut",
        delay: 0.2
      });

    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-[100] bg-gvl-black flex flex-col items-center justify-center text-gvl-yellow overflow-hidden"
    >
      <div className="absolute bottom-12 right-12 text-6xl md:text-8xl font-black tabular-nums opacity-20">
        {counter}%
      </div>

      <div className="overflow-hidden">
        <h1 ref={textRef} className="text-4xl md:text-7xl font-black tracking-tighter uppercase text-center leading-none">
          Growth <br/> Video Lab
        </h1>
      </div>
      
      <div className="mt-4 flex gap-2">
         <div className="w-3 h-3 bg-gvl-yellow rounded-full animate-bounce"></div>
         <div className="w-3 h-3 bg-gvl-yellow rounded-full animate-bounce delay-75"></div>
         <div className="w-3 h-3 bg-gvl-yellow rounded-full animate-bounce delay-150"></div>
      </div>
    </div>
  );
};

export default Preloader;