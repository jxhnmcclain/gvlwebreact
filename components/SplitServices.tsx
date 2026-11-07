import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { BarChart3, Clapperboard, MousePointerClick, Shapes } from 'lucide-react';
import { Link } from 'react-router-dom';

type ValuePropData = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

const valuePropItems: ValuePropData[] = [
  {
    icon: <BarChart3 size={28} className="text-white/50" />,
    title: "Herramientas",
    description: "Aplicaciones y prototipos con IA para ideas y tareas concretas.",
  },
  {
    icon: <Clapperboard size={28} className="text-white/50" />,
    title: "Procesos",
    description: "Conectamos herramientas y organizamos flujos de trabajo.",
  },
  {
    icon: <MousePointerClick size={28} className="text-white/50" />,
    title: "Marketing",
    description: "Estrategia, diseño, contenido y campañas para personas y marcas.",
  },
  {
    icon: <Shapes size={28} className="text-white/50" />,
    title: "En construcción",
    description: "Creamos un curso gamificado para que creativos aprendan a construir y publicar apps con IA. «De cero a deploy» es un nombre provisional.",
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
    <section ref={container} className="bg-zinc-950 py-16 md:py-20 px-4 md:px-12 border-t border-white/10 relative overflow-hidden">
      <div className="ascii-field text-white/60" aria-hidden="true">{`000 / quiet proof
111 / market signal
010 / systems
101 / selective growth`}</div>
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="section-heading mb-10">
          <span className="text-xs font-black uppercase tracking-[0.3em] text-white/35 block mb-4">Qué hacemos</span>
          <h2 className="text-4xl md:text-5xl font-black text-white leading-tight tracking-tighter max-w-3xl">
            Construimos herramientas.
            <span className="text-white/35"> También hacemos marketing.</span>
          </h2>
          <div className="mt-6 flex flex-wrap gap-5 text-sm font-bold uppercase text-gvl-yellow">
            <Link to="/asesoria-creativos" className="hover:underline">Asesoría para creativos ↗</Link>
            <Link to="/asesoria-equipos" className="hover:underline">Asesoría para equipos ↗</Link>
            <Link to="/academia" className="hover:underline">Academia en construcción ↗</Link>
          </div>
        </div>

        {/* Value Props Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {valuePropItems.map((item, idx) => (
            <div
              key={idx}
              className="value-card group bg-white/[0.025] border border-white/10 rounded-none p-5 md:p-6 hover:bg-white/[0.06] hover:border-white/25 transition-all duration-300 cursor-default"
            >
              <div className="text-3xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-black text-white mb-2 transition-colors">
                {item.title}
              </h3>
              <p className="text-gray-400 leading-relaxed text-sm">
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
