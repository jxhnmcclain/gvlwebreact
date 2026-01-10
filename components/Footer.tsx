import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

const Footer = () => {
  const container = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
        gsap.from(".footer-anim", {
            y: 100,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: "back.out(1.7)",
            scrollTrigger: {
                trigger: container.current,
                start: "top 85%",
            }
        });
    }, container);
    return () => ctx.revert();
  }, []);

  return (
    <footer ref={container} className="bg-black text-white py-20 px-4 md:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 md:gap-24 relative z-10">
        
        {/* Right / Top Bubble */}
        <div className="md:col-start-2 flex justify-end footer-anim">
            <div className="bg-gvl-blue text-white p-10 md:p-12 rounded-[3rem] rounded-br-none max-w-md w-full relative">
                <h3 className="text-2xl md:text-3xl font-medium mb-2">Growth Video Lab</h3>
                <h3 className="text-2xl md:text-3xl font-medium mb-6">2025</h3>
                
                <div className="space-y-1 text-lg md:text-xl font-light">
                    <p>Santiago de Chile</p>
                    <p>Agencia de Marketing</p>
                    <a href="mailto:hola@gvl.com" className="hover:underline">hola@gvl.com</a>
                </div>
            </div>
        </div>

        {/* Left / Bottom Bubble */}
        <div className="md:col-start-1 flex justify-start -mt-8 md:mt-12 footer-anim">
            <div className="bg-gvl-green text-white p-10 md:p-12 rounded-[3rem] rounded-bl-none max-w-md w-full">
                <p className="text-2xl md:text-3xl font-light leading-snug">
                    Escríbenos al <br />
                    <span className="font-medium">whatsapp: +56973832208</span>
                </p>
            </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;