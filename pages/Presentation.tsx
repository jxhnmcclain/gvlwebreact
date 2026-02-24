import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Maximize } from 'lucide-react';

const SlideContent = ({ children, title }: { children: React.ReactNode, title?: string }) => (
    <div className="flex flex-col items-center justify-center h-full w-full px-8 md:px-16 pt-12 pb-24">
        {title && (
            <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-4xl md:text-5xl font-extrabold text-[#111] font-sans mb-12 text-center"
            >
                {title}
            </motion.h2>
        )}
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full flex justify-center items-center flex-grow"
        >
            {children}
        </motion.div>
    </div>
);

const Presentation: React.FC = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);

    const slides = [
        // Slide 1: Intro
        {
            id: 'intro',
            content: (
                <SlideContent>
                    <div className="flex flex-col items-center justify-center text-center space-y-8 max-w-4xl">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 260, damping: 20 }}
                            className="w-56 h-56 bg-white rounded-full overflow-hidden mb-2 border-8 border-white shadow-2xl"
                        >
                            <img
                                src="/foto-john.jpg"
                                alt="John"
                                className="w-full h-full object-cover"
                                onError={(e) => { e.currentTarget.src = 'https://ui-avatars.com/api/?name=John&size=200&background=1e293b&color=fff'; }}
                            />
                        </motion.div>
                        <div className="space-y-4">
                            <h3 className="text-3xl font-medium text-gray-500 tracking-tight">Hola soy John, y te presento</h3>
                            <h2 className="text-6xl md:text-7xl font-black text-[#111] tracking-tight">Growth Video Lab</h2>
                        </div>
                        <p className="text-2xl mt-6 text-gray-600 font-medium leading-relaxed">
                            Impulsamos marcas combinando <strong>estrategias de marketing creativas</strong>, <strong>producción audiovisual</strong> y <strong>diseño</strong>.
                        </p>
                    </div>
                </SlideContent>
            )
        },
        // Slide 2: Enfoque y Estrategias
        {
            id: 'focus',
            title: 'Enfoque y Estrategias',
            content: (
                <SlideContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch w-full max-w-6xl">
                        <div className="space-y-8 flex flex-col justify-center">
                            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                                <h3 className="text-2xl font-black mb-3 text-[#111]">Metodología Integral</h3>
                                <p className="text-lg text-gray-600">No solo creamos contenido visualmente atractivo; diseñamos <strong>estrategias de marketing</strong> pensadas para ayudarte a conseguir más clientes y potenciar tu presencia en el mercado.</p>
                            </div>
                            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                                <h3 className="text-2xl font-black mb-3 text-[#111]">El Objetivo: Crecimiento</h3>
                                <p className="text-lg text-gray-600">Alineamos nuestro trabajo creativo con los <strong>objetivos comerciales</strong> de tu empresa para asegurar que cada acción de marketing tenga un impacto real y positivo en tus resultados.</p>
                            </div>
                        </div>
                        <div className="bg-[#111] text-white p-10 rounded-3xl shadow-2xl flex flex-col justify-center relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -mr-20 -mt-20 transition-transform group-hover:scale-150 duration-700"></div>

                            <h3 className="text-3xl font-black mb-8 relative z-10">Servicios Complementarios</h3>
                            <ul className="space-y-6 text-xl relative z-10 font-medium">
                                <li className="flex items-start gap-4">
                                    <span className="text-2xl">✨</span>
                                    <span>Creación y diseño de marca</span>
                                </li>
                                <li className="flex items-start gap-4">
                                    <span className="text-2xl">📱</span>
                                    <span>Ideación y estrategias de redes sociales</span>
                                </li>
                                <li className="flex items-start gap-4 mt-8 pt-8 border-t border-white/20 text-gray-300">
                                    <span className="text-2xl">🤝</span>
                                    <span>Asesoría continua para <strong>optimizar y adaptar</strong> tus esfuerzos de marketing a medida que tu negocio crece.</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </SlideContent>
            )
        },
        // Slide 3: Casos de Éxito
        {
            id: 'cases',
            title: 'Casos y Proyectos',
            content: (
                <SlideContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full">
                        {/* Branding */}
                        <div className="group relative overflow-hidden rounded-3xl aspect-[4/5] bg-gray-200 shadow-xl cursor-default">
                            <img
                                src="/marca-diseno/bourghdorf.jpg"
                                alt="Branding y marca"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#111]/90 via-[#111]/30 to-transparent flex flex-col justify-end p-8 transition-opacity duration-300">
                                <h3 className="text-white text-3xl font-black mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">Branding y marca</h3>
                                <p className="text-gray-300 text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 font-medium">Identidad visual y diseño</p>
                            </div>
                        </div>

                        {/* Produccion Audiovisual (Video) */}
                        <div className="group relative overflow-hidden rounded-3xl aspect-[4/5] bg-gray-900 shadow-xl cursor-default">
                            <video
                                src="/videos/motion.webm"
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#111]/90 via-[#111]/30 to-transparent flex flex-col justify-end p-8 transition-opacity duration-300">
                                <h3 className="text-white text-3xl font-black mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">Producción Audiovisual</h3>
                                <p className="text-gray-300 text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 font-medium">Contenido dinámico en movimiento</p>
                            </div>
                        </div>

                        {/* Estrategias */}
                        <div className="group relative overflow-hidden rounded-3xl aspect-[4/5] bg-gray-200 shadow-xl cursor-default">
                            <img
                                src="/portfolio-webs-pdf/vsl-webs.png"
                                alt="Estrategias de Marketing"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#111]/90 via-[#111]/30 to-transparent flex flex-col justify-end p-8 transition-opacity duration-300">
                                <h3 className="text-white text-3xl font-black mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">Estrategias de Marketing</h3>
                                <p className="text-gray-300 text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 font-medium">Sistemas y funnels de ventas</p>
                            </div>
                        </div>
                    </div>
                </SlideContent>
            )
        },
        // Slide 4: Metodología
        {
            id: 'methodology',
            title: 'Nuestra Metodología',
            content: (
                <SlideContent>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 w-full max-w-6xl">
                        {[
                            { step: '01', title: 'Auditoría', desc: 'Análisis de tu estado actual y definición de objetivos comerciales.' },
                            { step: '02', title: 'Estrategia', desc: 'Diseño del embudo de adquisición y guiones creativos.' },
                            { step: '03', title: 'Producción', desc: 'Grabación y edición de piezas audiovisuales de alto impacto.' },
                            { step: '04', title: 'Distribución', desc: 'Despliegue de campañas y optimización basada en datos reales.' }
                        ].map((s, i) => (
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.15 + 0.3 }}
                                key={s.step}
                                className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 relative overflow-hidden group hover:-translate-y-2 transition-transform duration-300"
                            >
                                <div className="text-8xl font-black text-gray-50 absolute -top-6 -right-6 group-hover:text-gray-100 transition-colors">{s.step}</div>
                                <h3 className="text-2xl font-black text-[#111] relative z-10 mb-4 mt-8">{s.title}</h3>
                                <p className="text-gray-600 text-lg relative z-10 font-medium">{s.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </SlideContent>
            )
        },
        // Slide 5: Propuesta de valor
        {
            id: 'value',
            title: 'Nuestra Promesa',
            content: (
                <SlideContent>
                    <div className="space-y-12 max-w-5xl w-full text-center">
                        <h2 className="text-4xl md:text-5xl font-black text-[#111] leading-tight max-w-4xl mx-auto">
                            Transformamos la forma en que el mundo percibe tu marca.<br />
                            <span className="text-gray-400">Desde la idea hasta la ejecución final.</span>
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
                                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 text-3xl shadow-inner">👁️</div>
                                <h4 className="font-black text-2xl mb-3 text-[#111]">Identidad Sólida</h4>
                                <p className="text-gray-600 text-lg">Nos aseguramos que tu mensaje sea coherente y visualmente impactante en cada punto de contacto.</p>
                            </div>
                            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
                                <div className="w-16 h-16 bg-yellow-50 text-yellow-600 rounded-2xl flex items-center justify-center mb-6 text-3xl shadow-inner">⚙️</div>
                                <h4 className="font-black text-2xl mb-3 text-[#111]">Sistemas Integrados</h4>
                                <p className="text-gray-600 text-lg">Construimos activos digitales (webs, contenido, marca) que trabajan juntos como un ecosistema.</p>
                            </div>
                            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
                                <div className="w-16 h-16 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mb-6 text-3xl shadow-inner">🏆</div>
                                <h4 className="font-black text-2xl mb-3 text-[#111]">Calidad Premium</h4>
                                <p className="text-gray-600 text-lg">Eleva tu posicionamiento con una producción audiovisual de talla profesional e internacional.</p>
                            </div>
                        </div>
                    </div>
                </SlideContent>
            )
        },
        // Slide 6: El proceso de trabajo / Onboarding (Mi añadido)
        {
            id: 'process-detail',
            title: 'Siguientes Pasos',
            content: (
                <SlideContent>
                    <div className="w-full max-w-4xl flex flex-col items-center justify-center">
                        <div className="bg-white border text-left border-gray-100 shadow-xl rounded-3xl p-10 md:p-14 w-full relative overflow-hidden">
                            <div className="absolute -right-20 -bottom-20 opacity-5 w-64 h-64 bg-[#111] rounded-full"></div>

                            <h3 className="text-3xl font-black mb-10 text-[#111] border-b pb-6 border-gray-100">¿Cómo trabajamos una vez que decimos "SÍ"?</h3>

                            <ul className="space-y-8 relative z-10">
                                <li className="flex gap-6 items-start">
                                    <div className="w-12 h-12 shrink-0 bg-[#111] text-white rounded-full flex items-center justify-center font-bold text-xl">1</div>
                                    <div>
                                        <h4 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 mb-2">Reunión de Kick-off</h4>
                                        <p className="text-gray-600 text-lg">Nos sentamos (virtual o presencialmente) para alinear expectativas, revisar accesos y configurar tu espacio de trabajo colaborativo.</p>
                                    </div>
                                </li>
                                <li className="flex gap-6 items-start">
                                    <div className="w-12 h-12 shrink-0 bg-[#111] text-white rounded-full flex items-center justify-center font-bold text-xl">2</div>
                                    <div>
                                        <h4 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 mb-2">Primera entrega rápida</h4>
                                        <p className="text-gray-600 text-lg">Definimos un "Quick Win" comercial que genere inercia en la primera semana mientras construimos los sistemas más grandes.</p>
                                    </div>
                                </li>
                                <li className="flex gap-6 items-start">
                                    <div className="w-12 h-12 shrink-0 bg-[#111] text-white rounded-full flex items-center justify-center font-bold text-xl">3</div>
                                    <div>
                                        <h4 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 mb-2">Ecosistema Activo</h4>
                                        <p className="text-gray-600 text-lg">Nos integramos a tus comunicaciones y empezamos el flujo de marketing continuo como tus aliados creativos.</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </SlideContent>
            )
        },
        // Slide 7: CTA
        {
            id: 'cta',
            content: (
                <SlideContent>
                    <div className="bg-[#111] text-white p-16 md:p-24 rounded-[3rem] shadow-2xl text-center max-w-4xl w-full relative overflow-hidden">
                        {/* Decorative background circle */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white opacity-5 rounded-full blur-3xl pointer-events-none"></div>

                        <div className="relative z-10">
                            <h2 className="text-5xl md:text-6xl font-black mb-8 leading-tight">¿Comenzamos a trabajar en tu marketing?</h2>
                            <p className="text-2xl text-gray-300 mb-12 max-w-2xl mx-auto font-medium">
                                Hagamos una auditoría de tu forma de adquirir clientes y diseñemos un plan para potenciarlo.
                            </p>
                            <div className="flex flex-col justify-center">
                                <a href="/contacto" className="inline-block px-10 py-5 bg-white text-[#111] text-xl font-black rounded-full hover:bg-gray-100 hover:scale-105 transition-all shadow-[0_0_40px_rgba(255,255,255,0.3)]">
                                    ¡Hablemos Ahora!
                                </a>
                            </div>
                        </div>
                    </div>
                </SlideContent>
            )
        }
    ];

    const handleNext = useCallback(() => {
        if (currentSlide < slides.length - 1) {
            setCurrentSlide(prev => prev + 1);
        }
    }, [currentSlide, slides.length]);

    const handlePrev = useCallback(() => {
        if (currentSlide > 0) {
            setCurrentSlide(prev => prev - 1);
        }
    }, [currentSlide]);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'Enter') {
                handleNext();
            } else if (e.key === 'ArrowLeft') {
                handlePrev();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleNext, handlePrev]);

    const toggleFullscreen = () => {
        // Early return for environments where document.documentElement might not be available (e.g., during tests)
        if (typeof document === 'undefined' || !document.documentElement) {
            console.warn('Fullscreen API not available in this environment.');
            return;
        }

        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                console.log(`Error attempting to enable fullscreen: ${err.message}`);
            });
            setIsFullscreen(true);
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
                setIsFullscreen(false);
            }
        }
    };

    return (
        <div className="absolute inset-0 bg-[#f8f9fa] z-50 flex flex-col font-sans overflow-hidden min-h-screen w-screen m-0 p-0">
            {/* Header / Controls */}
            <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-50 pointer-events-none">
                <div className="font-black text-xl tracking-tighter text-[#111] pointer-events-auto">GVL.</div>

                <div className="flex items-center gap-4 bg-white/50 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-gray-200/50 pointer-events-auto">
                    <span className="text-sm font-bold text-gray-400 mr-2">
                        {currentSlide + 1} / {slides.length}
                    </span>
                    <button
                        onClick={handlePrev}
                        disabled={currentSlide === 0}
                        className={`p-2 rounded-full transition-colors ${currentSlide === 0 ? 'text-gray-300' : 'text-[#111] hover:bg-gray-200'}`}
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <button
                        onClick={handleNext}
                        disabled={currentSlide === slides.length - 1}
                        className={`p-2 rounded-full transition-colors ${currentSlide === slides.length - 1 ? 'text-gray-300' : 'text-[#111] hover:bg-gray-200'}`}
                    >
                        <ChevronRight size={24} />
                    </button>
                    <div className="w-px h-6 bg-gray-300 mx-2"></div>
                    <button onClick={toggleFullscreen} className="p-2 text-gray-500 hover:text-[#111] rounded-full hover:bg-gray-200 transition-colors">
                        <Maximize size={20} />
                    </button>
                </div>
            </div>

            {/* Slide Content */}
            <div className="flex-grow flex items-center justify-center relative bg-white mt-20 rounded-t-[3rem] shadow-2xl overflow-hidden mx-4 md:mx-12 mb-4 border border-gray-100 pb-8">
                <div className="w-full h-full flex items-center justify-center">
                    {slides[currentSlide].content}
                </div>
            </div>

            {/* Progress Bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gray-200 z-50">
                <motion.div
                    className="h-full bg-[#111]"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
                    transition={{ duration: 0.3 }}
                />
            </div>
        </div>
    );
};

export default Presentation;
