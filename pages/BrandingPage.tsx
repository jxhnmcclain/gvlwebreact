import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import CtaBanner from '../components/CtaBanner';

const BrandingPage = () => {
  const container = useRef(null);

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

  const title = "IDENTIDAD & ALMA";

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
                Construimos marcas que no solo se ven bien, sino que se sienten. Desde el logotipo hasta la voz de tu marca.
            </p>
        </div>
      </section>

      {/* SEO / Philosophy Section */}
      <section className="seo-section px-4 md:px-12 py-12 md:py-24 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div className="seo-content">
                <h2 className="text-3xl md:text-6xl font-black uppercase tracking-tighter mb-6 leading-none">
                    Marcas <br/>
                    <span className="text-transparent text-stroke-black bg-clip-text bg-black/10" style={{ WebkitTextStroke: '2px black' }}>Nativas de Internet</span>
                </h2>
                <div className="w-24 h-3 bg-black mb-8"></div>
            </div>
            <div className="space-y-6 text-lg md:text-xl font-medium leading-relaxed seo-content border-l-4 border-black pl-6 md:pl-12">
                <p>
                    En un ecosistema digital saturado, ser "correcto" no es suficiente. Tu marca necesita ser radicalmente <strong>relevante</strong> y auténticamente <strong>única</strong>.
                </p>
                <p>
                    Nos especializamos en el diseño de <strong>marcas alternativas</strong> que desafían las plantillas corporativas tradicionales. Entendemos el caos del internet actual y creamos sistemas visuales flexibles diseñados para destacar en el scroll infinito.
                </p>
                <p>
                    Desde startups disruptivas hasta creadores de contenido, forjamos identidades que hablan el lenguaje de la cultura digital actual, asegurando que tu proyecto no solo se vea bien, sino que se sienta vivo.
                </p>
            </div>
        </div>
      </section>

      <section className="px-4 md:px-12 pb-20">
         <div className="brand-grid grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Grid of brand assets */}
            <div className="brand-grid-item col-span-2 row-span-2 aspect-square bg-white rounded-3xl border-2 border-black overflow-hidden relative group">
                <img src="https://picsum.photos/800/800?random=401" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Brand Showcase 1" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/40 transition-opacity">
                    <span className="text-white font-bold text-2xl">Logofolio</span>
                </div>
            </div>
            
            <div className="brand-grid-item bg-black text-gvl-yellow p-6 rounded-3xl border-2 border-black flex items-center justify-center text-center font-bold text-xl uppercase tracking-widest hover:bg-white hover:text-black transition-colors duration-300">
                Paletas de Color <br/> Disruptivas
            </div>
            
            <div className="brand-grid-item aspect-square bg-white rounded-3xl border-2 border-black overflow-hidden">
                <img src="https://picsum.photos/400/400?random=402" className="w-full h-full object-cover" alt="Brand Detail" />
            </div>

            <div className="brand-grid-item aspect-square bg-orange-500 rounded-3xl border-2 border-black overflow-hidden flex items-center justify-center group hover:bg-gvl-blue transition-colors duration-500">
                <span className="font-serif text-4xl md:text-5xl italic group-hover:text-white transition-colors">Typography</span>
            </div>

            <div className="brand-grid-item bg-gvl-cream p-6 rounded-3xl border-2 border-black flex items-center justify-center text-center font-bold text-lg uppercase">
                Packaging Design
            </div>
         </div>
      </section>
      
      <CtaBanner />
    </div>
  );
};

export default BrandingPage;