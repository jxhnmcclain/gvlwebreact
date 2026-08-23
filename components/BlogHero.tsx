import React from 'react';
import { Link } from 'react-router-dom';

const BlogHero = () => {
    return (
        <section className="relative bg-[#050505] text-white pt-32 pb-16 px-6 md:px-12 overflow-hidden border-b border-white/10">
            <div className="ascii-field text-white/50" aria-hidden="true">{`BLOG://FIELD
notes / systems / quiet findings
001101 010010 000111
do not publish noise`}</div>
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="flex items-center gap-2 text-xs mb-10 font-mono uppercase tracking-[0.24em]">
                    <Link to="/" className="text-white/45 hover:text-gvl-yellow transition-colors">Home</Link>
                    <span className="text-white/20">/</span>
                    <span className="text-gvl-yellow/70">Archivo</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9]">
                            Notas desde el cuarto negro.
                        </h1>
                    </div>

                    <div>
                        <p className="text-lg md:text-xl text-white/55 leading-relaxed font-medium max-w-xl ml-auto">
                            Web, prospeccion, SEO, contenido. Pocas certezas. Buenas pistas.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BlogHero;
