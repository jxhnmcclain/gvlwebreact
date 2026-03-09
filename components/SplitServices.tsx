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
    title: "Entrega en 7 días",
    description: "Sin reuniones de 2 horas ni propuestas de 40 páginas. Paquetes claros, timeline definido desde el día uno. Tu web lista antes de que tengas tiempo de arrepentirte.",
  },
  {
    icon: <MapPin size={32} className="text-blue-500" />,
    title: "Hecho para Chile",
    description: "Entendemos cómo funciona el B2B local: cotizaciones por WhatsApp, clientes que te googlearán antes de llamarte, decisiones que se toman por confianza — no por diseños bonitos.",
  },
  {
    icon: <Lock size={32} className="text-gvl-yellow" />,
    title: "Tus activos, a tu nombre",
    description: "El dominio, el hosting, los archivos: todo queda en tus manos. Nunca dependerás de nosotros para acceder a lo que es tuyo.",
  },
  {
    icon: <Repeat size={32} className="text-emerald-400" />,
    title: "Más que una web",
    description: "Si quieres ir más lejos, armamos el sistema completo: web + automatización de outreach + seguimiento para que los leads no queden en el aire.",
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
          <span className="text-xs font-black uppercase tracking-[0.3em] text-gvl-yellow/70 block mb-4">Por qué elegirnos</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tighter max-w-2xl">
            Por qué nuestros clientes{" "}
            <span className="text-gvl-yellow">nos eligen como partners</span>
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