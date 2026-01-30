import React from 'react';
import Carousel from '../../components/Carousel';
import CtaBanner from '../../components/CtaBanner';
import { ArrowRight, Star } from 'lucide-react';

const MarcaDisenoPrivate = () => {
    // Marca & Diseño Images from Assets
    const brandingImages1 = [
        '/assets/images/Marca y Diseño/Burgnhdorf/Mesa de trabajo 1 copia 2.png',
        '/assets/images/Marca y Diseño/Burgnhdorf/Logos Usage.png',
        '/assets/images/Marca y Diseño/Burgnhdorf/colors copia 3.png',
        '/assets/images/Marca y Diseño/Burgnhdorf/colors copia 4.png',
        '/assets/images/Marca y Diseño/Burgnhdorf/colors.png'
    ];

    const brandingImages2 = [
        '/assets/images/Marca y Diseño/Papaland/post 1.png',
        '/assets/images/Marca y Diseño/Papaland/post 2.png',
        '/assets/images/Marca y Diseño/Papaland/post 3.png',
        '/assets/images/Marca y Diseño/Papaland/FotoPerfil copia.png',
        '/assets/images/Marca y Diseño/Papaland/FotoPerfil.png'
    ];

    return (
        <div className="pt-24 min-h-screen bg-white text-black font-sans">
            {/* Header */}
            <section className="px-4 md:px-12 mb-20">
                <div className="grid md:grid-cols-2 gap-12 items-end">
                    <div>
                        <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter mb-4 text-transparent text-stroke-black" style={{ WebkitTextStroke: '2px black' }}>
                            Marca
                        </h1>
                        <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter mb-8 leading-[0.8]">
                            & Diseño
                        </h1>
                    </div>
                    <div className="pb-4">
                        <p className="text-xl md:text-2xl font-medium max-w-lg leading-snug border-l-4 border-gvl-yellow pl-6">
                            No diseñamos solo "logos". Construimos activos intangibles de alto valor. Identidades que perduran y conectan.
                        </p>
                    </div>
                </div>
            </section>

            {/* Introduction / Value */}
            <section className="px-4 md:px-12 mb-24">
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="bg-gray-100 p-8 rounded-2xl">
                        <Star className="w-10 h-10 mb-4 text-gvl-orange fill-current" />
                        <h3 className="text-xl font-bold uppercase mb-2">Diferenciación Radical</h3>
                        <p className="text-gray-600">En un mercado saturado, ser "mejor" no basta. Tienes que ser diferente. Encontramos tu ángulo único.</p>
                    </div>
                    <div className="bg-gray-100 p-8 rounded-2xl">
                        <Star className="w-10 h-10 mb-4 text-gvl-blue fill-current" />
                        <h3 className="text-xl font-bold uppercase mb-2">Psicología del Color</h3>
                        <p className="text-gray-600">Usamos la ciencia del color para evocar las emociones correctas en tu cliente ideal antes de que lean una sola palabra.</p>
                    </div>
                    <div className="bg-gray-100 p-8 rounded-2xl">
                        <Star className="w-10 h-10 mb-4 text-black fill-current" />
                        <h3 className="text-xl font-bold uppercase mb-2">Sistemas Escalables</h3>
                        <p className="text-gray-600">Entregamos guías de estilo completas. Tu marca se verá increíble en una tarjeta de visita y en una valla de autopista.</p>
                    </div>
                </div>
            </section>

            {/* Carousel 1: Visual Systems */}
            <section className="px-4 md:px-12 mb-24">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h3 className="text-3xl font-black uppercase mb-6">Sistemas Visuales Completos</h3>
                        <p className="text-lg mb-6 text-gray-700">
                            Un logotipo es solo la punta del iceberg. Diseñamos todo el ecosistema visual: tipografía, patrones, iconografía y estilo fotográfico.
                        </p>
                        <p className="text-lg mb-8 text-gray-700">
                            Creamos marcas vivas que pueden evolucionar sin perder su esencia.
                        </p>
                    </div>
                    <div>
                        <div className="max-w-[700px] mx-auto">
                            <Carousel images={brandingImages1} aspectRatio="video" className="rounded-none border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,0.2)]" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Middle CTA */}
            <section className="py-20 bg-gvl-yellow text-black mb-24">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8 max-w-4xl mx-auto leading-none">
                        ¿Listo para subir de nivel tu imagen?
                    </h2>
                    <button className="bg-black text-white px-10 py-4 rounded-full text-xl font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all border-2 border-transparent hover:border-black flex items-center gap-3 mx-auto">
                        Inicia tu Proyecto <ArrowRight />
                    </button>
                </div>
            </section>

            {/* Carousel 2: Details */}
            <section className="px-4 md:px-12 mb-20">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="order-2 md:order-1">
                        <div className="max-w-[700px] mx-auto relative group">
                            <Carousel images={brandingImages2} aspectRatio="auto" className="aspect-[4/3] rounded-3xl border-4 border-black" />
                            <div className="absolute inset-0 border-4 border-gvl-orange rounded-3xl translate-x-4 translate-y-4 -z-10 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform"></div>
                        </div>
                    </div>
                    <div className="order-1 md:order-2">
                        <h3 className="text-3xl font-black uppercase mb-6">Aplicación en el Mundo Real</h3>
                        <p className="text-lg mb-6 text-gray-700">
                            La teoría es buena, pero la práctica es mejor. Nos aseguramos de que tu identidad funcione en redes sociales, papelería, web y packaging.
                        </p>
                        <p className="text-lg mb-8 text-gray-700">
                            Diseñamos pensando en los puntos de contacto clave donde tu cliente interactúa con tu marca.
                        </p>
                    </div>
                </div>
            </section>

            <CtaBanner />
        </div>
    );
};

export default MarcaDisenoPrivate;
