import React from 'react';
import Carousel from '../../components/Carousel';
import CtaBanner from '../../components/CtaBanner';

const BrandingPrivate = () => {
    // Reusing images or using specific branding ones if different
    const portfolioImages = Array.from({ length: 6 }).map((_, i) => `https://picsum.photos/1200/800?random=${i + 500}`); // Using picsum for this one as fallback or specific branding
    const processImages = Array.from({ length: 4 }).map((_, i) => `https://picsum.photos/800/800?random=${i + 600}`);

    return (
        <div className="pt-24 min-h-screen bg-gvl-black text-white">
            <section className="px-4 md:px-12 mb-20 text-center">
                <h1 className="text-5xl md:text-8xl font-serif italic mb-4 text-gvl-yellow">Private Portfolio</h1>
                <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter">Branding Collection</h2>
            </section>

            <section className="px-4 md:px-12 mb-24 max-w-6xl mx-auto">
                <div className="border-t border-white/30 pt-8 mb-8 flex justify-between items-end">
                    <span className="text-sm font-mono tracking-widest">SELECTED WORKS 2024-2025</span>
                    <span className="text-sm font-mono tracking-widest">01 / 04</span>
                </div>

                <Carousel images={portfolioImages} aspectRatio="video" className="border border-white/20 mb-12" />

                <div className="grid md:grid-cols-2 gap-12 text-lg font-light text-white/80">
                    <p>
                        Una colección curada de nuestros proyectos de identidad más desafiantes. Aquí mostramos el trabajo sin censura, los conceptos exploratorios y las aplicaciones en el mundo real.
                    </p>
                    <p>
                        Cada proyecto es un testimonio de nuestra obsesión por la excelencia visual y la estrategia de marca.
                    </p>
                </div>
            </section>

            <section className="bg-white text-black py-20 px-4 md:px-12">
                <div className="max-w-7xl mx-auto">
                    <h3 className="text-4xl font-black uppercase mb-12">El Proceso Creativo</h3>
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div>
                            <Carousel images={processImages} aspectRatio="square" className="border-2 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,0.2)]" />
                        </div>
                        <div className="space-y-8">
                            <div className="border-b-2 border-black pb-4">
                                <h4 className="text-2xl font-bold mb-2">01. Discovery</h4>
                                <p>Inmersión total en el ADN de la marca.</p>
                            </div>
                            <div className="border-b-2 border-black pb-4">
                                <h4 className="text-2xl font-bold mb-2">02. Exploration</h4>
                                <p>Divergencia creativa y pruebas de concepto.</p>
                            </div>
                            <div className="border-b-2 border-black pb-4">
                                <h4 className="text-2xl font-bold mb-2">03. Refinement</h4>
                                <p>Pulido obsesivo de cada curva y color.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <CtaBanner />
        </div>
    );
};

export default BrandingPrivate;
