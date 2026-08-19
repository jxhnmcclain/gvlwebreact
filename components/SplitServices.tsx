import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { Zap, MapPin, Lock, Repeat } from 'lucide-react';

type ValuePropData = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

const valuePropItems: ValuePropData[] = [
  {
    icon: <Zap size={32} className="text-gvl-orange" />,
    title: "Calidad de Producción",
    description: "No hacemos videos del montón. Producimos piezas audiovisuales con dirección de arte, corrección de color y un storytelling que eleva el valor percibido de tu marca desde el primer segundo.",
  },
  {
    icon: <MapPin size={32} className="text-blue-500" />,
    title: "Impacto Local y Global",
    description: "Operamos desde Santiago para el mundo. Entendemos el pulso cultural de tu audiencia y adaptamos cada pieza visual para que no solo se vea increíble, sino que conecte genuinamente.",
  },
  {
    icon: <Lock size={32} className="text-gvl-yellow" />,
    title: "Identidades Sólidas",
    description: "El branding no es solo un logo. Construimos universos visuales y sistemas de diseño escalables que protegen la coherencia de tu marca en cada punto de contacto.",
  },
  {
    icon: <Repeat size={32} className="text-emerald-400" />,
    title: "Ecosistema Digital 360",
    description: "Unimos el video, la identidad visual y el desarrollo web bajo un mismo techo. El resultado es una experiencia digital fluida, donde cada activo trabaja en sinergia para retener y convertir.",
  },
];

const SplitServices = () => {
  const container = useRef(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".section-heading", {
        x: -60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });
    }, container);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={container} className="bg-zinc-950 py-24 px-4 md:px-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="section-heading mb-16">
          <span className="text-xs font-black uppercase tracking-[0.3em] text-gvl-yellow/70 block mb-4">El Estándar GVL</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tighter max-w-2xl">
            Lo que nos hace{" "}
            <span className="text-gvl-yellow">diferentes al resto</span>
          </h2>
        </div>

        {/* Value Props Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {valuePropItems.map((item, idx) => (
            <div
              key={idx}
              className="value-card group bg-white/5 border border-white/10 rounded-2xl md:rounded-3xl p-8 md:p-10 hover:bg-white/[0.08] hover:border-gvl-yellow/30 transition-all duration-300 cursor-default"
            >
              <div className="text-4xl mb-5">{item.icon}</div>
              <h3 className="text-xl md:text-2xl font-black text-white mb-3 group-hover:text-gvl-yellow transition-colors">
                {item.title}
              </h3>
              <p className="text-gray-400 leading-relaxed text-base md:text-lg">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default SplitServices;