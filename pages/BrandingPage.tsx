import React, { useLayoutEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import CtaBanner from '../components/CtaBanner';

const BrandingPage = () => {
  const container = useRef(null);
  const navigate = useNavigate();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.from(".anim-char", {
        y: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.05,
        ease: "back.out(1.7)"
      });

      gsap.from(".seo-content", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".seo-section",
          start: "top 80%"
        }
      });

      gsap.from(".brand-grid-item", {
        scale: 0.5,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".brand-grid",
          start: "top 80%"
        }
      });
    }, container);
    return () => ctx.revert();
  }, []);

  const title = "Identidad de Marca";

  return (
    <div ref={container} className="pt-24 min-h-screen bg-gvl-yellow">
      <section className="px-4 md:px-12 mb-12 min-h-[50vh] flex flex-col justify-center">
        <h1 className="text-5xl md:text-9xl font-black uppercase tracking-tighter mb-8 overflow-hidden leading-[0.9]">
          {title.split("").map((char, i) => (
            <span key={i} className="anim-char inline-block min-w-[20px]">{char}</span>
          ))}
        </h1>
        <div className="bg-black text-white p-6 md:p-8 max-w-xl rounded-tr-[2rem] rounded-bl-[2rem] shadow-[8px_8px_0px_0px_white]">
          <p className="text-xl md:text-2xl font-light">
            Creamos una marca que realmente refleje tus valores y que te ayude a destacar en el mundo digital. Trabajamos en conjunto a ti todo el proceso para que puedas enfocarte en lo que quieres que sea tu marca.
          </p>
        </div>
      </section>

      {/* SEO / Philosophy Section */}
      <section className="seo-section px-4 md:px-12 py-12 md:py-24 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div className="seo-content">
            <h2 className="text-3xl md:text-6xl font-black uppercase tracking-tighter mb-6 leading-none">
              Marcas <br />
              <span className="text-transparent text-stroke-black bg-clip-text bg-black/10" style={{ WebkitTextStroke: '2px black' }}>Relevates en la era digital</span>
            </h2>
            <div className="w-24 h-3 bg-black mb-8"></div>
          </div>
          <div className="space-y-6 text-lg md:text-xl font-medium leading-relaxed seo-content border-l-4 border-black pl-6 md:pl-12">
            <p>
              En un ecosistema digital saturado, ser "correcto" no es suficiente. Tu marca necesita tener <strong>caracter</strong> y auténticamente <strong>representarte a ti</strong>.
            </p>
            <p>
              Nos especializamos en el diseño de <strong>marcas únicas</strong> que desafían las plantillas corporativas tradicionales. Entendemos el caos del internet actual y creamos sistemas visuales flexibles diseñados para destacar en el scroll infinito.
            </p>
            <p>
              Desde PYMES hasta creadores de contenido, forjamos identidades que hablan el lenguaje de la cultura digital actual, asegurando que tu proyecto no solo se vea bien, sino que se sienta vivo.
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 md:px-12 pb-20">
        <div className="brand-grid grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Grid of brand assets */}
          <div className="brand-grid-item col-span-2 row-span-2 aspect-square bg-white rounded-3xl border-2 border-black overflow-hidden relative group">
            <img src="/marca-diseno/hydraville.jpg" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Brand Showcase 1" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/40 transition-opacity">
              <span className="text-white font-bold text-2xl">Hydraville</span>
            </div>
          </div>

          <div className="brand-grid-item bg-white aspect-square rounded-3xl border-2 border-black overflow-hidden relative group">
            <img src="/marca-diseno/papaland.jpg" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Papaland" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/40 transition-opacity">
              <span className="text-white font-bold text-2xl">Papaland</span>
            </div>
          </div>

          <div className="brand-grid-item aspect-square bg-white rounded-3xl border-2 border-black overflow-hidden relative group">
            <img src="/marca-diseno/bourghdorf.jpg" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Bourghdorf" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/40 transition-opacity">
              <span className="text-white font-bold text-2xl">Bourghdorf</span>
            </div>
          </div>

          <div className="brand-grid-item aspect-square bg-white rounded-3xl border-2 border-black overflow-hidden relative group">
            <img src="/marca-diseno/shelle burnett.jpg" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Shelle Burnett" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/40 transition-opacity">
              <span className="text-white font-bold text-2xl">Shelle Burnett</span>
            </div>
          </div>

          <div
            onClick={() => navigate('/contacto')}
            className="brand-grid-item aspect-square bg-black text-gvl-yellow rounded-3xl border-2 border-black flex flex-col items-center justify-center p-4 text-center cursor-pointer transition-colors duration-500 hover:bg-white hover:text-black hover:scale-[1.03] hover:rotate-3 group"
          >
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-current flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <ArrowUpRight size={28} />
            </div>
            <h3 className="text-xl md:text-2xl font-black uppercase tracking-tighter leading-none">
              Tu marca <br /> aquí
            </h3>
            <p className="text-[10px] md:text-xs font-bold mt-2 opacity-60 uppercase tracking-widest">
              Empezar ahora
            </p>
          </div>
        </div>
      </section>

      <CtaBanner />
    </div>
  );
};

export default BrandingPage;