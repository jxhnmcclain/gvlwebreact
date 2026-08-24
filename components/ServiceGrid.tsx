import React, { useRef, useLayoutEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

const ServiceCard = ({ 
  title, 
  description, 
  buttonText 
}: { 
  title: string; 
  description: React.ReactNode; 
  buttonText: string 
}) => (
  <div className="service-card bg-gvl-cream border border-black rounded-[2rem] p-8 flex flex-col h-full hover:shadow-lg transition-shadow">
    <h3 className="text-xl font-bold mb-4">{title}</h3>
    <div className="text-sm text-gray-700 leading-relaxed mb-8 flex-grow space-y-4">
      {description}
    </div>
    <button className="bg-black text-white pl-6 pr-4 py-3 rounded-full text-xs font-bold flex items-center justify-between w-full md:w-auto self-start gap-2 hover:bg-gray-800 transition-colors group">
      {buttonText}
      <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
    </button>
  </div>
);

const ServiceGrid = () => {
  const container = useRef(null);
  
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
        gsap.from(".service-heading", {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: container.current,
                start: "top 80%",
            }
        });

        gsap.from(".service-card", {
            y: 100,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ".service-card", // Trigger when the cards start coming into view
                start: "top 85%",
            }
        });
    }, container);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={container} className="bg-gvl-cream py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="service-heading text-3xl md:text-5xl font-black text-center mb-12 tracking-tight">
          Lo que tu marca necesita para vender
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ServiceCard 
            title="Contenido que tiene un trabajo"
            description={
              <>
                <p>No publicamos por cumplir el calendario. Definimos qué necesita decir la marca y lo convertimos en piezas que se pueden probar.</p>
                <p>Cada canal tiene su propio lenguaje. Adaptamos el formato, el ritmo y el mensaje según la audiencia y el objetivo.</p>
              </>
            }
            buttonText="Quiero ordenar mi contenido"
          />
          
          <ServiceCard 
            title="Una web que haga su parte"
            description={
              <>
                <p>Una web bonita que nadie encuentra o entiende no ayuda a vender.</p>
                <p>Diseñamos el sitio, trabajamos el SEO básico y dejamos conectados los puntos que importan: mensaje, navegación, formulario y medición.</p>
              </>
            }
            buttonText="Quiero mejorar mi web"
          />

          <ServiceCard 
            title="Una marca que se reconoce"
            description={
              <>
                <p>Si tu marca se parece a todas, el precio termina siendo la conversación.</p>
                <p>Definimos una posición clara y la traducimos en una identidad que puedas usar en tu web, tus propuestas y tus campañas.</p>
              </>
            }
            buttonText="Quiero ordenar mi marca"
          />
        </div>
      </div>
    </section>
  );
};

export default ServiceGrid;
