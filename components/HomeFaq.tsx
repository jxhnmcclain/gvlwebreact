import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const faqData = [
    {
        question: "¿Qué servicios ofrece Growth Video Lab?",
        answer: "Nos especializamos en producción de contenido audiovisual (Reels, High-End Content), diseño de sitios web de alto impacto, branding y asesoría estratégica de marketing para empresas en Chile."
    },
    {
        question: "¿Cómo es el proceso de trabajo?",
        answer: "Iniciamos con una fase de diagnóstico y estrategia, luego pasamos a la pre-producción (guiones, diseño), ejecución (rodaje, desarrollo web) y finalmente la entrega optimizada para resultados."
    },
    {
        question: "¿Tienen planes mensuales de contenido?",
        answer: "Sí, ofrecemos planes de 'Content Machine' diseñados para marcas que necesitan presencia constante y de alta calidad en redes sociales sin preocuparse por la parte técnica."
    },
    {
        question: "¿Cuánto tiempo toma entregar un proyecto web?",
        answer: "Una Landing Page puede estar lista en 1-2 semanas, mientras que proyectos más complejos como E-commerce o sitios corporativos suelen tomar de 4 a 6 semanas."
    },
    {
        question: "¿Los videos están optimizados para redes sociales?",
        answer: "Totalmente. Creamos contenido nativo para cada plataforma (Instagram, TikTok, LinkedIn) asegurando que el formato, el ritmo y el mensaje sean los correctos para captar la atención."
    }
];

const FaqItem = ({ question, answer }: { question: string, answer: string }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-black/10">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full py-6 flex justify-between items-center text-left group"
            >
                <span className="text-xl md:text-2xl font-bold group-hover:text-gvl-orange transition-colors">
                    {question}
                </span>
                <div className={`p-2 rounded-full border border-black/10 transition-all duration-300 ${isOpen ? 'bg-black text-white' : 'bg-transparent'}`}>
                    {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                </div>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        <div className="overflow-hidden">
                            <p className="pb-6 text-gray-600 text-lg leading-relaxed font-light">
                                {answer}
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const HomeFaq = () => {
    return (
        <section className="py-24 px-4 bg-white">
            <div className="max-w-4xl mx-auto">
                <div className="mb-16">
                    <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">
                        Preguntas <span className="text-stroke-black text-transparent" style={{ WebkitTextStroke: '1px black' }}>Frecuentes</span>
                    </h2>
                    <p className="text-xl text-gray-500 font-light">Despeja tus dudas y empecemos a escalar tu marca.</p>
                </div>
                <div className="flex flex-col">
                    {faqData.map((item, index) => (
                        <FaqItem key={index} question={item.question} answer={item.answer} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HomeFaq;
