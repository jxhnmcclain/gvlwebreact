import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

type FAQItem = {
    question: string;
    answer: string;
};

const FAQData: FAQItem[] = [
    {
        question: "¿Cuánto cuesta una web B2B?",
        answer: "Depende de lo que necesitas, pero una landing page de presentación parte desde $390.000 CLP. Un sitio corporativo completo va desde $800.000. Si necesitas integrar automatizaciones o sistemas de outreach, lo cotizamos aparte. Sin letra chica."
    },
    {
        question: "¿Cuánto tiempo toma el proyecto?",
        answer: "Una landing page toma entre 5 y 7 días hábiles desde que apruebas el brief. Un sitio corporativo completo, entre 2 y 3 semanas. Definimos fechas concretas al inicio — no te quedo 'casi listo' para siempre."
    },
    {
        question: "¿Qué pasa si necesito cambios después de entregado?",
        answer: "Los primeros 30 días incluyen ajustes menores sin costo. Después, trabajamos con un plan de mantención mensual o por hora, según lo que te acomode. Tú decides."
    },
    {
        question: "¿El dominio y hosting quedan a mi nombre?",
        answer: "Sí, siempre. Te ayudamos a contratarlos a tu nombre desde el inicio. Cuando terminemos, tú tienes el acceso total — no dependes de nosotros para nada."
    },
    {
        question: "¿Hacen factura?",
        answer: "Sí. Emitimos boleta de honorarios o factura electrónica según corresponda. Todo formal."
    },
    {
        question: "¿En qué se diferencia GVL de contratar un freelancer suelto?",
        answer: "Que yo entrego sistemas, no solo archivos. Un freelancer te entrega la web. Yo te entrego la web + configuración de Google Search Console + meta tags + formulario conectado a tu correo + manual de uso básico. Y si necesitas más, ya sé cómo funciona todo tu stack."
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
