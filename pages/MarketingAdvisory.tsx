import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronDown, CheckCircle2 } from 'lucide-react';
import CtaBanner from '../components/CtaBanner';

const MarketingAdvisory = () => {
    return (
        <div className="min-h-screen bg-gvl-cream text-gvl-black font-sans selection:bg-gvl-orange selection:text-white">
            <Helmet>
                <title>Asesoría de Marketing y Negocio | Growth Video Lab</title>
                <meta
                    name="description"
                    content="Haz que el marketing vuelva a impulsar tu negocio. Asesoría estratégica para salir del caos y enfocar tus esfuerzos en ventas reales."
                />
                <link rel="canonical" href="https://growthvideolab.com/asesoria" />
            </Helmet>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-4 md:px-12 overflow-hidden">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center"
                    >
                        <p className="text-sm font-bold tracking-[0.2em] mb-6 uppercase text-gvl-dark-gray">
                            Asesoría de Marketing
                        </p>
                        <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-8 leading-[0.9]">
                            Haz que el marketing <br />
                            <span className="text-gvl-orange">vuelva a impulsar</span> <br />
                            tu negocio.
                        </h1>
                        <p className="text-xl md:text-3xl font-light mb-12 max-w-3xl mx-auto leading-relaxed">
                            Sin ruido. <br />
                            Sin pruebas a ciegas.
                        </p>
                        <div className="flex flex-col items-center gap-4">
                            <a
                                href="https://calendly.com/growthvideolab/30min" // Replace with actual booking link
                                target="_blank"
                                rel="noreferrer"
                                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-black text-white rounded-full text-lg font-bold uppercase tracking-widest hover:bg-gvl-orange transition-all duration-300 transform hover:scale-105"
                            >
                                Reservar una reunión
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </a>
                            <motion.div
                                animate={{ y: [0, 10, 0] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                className="mt-12"
                            >
                                <ArrowRight className="rotate-90 text-gvl-black opacity-50" size={32} />
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Problem / Agitation Section */}
            <section className="py-24 bg-black text-white px-4 md:px-12">
                <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8 text-gvl-yellow">
                            Del caos <br /> a la claridad.
                        </h2>
                        <div className="space-y-6 text-lg md:text-xl font-light text-gray-300">
                            <p>Las campañas lanzadas...</p>
                            <p>Las métricas bonitas...</p>
                            <p className="text-white font-bold">...pero las ventas estáticas.</p>
                        </div>
                    </div>
                    <div className="relative border-l-2 border-gvl-dark-gray pl-8 py-4">
                        <p className="text-2xl font-medium mb-6">
                            "¿Dónde está el problema?"
                        </p>
                        <p className="text-gray-400 leading-relaxed mb-6">
                            Y ahí estabas tú: mirando la pantalla, preguntándote por qué, a pesar de la inversión, el retorno no llega como debería.
                        </p>
                        <p className="text-gvl-orange font-bold uppercase tracking-widest text-sm">
                            Sí, nosotros estuvimos allí.
                        </p>
                    </div>
                </div>
            </section>

            {/* Methodology Section - The "Solution" */}
            <section className="py-32 px-4 md:px-12 bg-gvl-cream">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-24">
                        <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter mb-6">
                            Lo simplificamos <span className="text-gvl-blue">juntos</span>.
                        </h2>
                        <p className="text-xl md:text-2xl font-light max-w-2xl mx-auto">
                            Te explico cómo. Lo verás en tres fases claras.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Phase 1 */}
                        <div className="bg-white p-8 rounded-3xl border-2 border-gvl-black shadow-[8px_8px_0px_0px_black] hover:translate-y-[-5px] transition-transform duration-300">
                            <div className="text-6xl font-black text-gvl-dark-gray opacity-20 mb-4">01</div>
                            <h3 className="text-2xl font-black uppercase mb-4">Diagnóstico</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Analizamos la situación real. Sin filtros. Entendemos dónde están las fugas de dinero y de atención.
                            </p>
                        </div>
                        {/* Phase 2 */}
                        <div className="bg-gvl-black text-white p-8 rounded-3xl border-2 border-gvl-black shadow-[8px_8px_0px_0px_#9CA3AF] relative transform md:-translate-y-8">
                            <div className="absolute -top-4 right-8 bg-gvl-orange text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                                Crucial
                            </div>
                            <div className="text-6xl font-black text-gvl-dark-gray opacity-40 mb-4">02</div>
                            <h3 className="text-2xl font-black uppercase mb-4 text-gvl-yellow">Foco</h3>
                            <p className="text-gray-300 leading-relaxed">
                                Eliminamos el ruido. Decidimos qué NO hacer. Nos centramos en las palancas que realmente mueven la aguja.
                            </p>
                        </div>
                        {/* Phase 3 */}
                        <div className="bg-white p-8 rounded-3xl border-2 border-gvl-black shadow-[8px_8px_0px_0px_black] hover:translate-y-[-5px] transition-transform duration-300">
                            <div className="text-6xl font-black text-gvl-dark-gray opacity-20 mb-4">03</div>
                            <h3 className="text-2xl font-black uppercase mb-4">Tracción</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Ejecutamos con precisión. Medimos lo que importa. Escalamos lo que funciona.
                            </p>
                        </div>
                    </div>

                    <div className="mt-24 text-center">
                        <p className="text-2xl md:text-4xl font-black uppercase leading-tight mb-8">
                            Ahora ya medimos lo que importa. <br />
                            <span className="text-gvl-blue">Ya invertimos donde duele.</span> <br />
                            Ya no improvisamos.
                        </p>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-24 px-4 md:px-12 bg-white border-t-2 border-gvl-black">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-16 text-center">
                        Si todavía tienes <span className="text-gvl-orange">dudas</span>...
                    </h2>

                    <div className="space-y-4">
                        <FaqItem
                            question="¿Cuánto durará el proceso para ti?"
                            answer="Depende de la complejidad de tu negocio, pero nuestros sprints de consultoría suelen durar entre 4 y 12 semanas para ver cambios estructurales significativos."
                        />
                        <FaqItem
                            question="¿Necesitaré contratar más personas?"
                            answer="No necesariamente. A menudo, el problema es de procesos y foco, no de manos. Primero optimizamos lo que tienes."
                        />
                        <FaqItem
                            question="¿ROI real o solo éxitos iniciales?"
                            answer="Buscamos sostenibilidad. No nos interesan los 'hacks' que funcionan una semana. Construimos sistemas que perduran."
                        />
                        <FaqItem
                            question="¿Mi sector es rarísimo, funcionará?"
                            answer="Hemos acompañado a empresas en múltiples sectores. La metodología de Growth Video Lab se basa en principios fundamentales de negocio y psicología del consumidor, que son universales."
                        />
                        <FaqItem
                            question="¿Subvención disponible?"
                            answer="Consúltanos directamente en la llamada para ver si aplicas a algún programa de ayudas digitales vigente."
                        />
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="bg-gvl-blue text-white py-32 px-4 md:px-12 text-center relative overflow-hidden">
                <div className="relative z-10 max-w-4xl mx-auto">
                    <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter mb-8">
                        Tu empresa ya es <span className="text-gvl-yellow">buena</span>.
                    </h2>
                    <p className="text-xl md:text-2xl font-light mb-12 opacity-90">
                        Solo necesita que el mundo lo vea con la misma claridad que tú.
                    </p>
                    <a
                        href="https://calendly.com/growthvideolab/30min"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-3 px-10 py-5 bg-white text-gvl-black rounded-full text-xl font-bold uppercase tracking-widest hover:bg-gvl-yellow transition-all duration-300 transform hover:scale-105 shadow-xl"
                    >
                        Reserva una sesión gratuita
                        <ArrowRight size={24} />
                    </a>
                    <div className="mt-12 flex flex-col md:flex-row justify-center items-center gap-8 opacity-70">
                        <span className="flex items-center gap-2"><CheckCircle2 size={18} /> Sin compromiso</span>
                        <span className="flex items-center gap-2"><CheckCircle2 size={18} /> Diagnóstico inicial</span>
                        <span className="flex items-center gap-2"><CheckCircle2 size={18} /> Claridad directa</span>
                    </div>
                </div>
            </section>
        </div>
    );
};

const FaqItem = ({ question, answer }: { question: string, answer: string }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border border-gvl-black rounded-xl overflow-hidden bg-gvl-cream">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center p-6 text-left hover:bg-white transition-colors"
            >
                <span className="text-xl font-bold uppercase">{question}</span>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <ChevronDown size={24} />
                </motion.div>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="p-6 pt-0 border-t border-gray-200 text-lg text-gray-700 leading-relaxed bg-white">
                            {answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default MarketingAdvisory;
