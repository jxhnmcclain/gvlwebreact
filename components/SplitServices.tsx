import React, { useState, useRef, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useNavigate } from 'react-router-dom';

type ServiceItemData = {
  src: string;
  title: string;
  subtitle: string;
};

const MotionCarousel = ({ items }: { items: ServiceItemData[] }) => {
  const [active, setActive] = useState(0);

  return (
    <div className="relative w-full h-[350px] md:h-[450px] flex gap-2 md:gap-4 mt-8 px-2 md:px-0">
      {items.map((item, idx) => (
        <motion.div
          key={idx}
          layout
          onClick={() => setActive(idx)}
          onHoverStart={() => setActive(idx)}
          animate={{
            flex: active === idx ? 4 : 1,
            opacity: 1
          }}
          transition={{
            layout: { duration: 0.4, type: "spring", stiffness: 100, damping: 20 }
          }}
          className={`relative h-full rounded-2xl md:rounded-3xl overflow-hidden cursor-pointer border border-black shadow-sm hover:shadow-lg transition-shadow group ${active === idx ? 'z-10' : 'z-0'}`}
        >
          <motion.img
            layoutId={`img-${item.src}-${idx}`}
            src={item.src}
            alt={item.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />

          {/* Overlay: Always darkens slightly on active/hover to show text */}
          <div
            className={`absolute inset-0 bg-black/40 transition-opacity duration-500 ${active === idx ? 'opacity-100' : 'opacity-0 hover:opacity-100'}`}
          />

          <AnimatePresence>
            {active === idx && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ delay: 0.2 }}
                className="absolute bottom-0 left-0 w-full p-6 md:p-8 text-white pointer-events-none"
              >
                <div className="overflow-hidden">
                  <h3 className="text-xl md:text-2xl font-bold uppercase leading-none tracking-tight mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm md:text-base text-gray-200 font-medium leading-tight">
                    {item.subtitle}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
};

const ServiceColumn = ({
  title,
  description,
  buttonText,
  items,
  className,
  onButtonClick
}: {
  title: string;
  description: string;
  buttonText: string;
  items: ServiceItemData[];
  className?: string;
  onButtonClick: () => void;
}) => (
  <div className={`flex-1 flex flex-col gap-8 p-6 md:p-12 overflow-hidden ${className}`}>
    <div className="max-w-lg mx-auto md:mx-0 relative z-20">
      <h2 className="text-2xl md:text-3xl font-black mb-4 leading-tight">{title}</h2>
      <p className="text-gray-700 mb-6 leading-relaxed">
        {description}
      </p>
      <button
        onClick={onButtonClick}
        className={`bg-black text-white px-8 py-3 rounded-full text-sm font-bold hover:bg-gray-800 transition-colors hover:scale-105 transform active:scale-95 duration-200`}
      >
        {buttonText}
      </button>
    </div>

    {/* Replaced Fan Layout with Motion Carousel */}
    <MotionCarousel items={items} />
  </div>
);

const SplitServices = () => {
  const container = useRef(null);
  const navigate = useNavigate();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".service-col-left", {
        x: -100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 70%",
          toggleActions: "play none none reverse"
        }
      });
      gsap.from(".service-col-right", {
        x: 100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 70%",
          toggleActions: "play none none reverse"
        }
      });
    }, container);
    return () => ctx.revert();
  }, []);

  // Data for Left Column (Producción)
  const productionItems: ServiceItemData[] = [
    { src: "/assets/images/photography-example.png", title: "Fotografía", subtitle: "Producto & Editorial" },
    { src: "/assets/images/Post 4.png", title: "Redes Sociales", subtitle: "Contenido que genera leads" },
    { src: "/assets/images/reels.jpg", title: "TikToks & Reels", subtitle: "Contenido vertical viral" },
    { src: "https://picsum.photos/600/800?random=99", title: "Campañas", subtitle: "Comerciales & Spots" },
  ];

  // Data for Right Column (Creación)
  const designItems: ServiceItemData[] = [
    { src: "/assets/images/KeyVisual 1.png", title: "Branding", subtitle: "Identidad Corporativa" },
    { src: "https://picsum.photos/600/800?random=14", title: "Sitios Web", subtitle: "UI/UX & Desarrollo" },
    { src: "/assets/images/merch.jpeg", title: "Merch & Print", subtitle: "Flyers & Packaging" },
    { src: "https://picsum.photos/600/800?random=98", title: "Logotipos", subtitle: "Diseño vectorial único" },
  ];

  return (
    <section ref={container} className="bg-gvl-cream border-t border-black overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-black">

        <ServiceColumn
          className="service-col-left"
          title="Producción de contenido para profesionales y empresas"
          description="Producción creativa de contenido de alta calidad pensado para tu público alineados a tus objetivos."
          buttonText="conoce nuestros servicios"
          onButtonClick={() => navigate('/contenido')}
          items={productionItems}
        />

        <ServiceColumn
          className="service-col-right"
          title="Creación de marca y diseño gráfico"
          description="Creamos contigo desde 0 tu marca personal o empresa: Branding, logo, website y todo lo que necesitas para empezar."
          buttonText="hagamos tu idea realidad"
          onButtonClick={() => navigate('/branding')}
          items={designItems}
        />

      </div>
    </section>
  );
};

export default SplitServices;