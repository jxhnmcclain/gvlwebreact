import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { Lock, Repeat, ScanLine, Waypoints } from 'lucide-react';

type ValuePropData = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

const valuePropItems: ValuePropData[] = [
  {
    icon: <ScanLine size={28} className="text-white/50" />,
    title: "Diagnóstico sin show",
    description: "Primero miramos dónde se rompe la confianza: oferta, web, seguimiento o presencia.",
  },
  {
    icon: <Waypoints size={28} className="text-white/50" />,
    title: "Una ruta, no un paquete",
    description: "Web, marca, contenido o sistema. Se arma lo que falta, no lo que queda bonito en una lista.",
  },
  {
    icon: <Lock size={28} className="text-white/50" />,
    title: "Activos bajo control",
    description: "Dominio, hosting, accesos y archivos quedan ordenados. Sin cajas negras innecesarias.",
  },
  {
    icon: <Repeat size={28} className="text-white/50" />,
    title: "Seguimiento después del clic",
    description: "La página no termina en contacto. Puede seguir con CRM, email, UTM y automatización.",
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
    <section ref={container} className="bg-zinc-950 py-24 px-4 md:px-12 border-t border-white/10 relative overflow-hidden">
      <div className="ascii-field text-white/60" aria-hidden="true">{`000 / quiet proof
111 / market signal
010 / systems
101 / selective growth`}</div>
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="section-heading mb-16">
          <span className="text-xs font-black uppercase tracking-[0.3em] text-white/35 block mb-4">Modo de trabajo</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tighter max-w-2xl">
            Menos ruido. Mas estructura.
            <span className="text-white/35"> Una agencia pequena por diseno.</span>
          </h2>
        </div>

        {/* Value Props Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {valuePropItems.map((item, idx) => (
            <div
              key={idx}
              className="value-card group bg-white/[0.025] border border-white/10 rounded-none p-8 md:p-10 hover:bg-white/[0.06] hover:border-white/25 transition-all duration-300 cursor-default"
            >
              <div className="text-4xl mb-5">{item.icon}</div>
              <h3 className="text-xl md:text-2xl font-black text-white mb-3 transition-colors">
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
