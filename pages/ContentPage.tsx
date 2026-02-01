import React, { useLayoutEffect, useRef } from 'react';
import { ArrowUpRight, Camera, Clapperboard, MonitorPlay, MessageSquare } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import CtaBanner from '../components/CtaBanner';

const ContentPage = () => {
    const container = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();

    const goToContact = () => {
        navigate('/contacto', { state: { background: location } });
    };

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
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    <div className="lg:col-span-7">
                        <h1 className="anim-title text-5xl md:text-8xl font-black uppercase tracking-tighter mb-8 leading-[0.9]">
                            Producción <br />
                            <span className="text-stroke-black text-transparent bg-clip-text" style={{ WebkitTextStroke: '2px black' }}>Audiovisual</span>
                        </h1>
                        <p className="anim-title text-xl md:text-2xl font-light max-w-2xl leading-relaxed text-gray-800 mb-10">
                            Comerciales de alto impacto, VSL, contenido para redes sociales, anuncios para plataformas digitales y fotografía de producto para e-commerce. Creamos contenido que refleja el valor de tu marca.
                        </p>

                        <div className="anim-title flex flex-col sm:flex-row items-start sm:items-center gap-6">
                            <button
                                onClick={goToContact}
                                className="bg-black text-white rounded-full px-8 py-4 text-lg font-bold flex items-center gap-3 hover:bg-gray-800 transition-all hover:scale-105 active:scale-95 shadow-xl"
                            >
                                Empezar Proyecto
                                <ArrowUpRight size={20} />
                            </button>

                            <div className="flex items-center gap-4 p-2 pr-6 rounded-full border border-black/10 bg-white/50 backdrop-blur-sm cursor-pointer hover:bg-white transition-colors group" onClick={goToContact}>
                                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gvl-orange">
                                    <img src="/pfp.jpg" alt="Creative Director" className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <p className="text-xs font-black uppercase tracking-widest text-gvl-orange">Hablemos</p>
                                    <p className="text-sm font-bold">Asesoría Directa</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-5 anim-title">
                        <div className="aspect-video w-full rounded-3xl border-2 border-black overflow-hidden shadow-[20px_20px_0px_0px_rgba(0,0,0,0.05)] bg-black">
                            <video
                                src="/videos/ai-production-hero.mp4"
                                className="w-full h-full object-cover"
                                autoPlay loop muted playsInline
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Masonry Grid */}
            <section className="px-4 md:px-12 pb-20 grid-container">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
                    {/* Column 1 */}
                    <div className="flex flex-col gap-4 md:gap-8 mt-0">
                        <div className="anim-img group relative aspect-square overflow-hidden rounded-3xl border border-black shadow-lg cursor-pointer">
                            <img src="public\assets\images\photography-example.png" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Vertical Still 1" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                            <div className="absolute inset-0 z-20 p-8 flex flex-col justify-end text-white">
                                <h3 className="font-black text-2xl translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">Photography</h3>
                                <p className="text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 mt-2">Professional studio session</p>
                            </div>
                        </div>
                        <div className="anim-img group relative aspect-video overflow-hidden rounded-3xl border border-black shadow-lg bg-black cursor-pointer">
                            <video
                                src="/videos/motion.mp4"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                autoPlay loop muted playsInline
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                            <div className="absolute inset-0 z-20 p-8 flex flex-col justify-end text-white">
                                <h3 className="font-black text-2xl translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">Motion Graphics</h3>
                                <p className="text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 mt-2">Abstract visual elements</p>
                            </div>
                        </div>
                    </div>

                    {/* Column 2 */}
                    <div className="flex flex-col gap-4 md:gap-8 mt-0 md:mt-24">
                        <div className="anim-img group relative aspect-video overflow-hidden rounded-3xl border border-black shadow-lg bg-black cursor-pointer">
                            <video
                                src="/videos/production.mp4"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                autoPlay loop muted playsInline
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                            <div className="absolute inset-0 z-20 p-8 flex flex-col justify-end text-white">
                                <h3 className="font-black text-2xl translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">Contenido para Redes Sociales</h3>
                                <p className="text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 mt-2">Contenido para generar ventas a través de redes sociales</p>
                            </div>
                        </div>
                        <div className="anim-img group relative aspect-square overflow-hidden rounded-3xl border border-black shadow-lg cursor-pointer">
                            <img src="public\assets\images\Marca y Diseño\hydraville\branding-example.png" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Vertical Still 2" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                            <div className="absolute inset-0 z-20 p-8 flex flex-col justify-end text-white">
                                <h3 className="font-black text-2xl translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">Branding: Tu marca</h3>
                                <p className="text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 mt-2">Marcas únicas y con identidad</p>
                            </div>
                        </div>
                    </div>

                    {/* Column 3 */}
                    <div className="flex flex-col gap-4 md:gap-8 mt-0 md:mt-12">
                        <div className="anim-img group relative aspect-[9/16] overflow-hidden rounded-3xl border border-black shadow-lg bg-black cursor-pointer">
                            <video
                                src="/videos/videos-verticales.mp4"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                autoPlay loop muted playsInline
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                            <div className="absolute inset-0 z-20 p-8 flex flex-col justify-end text-white">
                                <h3 className="font-black text-2xl translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">Anuncios Pagados</h3>
                                <p className="text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 mt-2">Publicidad en redes sociales: Google ADS, Meta Business Manager, Tiktok Ads</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Detailed Description Section */}
            <section className="process-section px-4 md:px-12 py-24 bg-white border-t border-black">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-16 md:w-2/3">
                        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6">
                            Calidad Cinema <br /> para tu Marca
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