import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import CtaBanner from '../components/CtaBanner';

const WebsitesPage = () => {
  const container = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".anim-title", {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
        stagger: 0.1
      });
      gsap.from(".web-row", {
        xPercent: 10,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
            trigger: ".web-container",
            start: "top 70%"
        }
      });
    }, container);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={container} className="pt-24 min-h-screen bg-white">
      <section className="px-4 md:px-12 mb-20 text-center">
        <h1 className="anim-title text-5xl md:text-8xl font-black uppercase tracking-tighter mb-6">
            Digital <br/> Experience
        </h1>
        <p className="anim-title text-xl text-gray-600 max-w-2xl mx-auto">
            Sitios web que no solo se ven bien, sino que convierten. Diseño UI/UX moderno, desarrollo rápido y optimización SEO.
        </p>
      </section>

      <section className="px-4 md:px-12 pb-20 web-container space-y-12 md:space-y-24">
         {[1, 2, 3].map((i) => (
             <div key={i} className="web-row group">
                 <div className="relative w-full aspect-[16/9] md:aspect-[21/9] bg-gray-100 rounded-[2rem] border-2 border-black overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-500">
                    <div className="absolute top-4 left-4 md:top-8 md:left-8 flex gap-2 z-10">
                        <div className="w-3 h-3 rounded-full bg-red-500 border border-black"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-400 border border-black"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500 border border-black"></div>
                    </div>
                    <img src={`https://picsum.photos/1600/900?random=${300+i}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Website mockup" />
                 </div>
                 <div className="flex justify-between items-end mt-6 px-2">
                     <div>
                        <h3 className="text-3xl font-bold">Client Project 0{i}</h3>
                        <p className="text-gray-500">UI/UX Design • Development</p>
                     </div>
                     <button className="px-6 py-2 border border-black rounded-full hover:bg-black hover:text-white transition-colors">Visitar sitio</button>
                 </div>
             </div>
         ))}
      </section>
      
      <CtaBanner />
    </div>
  );
};

export default WebsitesPage;