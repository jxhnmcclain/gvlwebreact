import React, { useLayoutEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Check, CheckCircle, AlertCircle } from 'lucide-react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import CtaBanner from '../components/CtaBanner';
import { useNavigate } from 'react-router-dom';
import { N8N_WEBHOOKS } from '../lib/config';
import TurnstileWidget from '../components/TurnstileWidget';

interface ServiceDetailCardProps {
    title: string;
    description: string;
    features: string[];
    index: number;
    path: string;
}

const TextSplit = ({ children }: { children: string }) => {
    return (
        <span className="inline-block overflow-hidden align-bottom">
            {children.split("").map((char, i) => (
                <span key={i} className="char-anim inline-block will-change-transform">
                    {char === " " ? "\u00A0" : char}
                </span>
            ))}
        </span>
    );
};

const ServiceDetailCard: React.FC<ServiceDetailCardProps> = ({ title, description, features, index, path }) => {
    const navigate = useNavigate();

    return (
        <div className="service-item bg-white border border-black rounded-[2rem] p-8 md:p-10 flex flex-col md:flex-row gap-8 hover:shadow-lg transition-shadow duration-300">
            <div className="md:w-1/3 flex flex-col justify-between">
                <div>
                    <div className="w-12 h-12 bg-gvl-yellow border border-black rounded-full flex items-center justify-center font-bold text-xl mb-4">
                        0{index}
                    </div>
                    <h3 className="text-3xl font-black uppercase tracking-tight leading-none mb-6">{title}</h3>
                </div>

                <button
                    onClick={() => navigate(path)}
                    className="hidden md:flex w-full bg-black text-gvl-yellow py-3 rounded-full font-bold items-center justify-center gap-2 hover:bg-gvl-yellow hover:text-black border border-black transition-colors"
                >
                    Ver detalles <ArrowUpRight size={18} />
                </button>
            </div>
            <div className="md:w-2/3 flex flex-col justify-between">
                <div>
                    <p className="text-lg text-gray-700 mb-6 leading-relaxed border-l-2 border-gvl-yellow pl-4">
                        {description}
                    </p>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
                        {features.map((feature, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-sm font-medium">
                                <Check size={16} className="text-gvl-green" />
                                {feature}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Mobile Button */}
                <button
                    onClick={() => navigate(path)}
                    className="md:hidden w-full bg-black text-gvl-yellow py-3 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-gvl-yellow hover:text-black border border-black transition-colors"
                >
                    Ver detalles <ArrowUpRight size={18} />
                </button>
            </div>
        </div>
    );
};

const ServicesPage = () => {
    const container = useRef(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        message: ''
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".form-anim", {
                y: 50,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
                stagger: 0.1
            });

            gsap.from(".char-anim", {
                y: 100,
                opacity: 0,
                rotateZ: 5,
                duration: 1,
                ease: "power4.out",
                stagger: 0.05
            });

            // Use batch to ensure items animate as they enter the viewport
            ScrollTrigger.batch(".service-item", {
                onEnter: (batch) => {
                    gsap.to(batch, {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        stagger: 0.15,
                        ease: "power3.out",
                        overwrite: true
                    });
                },
                start: "top 90%",
                once: true // Keep them visible once animated
            });

            // Set initial state for batch items
            gsap.set(".service-item", { y: 60, opacity: 0 });

        }, container);
        return () => ctx.revert();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.name.trim()) newErrors.name = 'El nombre es obligatorio';
        if (!formData.email.trim()) {
            newErrors.email = 'El correo es obligatorio';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Correo inválido';
        }
        if (!formData.company.trim()) newErrors.company = 'El nombre de tu empresa es obligatorio';

        if (!turnstileToken) {
            newErrors.turnstile = 'Por favor verifica que no eres un robot';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setStatus('submitting');

        try {
            const response = await fetch(N8N_WEBHOOKS.CONTACT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    turnstileToken,
                    source: 'services_page'
                })
            });

            if (response.ok) {
                setStatus('success');
            } else {
                throw new Error('Failed to submit');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setStatus('idle');
            alert('Hubo un error al enviar el formulario. Por favor intenta nuevamente.');
        }
    };

    const services = [
        {
            title: "Redes Sociales",
            description: "No solo publicamos, creamos una voz. Gestionamos tus redes con estrategia, diseño y copy que conectan con tu audiencia y cumplen objetivos comerciales.",
            features: ["Estrategia de contenidos", "Gestión de comunidad", "Diseño de parrilla mensual", "Copywriting persuasivo", "Reportes de rendimiento"],
            path: "/reels" // Using existing route logic, updated name
        },
        {
            title: "Producción Audiovisual",
            description: "Capturamos la atención en los primeros 3 segundos. Producción de alto nivel para comerciales, fotografía de producto y contenido vertical.",
            features: ["Guionización creativa", "Edición dinámica", "Grabación en locación", "Animación de textos", "Tendencias virales"],
            path: "/contenido" // Using existing route logic, updated name
        },
        {
            title: "Desarrollo Web & UI/UX",
            description: "Tu web es tu oficina digital 24/7. Diseñamos sitios rápidos, estéticos y optimizados para convertir visitantes en clientes.",
            features: ["Diseño UI/UX", "Desarrollo Full-stack", "Optimización SEO", "Integración de pagos", "Landing Pages de alta conversión"],
            path: "/websites"
        },
        {
            title: "Branding & Identidad",
            description: "Construimos marcas memorables. Desde el logotipo hasta el sistema visual completo, le damos personalidad a tu negocio.",
            features: ["Diseño de Logotipo", "Manual de marca", "Paleta de colores y tipografía", "Papelería corporativa", "Dirección de arte"],
            path: "/branding"
        }
    ];

    return (
        <div ref={container} className="pt-32 min-h-screen bg-gvl-cream">

            {/* Contact Form Section */}
            <section className="px-4 md:px-12 mb-24">
                <div className="max-w-5xl mx-auto">
                    <div className="form-anim text-center mb-12">
                        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6">
                            Hagamos <motion.span>
                                <TextSplit>algo lindo</TextSplit>
                            </motion.span>
                        </h1>
                        <p className="form-anim text-xl text-gray-600 max-w-2xl mx-auto">
                            Cuéntanos sobre tu proyecto. Ya sea que tengas una idea clara o solo un borrador, estamos aquí para ayudarte a construirla.
                        </p>
                    </div>

                    <div className="form-anim bg-white border-2 border-black rounded-[2.5rem] p-8 md:p-12 shadow-[12px_12px_0px_0px_rgba(17,17,17,1)] relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gvl-yellow rounded-bl-full -mr-16 -mt-16 z-0 pointer-events-none"></div>

                        {status === 'success' ? (
                            <div className="relative z-10 text-center py-12">
                                <div className="flex justify-center mb-6">
                                    <CheckCircle size={80} className="text-gvl-green" />
                                </div>
                                <h2 className="text-4xl font-black uppercase mb-4">¡Recibido!</h2>
                                <p className="text-xl text-gray-600 mb-8">
                                    Gracias por contactarnos. Revisaremos tu propuesta y te escribiremos muy pronto.
                                </p>
                                <button
                                    onClick={() => setStatus('idle')}
                                    className="bg-black text-white px-8 py-3 rounded-full font-bold hover:bg-gvl-yellow hover:text-black transition-all"
                                >
                                    Enviar otro mensaje
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold uppercase tracking-wider ml-2 flex justify-between">
                                        Nombre
                                        {errors.name && <span className="text-red-500 text-[10px] normal-case">{errors.name}</span>}
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Tu nombre"
                                        className={`w-full bg-gvl-cream border ${errors.name ? 'border-red-500' : 'border-black'} rounded-2xl px-6 py-4 focus:ring-2 focus:ring-black outline-none transition-all placeholder:text-gray-400`}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold uppercase tracking-wider ml-2 flex justify-between">
                                        Correo
                                        {errors.email && <span className="text-red-500 text-[10px] normal-case">{errors.email}</span>}
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="hola@tuempresa.com"
                                        className={`w-full bg-gvl-cream border ${errors.email ? 'border-red-500' : 'border-black'} rounded-2xl px-6 py-4 focus:ring-2 focus:ring-black outline-none transition-all placeholder:text-gray-400`}
                                    />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-sm font-bold uppercase tracking-wider ml-2 flex justify-between">
                                        Nombre de tu empresa
                                        {errors.company && <span className="text-red-500 text-[10px] normal-case">{errors.company}</span>}
                                    </label>
                                    <input
                                        type="text"
                                        name="company"
                                        value={formData.company}
                                        onChange={handleChange}
                                        placeholder="Nombre de tu proyecto o empresa"
                                        className={`w-full bg-gvl-cream border ${errors.company ? 'border-red-500' : 'border-black'} rounded-2xl px-6 py-4 focus:ring-2 focus:ring-black outline-none transition-all placeholder:text-gray-400`}
                                    />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-sm font-bold uppercase tracking-wider ml-2">Cuéntame tu idea <span className="text-gray-400 font-normal normal-case">(Opcional)</span></label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows={4}
                                        placeholder="¿Qué tienes en mente?"
                                        className="w-full bg-gvl-cream border border-black rounded-2xl px-6 py-4 focus:ring-2 focus:ring-black outline-none transition-all placeholder:text-gray-400 resize-none"
                                    ></textarea>
                                </div>

                                <div className="md:col-span-2 flex flex-col items-center gap-4">
                                    <div className={`scale-90 md:scale-100 ${errors.turnstile ? 'p-1 border-2 border-red-500 rounded-lg' : ''}`}>
                                        <TurnstileWidget
                                            onVerify={(token) => {
                                                setTurnstileToken(token);
                                                setErrors(prev => ({ ...prev, turnstile: '' }));
                                            }}
                                        />
                                    </div>
                                    {errors.turnstile && <p className="text-red-500 text-sm font-bold">{errors.turnstile}</p>}
                                </div>

                                <div className="md:col-span-2 flex justify-end mt-4">
                                    <button
                                        type="submit"
                                        disabled={status === 'submitting'}
                                        className="bg-black text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-gvl-yellow hover:text-black hover:border-black border border-transparent transition-all flex items-center gap-3 shadow-lg active:transform active:translate-y-1 active:shadow-none disabled:opacity-50"
                                    >
                                        {status === 'submitting' ? 'Enviando...' : 'Enviar Solicitud'}
                                        {status !== 'submitting' && <ArrowUpRight />}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </section>

            {/* Services List */}
            <section className="px-4 md:px-12 pb-24 services-list">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-4xl font-black mb-12 border-b-2 border-black pb-4 inline-block">Nuestros Servicios</h2>
                    <div className="grid gap-8">
                        {services.map((service, idx) => (
                            <ServiceDetailCard
                                key={idx}
                                index={idx + 1}
                                title={service.title}
                                description={service.description}
                                features={service.features}
                                path={service.path}
                            />
                        ))}
                    </div>
                </div>
            </section>

            <CtaBanner />
        </div>
    );
};

export default ServicesPage;