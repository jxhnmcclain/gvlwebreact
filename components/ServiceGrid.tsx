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
            title="Contenido para Redes Sociales"
            description={
              <>
                <p>Las redes sociales son mucho más que plataformas para compartir contenido: son el puente directo entre tu marca y tu público.</p>
                <p>En GVL entendemos que cada red tiene su propia forma de trabajo, lenguaje y audiencia. Por eso, diseñamos estrategias personalizadas.</p>
              </>
            }
            buttonText="Necesito gestión de redes"
          />
          
          <ServiceCard 
            title="Sitios Web: El portal para tu marca"
            description={
              <>
                <p>Un sitio web bonito no sirve de nada si nadie lo encuentra.</p>
                <p>En GVL, fusionamos diseño que impacta con un SEO que funciona. Creamos tu centro de operaciones digital, un portal donde la personalidad de tu marca se encuentra con una experiencia de usuario (UX) intuitiva.</p>
              </>
            }
            buttonText="Necesito mi sitio web"
          />

          <ServiceCard 
            title="Creación de Marca"
            description={
              <>
                <p>¿Qué te hace diferente? El branding es la respuesta. Es el ADN de tu negocio, tu voz y la primera impresión que dejas.</p>
                <p>En GVL, vamos más allá del logo. Creamos estrategias de marca e identidades visuales que cuentan tu historia.</p>
              </>
            }
            buttonText="Necesito crear mi marca"
          />
        </div>
      </div>
    </section>
  );
};

export default ServiceGrid;