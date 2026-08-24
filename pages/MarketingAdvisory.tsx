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
                    content="Asesoría para revisar tu marketing, ordenar prioridades y definir qué acciones conviene ejecutar primero."
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
                            Ordena tu <br />
                            <span className="text-gvl-orange">marketing y ventas</span> <br />
                            antes de invertir más.
                        </h1>
                        <p className="text-xl md:text-3xl font-light mb-12 max-w-3xl mx-auto leading-relaxed">
                            Revisamos el proceso actual, definimos prioridades y dejamos un plan de trabajo.
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
                            Cuando el equipo no sabe <br /> qué hacer primero.
                        </h2>
                        <div className="space-y-6 text-lg md:text-xl font-light text-gray-300">
                            <p>Hay campañas activas.</p>
                            <p>Hay datos en distintas herramientas.</p>
                            <p className="text-white font-bold">Pero no hay una prioridad compartida.</p>
                        </div>
                    </div>
                    <div className="relative border-l-2 border-gvl-dark-gray pl-8 py-4">
                        <p className="text-2xl font-medium mb-6">
                            "¿Qué tenemos que corregir primero?"
                        </p>
                        <p className="text-gray-400 leading-relaxed mb-6">
                            Revisamos cómo entra un lead, qué pasa en el CRM, qué campañas están activas y dónde se detiene el proceso.
                        </p>
                        <p className="text-gvl-orange font-bold uppercase tracking-widest text-sm">
                            Empezamos por el proceso real.
                        </p>
                    </div>
                </div>
            </section>

            {/* Methodology Section - The "Solution" */}
            <section className="py-32 px-4 md:px-12 bg-gvl-cream">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-24">
                        <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter mb-6">
                            Un plan de trabajo <span className="text-gvl-blue">claro</span>.
                        </h2>
                        <p className="text-xl md:text-2xl font-light max-w-2xl mx-auto">
                            La asesoría se organiza en tres etapas.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Phase 1 */}
                        <div className="bg-white p-8 rounded-3xl border-2 border-gvl-black shadow-[8px_8px_0px_0px_black] hover:translate-y-[-5px] transition-transform duration-300">
                            <div className="text-6xl font-black text-gvl-dark-gray opacity-20 mb-4">01</div>
                            <h3 className="text-2xl font-black uppercase mb-4">Diagnóstico</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Revisamos campañas, datos, responsables y herramientas para entender cómo opera hoy el equipo.
                            </p>
                        </div>
                        {/* Phase 2 */}
                        <div className="bg-gvl-black text-white p-8 rounded-3xl border-2 border-gvl-black shadow-[8px_8px_0px_0px_#9CA3AF] relative transform md:-translate-y-8">
                            <div className="absolute -top-4 right-8 bg-gvl-orange text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                                Prioridad
                            </div>
                            <div className="text-6xl font-black text-gvl-dark-gray opacity-40 mb-4">02</div>
                            <h3 className="text-2xl font-black uppercase mb-4 text-gvl-yellow">Foco</h3>
                            <p className="text-gray-300 leading-relaxed">
                                Ordenamos los problemas por impacto, esfuerzo y urgencia. Definimos qué conviene hacer primero.
                            </p>
                        </div>
                        {/* Phase 3 */}
                        <div className="bg-white p-8 rounded-3xl border-2 border-gvl-black shadow-[8px_8px_0px_0px_black] hover:translate-y-[-5px] transition-transform duration-300">
                            <div className="text-6xl font-black text-gvl-dark-gray opacity-20 mb-4">03</div>
                            <h3 className="text-2xl font-black uppercase mb-4">Plan de ejecución</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Recibes acciones, responsables y métricas para que el equipo pueda ejecutar y revisar avances.
                            </p>
                        </div>
                    </div>

                    <div className="mt-24 text-center">
                        <p className="text-2xl md:text-4xl font-black uppercase leading-tight mb-8">
                            Al terminar, sabes qué está pasando, <br />
                            <span className="text-gvl-blue">qué hacer primero</span> <br />
                            y qué información falta.
                        </p>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-24 px-4 md:px-12 bg-white border-t-2 border-gvl-black">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-16 text-center">
                        Preguntas <span className="text-gvl-orange">frecuentes</span>
                    </h2>

                    <div className="space-y-4">
                        <FaqItem
                            question="¿Cuánto dura la asesoría?"
                            answer="Depende del alcance. Definimos duración, participantes y entregables antes de empezar."
                        />
                        <FaqItem
                            question="¿Necesitaré contratar más personas?"
                            answer="No necesariamente. Primero revisamos los procesos y herramientas que ya tiene el equipo."
                        />
                        <FaqItem
                            question="¿Qué recibo al terminar?"
                            answer="Un diagnóstico del proceso actual, prioridades acordadas y un plan de ejecución por etapas."
                        />
                        <FaqItem
                            question="¿Sirve si mi empresa trabaja en un sector específico?"
                            answer="La primera reunión sirve para entender el negocio, confirmar el alcance y definir si la asesoría es adecuada."
                        />
                        <FaqItem
                            question="¿Cómo empezamos?"
                            answer="Agenda una reunión. Revisamos el contexto y proponemos los siguientes pasos."
                        />
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="bg-gvl-blue text-white py-32 px-4 md:px-12 text-center relative overflow-hidden">
                <div className="relative z-10 max-w-4xl mx-auto">
                    <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter mb-8">
                        Revisa tu proceso <span className="text-gvl-yellow">antes de escalarlo</span>.
                    </h2>
                    <p className="text-xl md:text-2xl font-light mb-12 opacity-90">
                        Una conversación inicial permite definir si el problema necesita asesoría, ejecución o ambas cosas.
                    </p>
                    <a
                        href="https://calendly.com/growthvideolab/30min"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-3 px-10 py-5 bg-white text-gvl-black rounded-full text-xl font-bold uppercase tracking-widest hover:bg-gvl-yellow transition-all duration-300 transform hover:scale-105 shadow-xl"
                    >
                        Agenda una reunión
                        <ArrowRight size={24} />
                    </a>
                    <div className="mt-12 flex flex-col md:flex-row justify-center items-center gap-8 opacity-70">
                        <span className="flex items-center gap-2"><CheckCircle2 size={18} /> Revisión inicial</span>
                        <span className="flex items-center gap-2"><CheckCircle2 size={18} /> Alcance definido</span>
                        <span className="flex items-center gap-2"><CheckCircle2 size={18} /> Próximos pasos</span>
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
