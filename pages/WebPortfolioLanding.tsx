import React, { useLayoutEffect, useRef, useState } from 'react';
import { ArrowUpRight, Check, X, Palette, Camera, Laptop, Bot, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { N8N_WEBHOOKS } from '../lib/config';
import TurnstileWidget from '../components/TurnstileWidget';

const WebPortfolioLanding = () => {
    const navigate = useNavigate();
    const containerRef = useRef<HTMLDivElement>(null);
    const packagesRef = useRef<HTMLDivElement>(null);
    const [formState, setFormState] = useState({
        name: '',
        contact: '',
        instagram: '',
        currentWeb: 'No tengo',
        package: 'No estoy seguro'

    });
    const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Hero animations
            gsap.from(".hero-content-left", {
                x: -50,
                opacity: 0,
                duration: 1,
                ease: "power3.out"
            });
            gsap.from(".hero-form", {
                x: 50,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
                delay: 0.3
            });

            // Problem section animations
            gsap.from(".problem-text", {
                y: 50,
                opacity: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: ".problem-section",
                    start: "top 70%"
                }
            });

            // Pillars animation removed to fix visibility issue
            // Hover animations are handled via CSS classes


            // Packages animation
            gsap.from(".package-card", {
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                scrollTrigger: {
                    trigger: ".packages-section",
                    start: "top 80%"
                }
            });

        }, containerRef);
        return () => ctx.revert();
    }, []);

    const scrollToPackages = () => {
        packagesRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleContact = () => {
        navigate('/contacto');
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await fetch(N8N_WEBHOOKS.WEB_PORTFOLIO, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },

                body: JSON.stringify({ ...formState, turnstileToken })
            });
        } catch (error) {
            console.error('Error sending form:', error);
        }

        console.log("Form POSTed to n8n:", formState);
        alert("¡Gracias! Te contactaremos pronto.");
    };

    return (
        <div ref={containerRef} className="min-h-screen bg-gvl-cream text-gvl-black font-sans selection:bg-gvl-yellow selection:text-black">

            {/* HERO SECTION */}
            <section className="relative pt-32 pb-20 px-6 md:px-12 min-h-[90vh] flex flex-col md:flex-row items-center gap-12 max-w-7xl mx-auto">
                {/* Left Content */}
                <div className="hero-content-left flex-1 text-center md:text-left z-10">
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] mb-6">
                        Tu marca merece más que un link en bio
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-xl font-medium">
                        Web portafolio + branding + automatización. Todo para que tu audiencia te encuentre donde realmente importa.
                    </p>
                    <button
                        onClick={scrollToPackages}
                        className="bg-black text-white px-8 py-4 rounded-full text-base font-bold inline-flex items-center gap-2 hover:bg-gvl-blue transition-colors group mb-8 md:mb-0"
                    >
                        Ver paquetes
                        <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </button>
                </div>

                {/* Right Form */}
                <div className="hero-form w-full md:w-[450px] bg-white border-2 border-black rounded-[2rem] p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative z-20">
                    <div className="absolute top-0 left-0 w-full h-3 bg-gvl-yellow rounded-t-[1.8rem]"></div>
                    <h3 className="text-2xl font-black mb-1 mt-2">Empieza ahora</h3>
                    <p className="text-sm text-gray-500 mb-6">Completa tus datos y te contactamos hoy.</p>

                    <form onSubmit={handleFormSubmit} className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold uppercase mb-1">Nombre</label>
                            <input
                                required
                                type="text"
                                placeholder="Tu nombre o marca"
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 outline-none focus:border-black transition-colors"
                                value={formState.name}
                                onChange={e => setFormState({ ...formState, name: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase mb-1">Email / WhatsApp</label>
                            <input
                                required
                                type="text"
                                placeholder="Contacto directo"
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 outline-none focus:border-black transition-colors"
                                value={formState.contact}
                                onChange={e => setFormState({ ...formState, contact: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase mb-1">Instagram</label>
                            <input
                                required
                                type="text"
                                placeholder="@usuario"
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 outline-none focus:border-black transition-colors"
                                value={formState.instagram}
                                onChange={e => setFormState({ ...formState, instagram: e.target.value })}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold uppercase mb-1">Sitio Web</label>
                                <select
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 outline-none focus:border-black text-sm"
                                    value={formState.currentWeb}
                                    onChange={e => setFormState({ ...formState, currentWeb: e.target.value })}
                                >
                                    <option value="No tengo">No tengo</option>
                                    <option value="Tengo, renovar">Tengo, renovar</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase mb-1">Interés</label>
                                <select
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 outline-none focus:border-black text-sm"
                                    value={formState.package}
                                    onChange={e => setFormState({ ...formState, package: e.target.value })}
                                >
                                    <option value="No estoy seguro">Ver opciones</option>
                                    <option value="Starter">Starter</option>
                                    <option value="Pro">Pro</option>
                                </select>
                            </div>
                        </div>

                        <div className="mt-4">
                            <TurnstileWidget onVerify={setTurnstileToken} />
                        </div>

                        <button type="submit" disabled={!turnstileToken} className="w-full bg-black text-white font-bold py-4 rounded-xl mt-4 hover:bg-gvl-blue transition-colors flex justify-center items-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed">
                            Solicitar Asesoría
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>
                </div>
            </section>

            {/* PROBLEM SECTION */}
            <section className="problem-section py-24 px-6 md:px-12 bg-white/50 border-y border-black/5">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="problem-text text-gvl-blue uppercase font-bold tracking-widest text-sm mb-6">El problema</h2>
                    <div className="problem-text space-y-8">
                        <p className="text-2xl md:text-4xl font-bold leading-tight">
                            Tienes 50k seguidores. Marcas te buscan. Pero cuando alguien hace clic en tu link... <span className="text-gray-400">¿qué encuentran?</span>
                        </p>
                        <p className="text-xl text-gray-600 leading-relaxed">
                            Un Linktree genérico con 10 links. Eso no es profesional. Tu audiencia te busca en Google. Encuentran tu Instagram, pero nada más. No hay una web donde puedan ver tu trabajo completo, entender qué haces, o contactarte para colaboraciones serias.
                        </p>
                        <p className="text-xl font-bold text-black border-l-4 border-gvl-yellow pl-6 py-2 text-left bg-white/80 inline-block w-full">
                            Necesitas un espacio digital que te haga ver como lo que eres: un profesional del contenido.
                        </p>
                    </div>
                </div>
            </section>

            {/* SOLUTION SECTION - 4 PILLARS */}
            <section className="py-24 px-6 md:px-12 bg-gvl-cream">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-black mb-16 text-center">Lo que incluye</h2>

                    <div className="pillars-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            {
                                title: "Marca visual",
                                desc: "Logo, paleta de colores, tipografías. Tu identidad clara y consistente.",
                                icon: <Palette size={40} strokeWidth={1.5} />
                            },
                            {
                                title: "Sesión de fotos",
                                desc: "Content profesional que sí convierte. No más selfies para tu portfolio.",
                                icon: <Camera size={40} strokeWidth={1.5} />
                            },
                            {
                                title: "Tu web",
                                desc: "Single page que cuenta tu historia. Tus mejores trabajos, colaboraciones, datos de contacto. Todo en un solo lugar.",
                                icon: <Laptop size={40} strokeWidth={1.5} />
                            },
                            {
                                title: "ManyChat",
                                desc: "Automatiza respuestas en Instagram. Captura leads, envía PDFs, responde DMs sin estar pegado al celular 24/7.",
                                icon: <Bot size={40} strokeWidth={1.5} />
                            }
                        ].map((pillar, i) => (
                            <div
                                key={i}
                                className={`pillar-card bg-white border border-black p-8 rounded-[2rem] transition-all duration-300
                                            hover:shadow-2xl hover:scale-110 hover:z-10
                                            ${i % 2 === 0 ? 'hover:rotate-2' : 'hover:-rotate-2'}`}
                            >
                                <div className="text-gvl-blue mb-6">{pillar.icon}</div>
                                <h3 className="text-xl font-bold mb-4">{pillar.title}</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">{pillar.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* PACKAGES SECTION */}
            <section ref={packagesRef} className="packages-section py-24 px-6 md:px-12 bg-black text-white">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-black mb-16 text-center text-white">Paquetes</h2>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">

                        {/* STARTER PACKAGE */}
                        <div className="package-card bg-[#1a1a1a] border border-gray-800 p-8 md:p-12 rounded-[2.5rem] flex flex-col relative overflow-hidden">
                            <h3 className="text-2xl font-bold mb-2">Starter</h3>
                            <div className="text-3xl font-black mb-6 text-gvl-yellow">$400.000 - $800.000 <span className="text-base font-normal text-gray-400">CLP</span></div>
                            <p className="text-gray-400 mb-8 pb-8 border-b border-gray-800 h-16">Ideal para empezar rápido con lo esencial</p>

                            <ul className="space-y-4 mb-12 flex-grow">
                                {[
                                    "Web single page básica",
                                    "Branding visual básico",
                                    "Setup ManyChat inicial",
                                    "1 ronda de cambios"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <div className="bg-white/10 p-1 rounded-full text-gvl-yellow mt-0.5"><Check size={12} /></div>
                                        <span className="text-gray-300 text-sm">{item}</span>
                                    </li>
                                ))}
                            </ul>

                            <button onClick={handleContact} className="w-full bg-transparent border border-white text-white py-4 rounded-full font-bold hover:bg-white hover:text-black transition-colors">
                                Agendar llamada
                            </button>
                        </div>

                        {/* PRO PACKAGE */}
                        <div className="package-card bg-white text-black border border-white p-8 md:p-12 rounded-[2.5rem] flex flex-col relative overflow-hidden transform md:-translate-y-4 shadow-[0_0_40px_rgba(255,255,255,0.1)]">
                            <div className="absolute top-0 right-0 bg-gvl-blue text-white text-xs font-bold px-4 py-2 rounded-bl-xl">MÁS POPULAR</div>
                            <h3 className="text-2xl font-bold mb-2">Pro</h3>
                            <div className="text-3xl font-black mb-6">Desde $1.000.000 <span className="text-base font-normal text-gray-500">CLP</span></div>
                            <p className="text-gray-600 mb-8 pb-8 border-b border-gray-200 h-16">Ideal para profesionalizar todo tu contenido</p>

                            <ul className="space-y-4 mb-12 flex-grow">
                                {[
                                    "Portafolio completo multipágina",
                                    "Branding avanzado",
                                    "Sesión de fotos profesional",
                                    "Automatización ManyChat avanzada",
                                    "3 rondas de cambios",
                                    "Hosting y dominio 1 año incluido"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <div className="bg-black text-white p-1 rounded-full mt-0.5"><Check size={12} /></div>
                                        <span className="text-black text-sm font-medium">{item}</span>
                                    </li>
                                ))}
                            </ul>

                            <button onClick={handleContact} className="w-full bg-black text-white py-4 rounded-full font-bold hover:bg-gvl-blue transition-colors">
                                Agendar llamada
                            </button>
                        </div>

                    </div>
                </div>
            </section>

            {/* FINAL CTA SECTION */}
            <section className="py-32 px-6 md:px-12 bg-gvl-yellow text-center">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight">¿Listo para tener tu espacio digital?</h2>
                    <p className="text-xl font-medium mb-10 max-w-xl mx-auto">
                        Agenda una llamada de 15 minutos. Sin compromiso. Hablamos de tu proyecto y vemos si tiene sentido trabajar juntos.
                    </p>
                    <div className="flex flex-col items-center gap-4">
                        <button
                            onClick={handleContact}
                            className="bg-black text-white text-lg px-10 py-5 rounded-full font-bold hover:scale-105 transition-transform shadow-xl"
                        >
                            Agendar llamada ahora
                        </button>
                        <p className="text-sm font-bold opacity-70">Respondemos en menos de 24 horas.</p>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default WebPortfolioLanding;
