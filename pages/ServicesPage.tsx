import React, { useLayoutEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Check, CheckCircle, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import CtaBanner from '../components/CtaBanner';
import FAQ from '../components/FAQ';
import { useNavigate } from 'react-router-dom';
import { N8N_WEBHOOKS } from '../lib/config';
import TurnstileWidget from '../components/TurnstileWidget';
import { Helmet } from 'react-helmet-async';

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

const ServiceHeroItem = ({ title, path, index }: { title: string; path: string; index: number }) => {
    const navigate = useNavigate();
    return (
        <div
            onClick={() => navigate(path)}
            className="group cursor-pointer bg-white border border-black rounded-2xl p-6 hover:shadow-lg transition-all hover:scale-[1.02] flex items-center justify-between"
        >
            <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-gvl-yellow border border-black flex items-center justify-center font-bold text-sm">
                    0{index}
                </div>
                <h3 className="font-bold text-lg uppercase leading-tight group-hover:text-gvl-orange transition-colors">{title}</h3>
            </div>
            <ArrowRight size={20} className="transform -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
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
            title: "Redes Sociales & Community",
            path: "/reels"
        },
        {
            title: "Producción Audiovisual",
            path: "/contenido"
        },
        {
            title: "Desarrollo Web & UI/UX",
            path: "/websites"
        },
        {
            title: "Branding & Identidad",
            path: "/branding"
        }
    ];

    return (
        <div ref={container} className="pt-32 min-h-screen bg-gvl-cream">
            <Helmet>
                <title>Servicios de Marketing Digital y Producción | Growth Video Lab</title>
                <meta name="description" content="Agencia creativa en Santiago de Chile. Ofrecemos producción audiovisual, branding, diseño web y gestión de redes sociales para impulsar tu marca." />
                <meta name="keywords" content="agencia digital, diseño web chile, producción video, branding corporativo, marketing redes sociales santiago" />
            </Helmet>

            {/* Split Hero Section */}
            <section className="px-4 md:px-12 mb-24 md:mb-32">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-24">

                    {/* Left Column: Content & Services List */}
                    <div className="lg:w-1/2 flex flex-col justify-center">
                        <div className="form-anim mb-8 md:mb-12">
                            <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-black uppercase tracking-tighter mb-6 leading-[0.9]">
                                Hagamos <motion.span className="text-gvl-orange">
                                    <TextSplit>algo lindo</TextSplit>
                                </motion.span> juntos
                            </h1>
                            <p className="text-xl text-gray-600 max-w-lg leading-relaxed">
                                Tienes una visión. Nosotros tenemos las herramientas, la creatividad y la estrategia para hacerla realidad. Elige cómo podemos ayudarte:
                            </p>
                        </div>

                        {/* Services Quick Grid */}
                        <div className="form-anim grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
                            {services.map((s, idx) => (
                                <ServiceHeroItem key={idx} title={s.title} path={s.path} index={idx + 1} />
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Sticky Form */}
                    <div className="lg:w-1/2">
                        <div className="form-anim sticky top-32 bg-white border-2 border-black rounded-[2.5rem] p-8 md:p-10 shadow-[8px_8px_0px_0px_rgba(17,17,17,1)] relative overflow-hidden z-20">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-gvl-yellow rounded-bl-full -mr-8 -mt-8 z-0 pointer-events-none"></div>

                            {status === 'success' ? (
                                <div className="relative z-10 text-center py-12">
                                    <div className="flex justify-center mb-6">
                                        <CheckCircle size={80} className="text-gvl-green" />
                                    </div>
                                    <h2 className="text-3xl font-black uppercase mb-4">¡Mensaje Recibido!</h2>
                                    <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                                        Gracias por confiar en nosotros. Revisaremos tu proyecto y te contactaremos en menos de 24 horas.
                                    </p>
                                    <button
                                        onClick={() => setStatus('idle')}
                                        className="bg-black text-white px-8 py-3 rounded-full font-bold hover:bg-gvl-yellow hover:text-black transition-all"
                                    >
                                        Enviar otro
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="relative z-10 flex flex-col gap-5">
                                    <h3 className="text-2xl font-bold uppercase mb-2">Cuéntanos tu proyecto</h3>

                                    <div className="space-y-1">
                                        <label className="text-xs font-bold uppercase tracking-wider ml-2">Nombre</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Tu nombre completo"
                                            className={`w-full bg-gvl-cream border ${errors.name ? 'border-red-500' : 'border-black'} rounded-xl px-5 py-3 focus:ring-1 focus:ring-black outline-none transition-all placeholder:text-gray-400`}
                                        />
                                        {errors.name && <span className="text-red-500 text-[10px] ml-2 block">{errors.name}</span>}
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-xs font-bold uppercase tracking-wider ml-2">Correo</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="nombre@empresa.com"
                                            className={`w-full bg-gvl-cream border ${errors.email ? 'border-red-500' : 'border-black'} rounded-xl px-5 py-3 focus:ring-1 focus:ring-black outline-none transition-all placeholder:text-gray-400`}
                                        />
                                        {errors.email && <span className="text-red-500 text-[10px] ml-2 block">{errors.email}</span>}
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-xs font-bold uppercase tracking-wider ml-2">Empresa / Proyecto</label>
                                        <input
                                            type="text"
                                            name="company"
                                            value={formData.company}
                                            onChange={handleChange}
                                            placeholder="Nombre de tu marca"
                                            className={`w-full bg-gvl-cream border ${errors.company ? 'border-red-500' : 'border-black'} rounded-xl px-5 py-3 focus:ring-1 focus:ring-black outline-none transition-all placeholder:text-gray-400`}
                                        />
                                        {errors.company && <span className="text-red-500 text-[10px] ml-2 block">{errors.company}</span>}
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-xs font-bold uppercase tracking-wider ml-2">Mensaje (Opcional)</label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            rows={3}
                                            placeholder="Detalles breves..."
                                            className="w-full bg-gvl-cream border border-black rounded-xl px-5 py-3 focus:ring-1 focus:ring-black outline-none transition-all placeholder:text-gray-400 resize-none"
                                        ></textarea>
                                    </div>

                                    <div className={`transform scale-90 origin-left ${errors.turnstile ? 'p-1 border border-red-500 rounded' : ''}`}>
                                        <TurnstileWidget
                                            onVerify={(token) => {
                                                setTurnstileToken(token);
                                                setErrors(prev => ({ ...prev, turnstile: '' }));
                                            }}
                                        />
                                        {errors.turnstile && <p className="text-red-500 text-xs font-bold mt-1">{errors.turnstile}</p>}
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={status === 'submitting'}
                                        className="w-full bg-black text-white py-4 rounded-full font-bold uppercase tracking-wide hover:bg-gvl-yellow hover:text-black hover:scale-[1.02] transition-all shadow-md flex items-center justify-center gap-2 group disabled:opacity-70 disabled:hover:scale-100"
                                    >
                                        {status === 'submitting' ? 'Enviando...' : 'Enviar Solicitud'}
                                        <ArrowUpRight size={20} className="group-hover:rotate-45 transition-transform" />
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="px-4 md:px-12 mb-24">
                <div className="max-w-4xl mx-auto">
                    <FAQ />
                </div>
            </section>

            {/* SEO Text Section */}
            <section className="px-4 md:px-12 pb-24">
                <div className="max-w-6xl mx-auto py-16 border-t border-black/10">
                    <div className="grid md:grid-cols-2 gap-12">
                        <div>
                            <h3 className="text-2xl font-bold uppercase mb-4">Agencia Creativa en Santiago de Chile</h3>
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                Growth Video Lab se especializa en crear estrategias digitales que combinan <strong>diseño de alto impacto</strong>, <strong>desarrollo web optimizado</strong> y <strong>producción audiovisual de calidad cine</strong>. Entendemos que en 2026, la atención es la moneda más valiosa, y ayudamos a marcas valientes a capturarla.
                            </p>
                            <p className="text-gray-600 leading-relaxed">
                                Desde startups que buscan su primer MVP en la web hasta empresas consolidadas que necesitan refrescar su imagen corporativa, nuestro equipo multidisciplinario ofrece soluciones a medida que priorizan el ROI y la experiencia de usuario.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold uppercase mb-4">¿Por qué elegirnos?</h3>
                            <ul className="space-y-3 text-gray-600">
                                <li className="flex gap-3">
                                    <CheckCircle size={20} className="text-gvl-green flex-shrink-0 mt-1" />
                                    <span><strong>Enfoque Integral:</strong> Unificamos branding, web y contenido bajo una misma estrategia coherente.</span>
                                </li>
                                <li className="flex gap-3">
                                    <CheckCircle size={20} className="text-gvl-green flex-shrink-0 mt-1" />
                                    <span><strong>Velocidad y Calidad:</strong> Metodologías ágiles para entregar webs y campañas más rápido sin sacrificar detalles.</span>
                                </li>
                                <li className="flex gap-3">
                                    <CheckCircle size={20} className="text-gvl-green flex-shrink-0 mt-1" />
                                    <span><strong>Tecnología Moderna:</strong> Usamos React, Astro y herramientas de IA para optimizar procesos y resultados.</span>
                                </li>
                                <li className="flex gap-3">
                                    <CheckCircle size={20} className="text-gvl-green flex-shrink-0 mt-1" />
                                    <span><strong>Resultados Medibles:</strong> No solo hacemos cosas bonitas; hacemos cosas que venden y posicionan.</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <CtaBanner />
        </div>
    );
};

export default ServicesPage;