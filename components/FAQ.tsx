import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

type FAQItem = {
    question: string;
    answer: string;
};

const FAQData: FAQItem[] = [
    {
        question: "¿Cómo es el proceso de pago?",
        answer: "Trabajamos con un esquema de 50% de anticipo para reservar tu lugar en nuestra agenda y comenzar el proyecto, y el 50% restante contra entrega final y satisfacción."
    },
    {
        question: "¿Cuánto tiempo toma desarrollar una web?",
        answer: "Dependiendo de la complejidad, una Landing Page toma de 1 a 2 semanas, mientras que un sitio corporativo completo puede tomar de 4 a 6 semanas. Siempre definimos un cronograma claro al inicio."
    },
    {
        question: "¿Incluyen el dominio y hosting?",
        answer: "Te asesoramos para contratar el mejor proveedor a tu nombre (para que tú seas el 100% dueño de tus activos), y nosotros nos encargamos de toda la configuración técnica."
    },
    {
        question: "¿Entregan archivos de video editables?",
        answer: "Entregamos los archivos finales renderizados en máxima calidad. Los archivos de proyecto (editables) tienen un costo adicional si los requieres para archivo."
    },
    {
        question: "¿Hacen facturas?",
        answer: "Sí, somos una agencia establecida en Chile. Todos nuestros servicios incluyen factura o boleta de honorarios según corresponda."
    }
];

const AccordionItem = ({ item, isOpen, onClick }: { item: FAQItem; isOpen: boolean; onClick: () => void }) => {
    return (
        <div className="border-b border-black last:border-0">
            <button
                onClick={onClick}
                className="w-full py-6 flex items-center justify-between text-left group hover:bg-black/5 transition-colors px-4 rounded-lg"
            >
                <span className="text-xl font-bold uppercase pr-8 group-hover:text-gvl-orange transition-colors">{item.question}</span>
                <span className={`p-2 rounded-full border-2 border-black transition-colors ${isOpen ? 'bg-black text-white' : 'bg-transparent text-black'}`}>
                    {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                </span>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <div className="pb-6 px-4 text-gray-700 leading-relaxed text-lg">
                            {item.answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="bg-white border-2 border-black rounded-[2.5rem] p-8 md:p-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-4xl md:text-5xl font-black uppercase mb-12 tracking-tight">Preguntas Frecuentes</h2>
            <div className="flex flex-col">
                {FAQData.map((item, idx) => (
                    <AccordionItem
                        key={idx}
                        item={item}
                        isOpen={openIndex === idx}
                        onClick={() => setOpenIndex(prev => prev === idx ? null : idx)}
                    />
                ))}
            </div>
        </section>
    );
};

export default FAQ;
