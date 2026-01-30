import React from 'react';
import { Link } from 'react-router-dom';
import { BlogPost, formatDate } from '../lib/blogUtils';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

const BlogHero = () => {
    return (
        <section className="bg-white pt-32 pb-12 px-6 md:px-12">
            <div className="max-w-7xl mx-auto">
                {/* Breadcrumbs */}
                <div className="flex items-center gap-2 text-sm mb-8 font-medium">
                    <Link to="/" className="text-gvl-orange hover:text-black transition-colors">Home</Link>
                    <span className="text-gray-300">{' > '}</span>
                    <span className="text-gvl-orange">Blog de Growth Video Lab</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Title */}
                    <div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-black">
                            Blog de Marketing: <br />
                            <span className="text-black">Estrategia, Video & IA</span>
                        </h1>
                    </div>

                    {/* Description */}
                    <div>
                        <p className="text-lg text-gray-600 leading-relaxed font-medium max-w-xl ml-auto">
                            Exploramos, analizamos y compartimos las últimas tendencias y novedades del marketing digital y la producción de video. Donde la creatividad se encuentra con la estrategia de datos.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BlogHero;
