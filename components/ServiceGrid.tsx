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
          Todo lo que necesitas crear para tu marca
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ServiceCard 
            title="Producción de Video y Comerciales"
            description={
              <>
                <p>El video es el rey del contenido digital. Es la forma más rápida y emocional de contar quién eres y por qué haces lo que haces.</p>
                <p>En GVL, no solo grabamos: conceptualizamos, dirigimos y producimos comerciales, corporativos y documentales de marca con calidad cinematográfica.</p>
              </>
            }
            buttonText="Ver Producciones"
          />
          
          <ServiceCard 
            title="Desarrollo Web & UI/UX"
            description={
              <>
                <p>Un sitio web no debe ser un folleto digital aburrido, debe ser una experiencia interactiva que atrape a tus usuarios.</p>
                <p>Fusionamos diseño premium, dirección de arte y tecnología moderna para crear portales rápidos, hermosos y, sobre todo, altamente convertidores.</p>
              </>
            }
            buttonText="Ver Sitios Web"
          />

          <ServiceCard 
            title="Estrategia y Branding"
            description={
              <>
                <p>¿Qué te hace diferente? El branding es el ADN de tu negocio, tu voz y la primera impresión que dejas en un mar de ruido visual.</p>
                <p>Diseñamos identidades de marca completas, manuales de estilo y direcciones creativas que cuentan tu historia antes de decir una palabra.</p>
              </>
            }
            buttonText="Ver Casos de Branding"
          />
        </div>
      </div>
    </section>
  );
};

export default ServiceGrid;