import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import CtaBanner from '../components/CtaBanner';

const ReelsPage = () => {
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
      gsap.from(".reel-card", {
        y: 200,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
            trigger: ".reels-container",
            start: "top 80%"
        }
      });
      gsap.from(".text-content", {
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
            trigger: ".details-section",
            start: "top 75%"
        }
      });
    }, container);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={container} className="pt-24 min-h-screen bg-black text-gvl-cream">
      {/* Hero Header */}
      <section className="px-4 md:px-12 mb-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <h1 className="anim-title text-6xl md:text-9xl font-black uppercase tracking-tighter text-gvl-yellow leading-none">
                Redes <br/> Sociales
            </h1>
            <p className="anim-title text-xl md:text-2xl font-light max-w-xl leading-relaxed text-white mb-4">
                No se trata solo de publicar, se trata de construir una comunidad. Estrategia, creatividad y análisis para que tu marca no solo sea vista, sino recordada.
            </p>
        </div>
      </section>

      {/* Carousel */}
      <section className="px-4 md:px-12 pb-20 reels-container overflow-x-auto no-scrollbar">
        <div className="flex gap-6 md:gap-12 min-w-max pb-12">
            {[1,2,3,4,5].map((i) => (
                <div key={i} className="reel-card relative w-[300px] h-[550px] md:w-[400px] md:h-[700px] bg-gray-800 rounded-[3rem] overflow-hidden border-2 border-gvl-yellow shadow-[0_0_30px_rgba(223,255,0,0.2)]">
                    <img src={`https://picsum.photos/400/800?random=${200+i}`} className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-500" alt="Reel cover" />
                    <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black to-transparent">
                        <div className="bg-gvl-yellow text-black text-xs font-bold px-3 py-1 rounded-full inline-block mb-2">
                            +150K Views
                        </div>
                        <h3 className="text-2xl font-bold leading-tight">Case Study #{i}</h3>
                    </div>
                </div>
            ))}
        </div>
      </section>

      {/* Detailed Description Section */}
      <section className="details-section px-4 md:px-12 pb-24 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
            <div className="text-content">
                <h2 className="text-3xl md:text-5xl font-black uppercase text-gvl-yellow mb-6">
                    Más allá del "Postear por Postear"
                </h2>
                <div className="w-20 h-2 bg-white mb-8"></div>
                <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-6">
                    En el saturado mundo digital de hoy, el alcance orgánico es un tesoro y la atención es la moneda de cambio. Nuestra metodología en Growth Video Lab se basa en un entendimiento profundo de los algoritmos actuales (Instagram, TikTok, LinkedIn) y, más importante aún, de la psicología del consumidor.
                </p>
                <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                    No somos una agencia que simplemente rellena un calendario. Somos estrategas de crecimiento. Analizamos tus métricas, identificamos qué resuena con tu audiencia y pivotamos rápidamente para capitalizar tendencias sin perder la esencia de tu marca.
                </p>
            </div>

            <div className="space-y-12">
                <div className="text-content">
                    <h3 className="text-2xl font-bold text-white mb-4 uppercase tracking-wide">01. Estrategia de Contenidos</h3>
                    <p className="text-gray-400">
                        Desarrollamos pilares de contenido sólidos que educan, entretienen e inspiran. Definimos el tono de voz, los formatos ganadores (Reels, Carruseles, Stories) y la frecuencia ideal para mantener a tu audiencia enganchada.
                    </p>
                </div>
                <div className="text-content">
                    <h3 className="text-2xl font-bold text-white mb-4 uppercase tracking-wide">02. Community Management</h3>
                    <p className="text-gray-400">
                        Una marca que no responde es una marca muerta. Gestionamos tu comunidad de forma activa, fomentando la conversación, respondiendo dudas y convirtiendo seguidores en embajadores de marca leales.
                    </p>
                </div>
                <div className="text-content">
                    <h3 className="text-2xl font-bold text-white mb-4 uppercase tracking-wide">03. Growth Hacking & Viralidad</h3>
                    <p className="text-gray-400">
                        Utilizamos técnicas de edición dinámica, hooks visuales potentes y audios en tendencia para maximizar las probabilidades de viralidad, atrayendo tráfico masivo al tope de tu embudo de ventas.
                    </p>
                </div>
            </div>
        </div>
      </section>
      
      <CtaBanner />
    </div>
  );
};

export default ReelsPage;