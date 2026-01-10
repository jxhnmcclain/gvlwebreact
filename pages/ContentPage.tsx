import React, { useLayoutEffect, useRef } from 'react';
import { ArrowUpRight, Camera, Clapperboard, MonitorPlay } from 'lucide-react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import CtaBanner from '../components/CtaBanner';

const ContentPage = () => {
  const container = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".anim-title", {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
        stagger: 0.1
      });
      gsap.from(".anim-img", {
        scale: 0.8,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        scrollTrigger: {
            trigger: ".grid-container",
            start: "top 80%"
        }
      });
       gsap.from(".process-card", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
            trigger: ".process-section",
            start: "top 70%"
        }
      });
    }, container);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={container} className="pt-24 min-h-screen bg-gvl-cream">
      {/* Hero */}
      <section className="px-4 md:px-12 mb-20">
        <h1 className="anim-title text-5xl md:text-8xl font-black uppercase tracking-tighter mb-8 leading-[0.9]">
            Producción <br/>
            <span className="text-stroke-black text-transparent bg-clip-text" style={{ WebkitTextStroke: '2px black' }}>Audiovisual</span>
        </h1>
        <p className="anim-title text-xl md:text-2xl font-light max-w-2xl leading-relaxed text-gray-800">
            Desde comerciales de alto impacto hasta fotografía de producto para e-commerce. Creamos universos visuales que elevan la percepción de valor de tu marca.
        </p>
      </section>

      {/* Masonry Grid */}
      <section className="px-4 md:px-12 pb-20 grid-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
            <div className="flex flex-col gap-4 md:gap-8 mt-0 md:mt-0">
                <img src="https://picsum.photos/600/800?random=101" className="anim-img w-full rounded-3xl border border-black shadow-lg" alt="Photography Work" />
                <img src="https://picsum.photos/600/600?random=102" className="anim-img w-full rounded-3xl border border-black shadow-lg" alt="Studio Shot" />
            </div>
            <div className="flex flex-col gap-4 md:gap-8 mt-0 md:mt-24">
                <img src="https://picsum.photos/600/900?random=103" className="anim-img w-full rounded-3xl border border-black shadow-lg" alt="Product Photography" />
                <img src="https://picsum.photos/600/700?random=104" className="anim-img w-full rounded-3xl border border-black shadow-lg" alt="Lifestyle Shot" />
            </div>
            <div className="flex flex-col gap-4 md:gap-8 mt-0 md:mt-12">
                <img src="https://picsum.photos/600/800?random=105" className="anim-img w-full rounded-3xl border border-black shadow-lg" alt="Corporate Video" />
                <img src="https://picsum.photos/600/600?random=106" className="anim-img w-full rounded-3xl border border-black shadow-lg" alt="Creative Direction" />
            </div>
        </div>
      </section>

      {/* Detailed Description Section */}
      <section className="process-section px-4 md:px-12 py-24 bg-white border-t border-black">
        <div className="max-w-7xl mx-auto">
            <div className="mb-16 md:w-2/3">
                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6">
                    Calidad Cinema <br/> para tu Marca
                </h2>
                <p className="text-xl text-gray-700 leading-relaxed">
                    No solo apretamos el botón de grabar. La producción audiovisual en GVL es un proceso meticuloso de ingeniería creativa. Entendemos que la imagen lo es todo en la decisión de compra, por eso utilizamos equipos de última generación (Cinema Cameras, Lentes Prime, Iluminación profesional) combinados con una dirección de arte exquisita.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="process-card bg-gvl-cream p-8 rounded-[2rem] border border-black hover:shadow-[8px_8px_0px_0px_black] transition-shadow duration-300">
                    <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center text-white mb-6">
                        <Clapperboard size={32} />
                    </div>
                    <h3 className="text-2xl font-bold uppercase mb-4">Pre-Producción</h3>
                    <p className="text-gray-600">
                        Donde nace la magia. Desarrollamos guiones técnicos, storyboard, casting de talentos, búsqueda de locaciones (scouting) y diseño de set. Nada se deja al azar.
                    </p>
                </div>

                <div className="process-card bg-gvl-cream p-8 rounded-[2rem] border border-black hover:shadow-[8px_8px_0px_0px_black] transition-shadow duration-300">
                    <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center text-white mb-6">
                        <Camera size={32} />
                    </div>
                    <h3 className="text-2xl font-bold uppercase mb-4">Rodaje / Shooting</h3>
                    <p className="text-gray-600">
                        Ejecución técnica impecable. Dirección de fotografía, manejo de iluminación y dirección de actores para capturar exactamente la emoción y estética que tu marca necesita transmitir.
                    </p>
                </div>

                <div className="process-card bg-gvl-cream p-8 rounded-[2rem] border border-black hover:shadow-[8px_8px_0px_0px_black] transition-shadow duration-300">
                    <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center text-white mb-6">
                        <MonitorPlay size={32} />
                    </div>
                    <h3 className="text-2xl font-bold uppercase mb-4">Post-Producción</h3>
                    <p className="text-gray-600">
                        El toque final. Edición de ritmo, corrección de color (color grading) profesional, diseño sonoro (sound design) y efectos visuales que hacen que tu video destaque del resto.
                    </p>
                </div>
            </div>
        </div>
      </section>
      
      <CtaBanner />
    </div>
  );
};

export default ContentPage;