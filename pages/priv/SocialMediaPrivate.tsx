import React from 'react';
import Carousel from '../../components/Carousel';
import CtaBanner from '../../components/CtaBanner';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

const SocialMediaPrivate = () => {
    // Social Media Images from Assets
    const carouselImages1 = [
        '/assets/images/Social Media/carrusel/CARRUSEL_FINAL_1.png',
        '/assets/images/Social Media/carrusel/CARRUSEL_FINAL_N_2.png',
        '/assets/images/Social Media/carrusel/CarlosMoraga_Carrusel1.png',
        '/assets/images/Social Media/carrusel/GloriaConcha_Carrusel1.png',
        '/assets/images/Social Media/carrusel/XimenaC_Carrusel1.png'
    ];

    const carouselImages2 = [
        '/assets/images/Social Media/carrusel 2/Post - Weedmaps.png',
        '/assets/images/Social Media/carrusel 2/sept-26.png',
        '/assets/images/Social Media/carrusel 2/oct-9.png',
        '/assets/images/Social Media/Halloween 1.png',
        '/assets/images/Social Media/carrusel/XimenaC_Story1.png'
    ];

    return (
        <div className="pt-24 min-h-screen bg-gvl-cream text-gvl-black font-sans">
            {/* Header Section */}
            <section className="px-4 md:px-12 mb-20">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-8 leading-[0.9]">
                            Social <span className="text-gvl-orange">Media</span> Strat.
                        </h1>
                        <div className="text-xl md:text-2xl font-light border-l-4 border-gvl-black pl-6">
                            <p>
                                Dejamos atrás los "posts de relleno". Creamos ecosistemas de contenido que construyen autoridad, comunidad y ventas.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Value Proposition Section */}
            <section className="px-4 md:px-12 mb-24">
                <div className="bg-black text-gvl-yellow p-8 md:p-12 rounded-3xl shadow-[8px_8px_0px_0px_gray]">
                    <div className="grid md:grid-cols-3 gap-8">
                        <div>
                            <h3 className="text-2xl font-black uppercase mb-4">Strategia primero</h3>
                            <p className="font-light text-white/90">Analizamos tu audiencia, competencia y objetivos. No disparamos al aire; cada pieza de contenido tiene un "por qué" y un "para quién".</p>
                        </div>
                        <div>
                            <h3 className="text-2xl font-black uppercase mb-4">Estética Nativa</h3>
                            <p className="font-light text-white/90">El diseño "corporativo" no funciona en redes. Creamos visuales que se sienten nativos de la plataforma pero elevados por tu marca.</p>
                        </div>
                        <div>
                            <h3 className="text-2xl font-black uppercase mb-4">Growth Loop</h3>
                            <p className="font-light text-white/90">Contenido diseñado para ser compartido. Maximizamos el alcance orgánico mediante hooks visuales y narrativa emocional.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Carousel 1: Feed & Aesthetics */}
            <section className="px-4 md:px-12 mb-24">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div className="order-2 md:order-1">
                        <div className="relative max-w-[600px] mx-auto">
                            <Carousel images={carouselImages1} aspectRatio="square" className="shadow-[12px_12px_0px_0px_black] border-2 border-black" />
                        </div>
                    </div>
                    <div className="order-1 md:order-2">
                        <div className="w-12 h-1 bg-gvl-black mb-6"></div>
                        <h2 className="text-4xl font-black uppercase tracking-widest mb-6">Feed & Identity</h2>
                        <p className="text-lg mb-6 leading-relaxed">
                            Tu feed es tu carta de presentación digital. En menos de 3 segundos, un usuario decide si seguirte o irse. Nosotros aseguramos que se queden.
                        </p>
                        <ul className="space-y-3 mb-8">
                            <li className="flex items-center gap-3 font-bold"><CheckCircle2 className="text-gvl-blue" /> Grid Layout Estratégico</li>
                            <li className="flex items-center gap-3 font-bold"><CheckCircle2 className="text-gvl-blue" /> Pilares de Contenido Claros</li>
                            <li className="flex items-center gap-3 font-bold"><CheckCircle2 className="text-gvl-blue" /> Copywriting Persuasivo</li>
                        </ul>
                        <button className="bg-black text-white px-8 py-3 rounded-full font-bold uppercase tracking-widest hover:bg-gvl-blue hover:scale-105 transition-all flex items-center gap-2">
                            Ver Planes <ArrowRight size={20} />
                        </button>
                    </div>
                </div>
            </section>

            {/* Middle CTA */}
            <section className="bg-gvl-blue text-white py-16 mb-24 skew-y-1">
                <div className="container mx-auto px-4 text-center -skew-y-1">
                    <h2 className="text-3xl md:text-5xl font-black uppercase mb-6">¿Tu marca necesita una voz?</h2>
                    <p className="text-xl mb-8 max-w-2xl mx-auto">Deja de hablarle a la pared. Empieza a construir una comunidad real.</p>
                </div>
            </section>

            {/* Carousel 2: Stories & Short Form */}
            <section className="px-4 md:px-12 mb-20">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div>
                        <div className="w-12 h-1 bg-gvl-black mb-6"></div>
                        <h2 className="text-4xl font-black uppercase tracking-widest mb-6">Reels & Stories</h2>
                        <p className="text-lg mb-6 leading-relaxed">
                            El video vertical es el rey del alcance actual. Creamos piezas dinámicas, con edición de alto nivel y sound design que retienen la atención hasta el último segundo.
                        </p>
                        <p className="text-lg mb-6">
                            Desde tendencias virales adaptadas a tu nicho hasta contenido educativo profundo, cubrimos todo el espectro del video marketing.
                        </p>
                    </div>
                    <div>
                        <div className="relative max-w-[400px] mx-auto">
                            <Carousel images={carouselImages2} aspectRatio="portrait" className="shadow-[12px_12px_0px_0px_black] border-2 border-black" />
                        </div>
                    </div>
                </div>
            </section>

            <CtaBanner />
        </div>
    );
};

export default SocialMediaPrivate;
