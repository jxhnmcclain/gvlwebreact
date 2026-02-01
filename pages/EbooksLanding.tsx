import React, { useLayoutEffect, useRef, useState } from 'react';
import { FileText, Bot, Camera, User, Download, Check, ArrowRight, ArrowUpRight, Sparkles } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { N8N_WEBHOOKS } from '../lib/config';
import TurnstileWidget from '../components/TurnstileWidget';

import { getUTMParams } from '../lib/utm';

const EbooksLanding = () => {
    const navigate = useNavigate();
    const containerRef = useRef<HTMLDivElement>(null);
    const formRef = useRef<HTMLDivElement>(null);
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        instagram: ''
    });

    const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
    const [isSubmitted, setIsSubmitted] = useState(false);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".hero-content", {
                y: 30,
                opacity: 0,
                duration: 1,
                ease: "power3.out"
            });

            // GSAP animation for resources removed to ensure visibility
        }, containerRef);
        return () => ctx.revert();
    }, []);

    const scrollToForm = () => {
        formRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const utmParams = getUTMParams();

        try {
            await fetch(N8N_WEBHOOKS.EBOOKS, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formState, turnstileToken, ...utmParams })
            });
        } catch (error) {
            console.error('Error sending form:', error);
        }


        // Show success state regardless of actual API result for now
        setIsSubmitted(true);
        console.log("Form POSTed to n8n:", formState);
    };

    return (
        <div ref={containerRef} className="min-h-screen bg-gvl-cream text-black font-sans selection:bg-gvl-yellow selection:text-black">

            {/* SECTION 1 - HERO */}
            <section className="pt-40 pb-20 px-6 md:px-12 text-center max-w-5xl mx-auto hero-content">
                <div className="inline-block bg-gvl-yellow px-4 py-1 rounded-full font-bold text-sm mb-6 border border-black transform -rotate-2">
                    RECURSOS GRATUITOS
                </div>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] mb-6">
                    3 recursos que influencers chilenos usan <span className="text-gray-400 font-normal italic font-serif">(y tú no)</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto font-medium">
                    PDFs gratis para automatizar, crear mejor contenido y entender qué están haciendo bien otros creadores.
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <button
                        onClick={scrollToForm}
                        className="bg-black text-white px-8 py-4 rounded-full text-lg font-bold inline-flex items-center justify-center gap-2 hover:bg-gvl-blue transition-colors group shadow-lg"
                    >
                        <Download size={20} />
                        Descargar gratis
                    </button>
                </div>

                {/* Visual Mockups Row */}
                {/* Visual Mockups Row */}
                <div className="mt-12 flex justify-center items-center -space-x-12 md:-space-x-24 pb-10">
                    {/* PDF 1 */}
                    <div className="relative group transition-all duration-300 hover:z-50 hover:scale-110">
                        <img
                            src="https://placehold.co/400x560/EEE/31343C?text=PDF+1"
                            alt="Mockup PDF 1"
                            className="w-48 h-64 md:w-64 md:h-96 object-cover rounded-xl border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform -rotate-6 group-hover:rotate-0 transition-all duration-300"
                        />
                    </div>
                    {/* PDF 2 */}
                    <div className="relative group z-20 transition-all duration-300 hover:z-50 hover:scale-110">
                        <img
                            src="https://placehold.co/400x560/EEE/31343C?text=PDF+2"
                            alt="Mockup PDF 2"
                            className="w-52 h-72 md:w-72 md:h-[26rem] object-cover rounded-xl border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform -translate-y-4 group-hover:translate-y-0 transition-all duration-300"
                        />
                    </div>
                    {/* PDF 3 */}
                    <div className="relative group transition-all duration-300 hover:z-50 hover:scale-110">
                        <img
                            src="https://placehold.co/400x560/EEE/31343C?text=PDF+3"
                            alt="Mockup PDF 3"
                            className="w-48 h-64 md:w-64 md:h-96 object-cover rounded-xl border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform rotate-6 group-hover:rotate-0 transition-all duration-300"
                        />
                    </div>
                </div>
            </section>

            {/* SECTION 2 - PREVIEW DE LOS 3 PDFs */}
            <section className="resources-section py-24 px-6 md:px-12 bg-white border-y border-black">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                        {/* PDF 1 */}
                        <div className="resource-card bg-gvl-cream border border-black p-8 rounded-[2rem] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all">
                            <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center text-white mb-6">
                                <Bot size={32} />
                            </div>
                            <h3 className="text-2xl font-black mb-3">Guía de Automatización con ManyChat</h3>
                            <p className="text-gray-700 font-medium mb-6 leading-relaxed">
                                Cómo responder DMs, capturar leads y vender sin estar online 24/7. Incluye 5 flows que funcionan y templates listos para copiar.
                            </p>
                            <div className="bg-white rounded-xl p-6 border border-black/10">
                                <h4 className="font-bold text-sm uppercase text-gray-400 mb-3 tracking-wider">Qué incluye:</h4>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-2 text-sm font-bold">
                                        <Check size={16} className="mt-0.5 text-gvl-blue shrink-0" /> Comment automation paso a paso
                                    </li>
                                    <li className="flex items-start gap-2 text-sm font-bold">
                                        <Check size={16} className="mt-0.5 text-gvl-blue shrink-0" /> Lead magnet flows
                                    </li>
                                    <li className="flex items-start gap-2 text-sm font-bold">
                                        <Check size={16} className="mt-0.5 text-gvl-blue shrink-0" /> Segmentación con tags
                                    </li>
                                    <li className="flex items-start gap-2 text-sm font-bold">
                                        <Check size={16} className="mt-0.5 text-gvl-blue shrink-0" /> Templates que no suenan a robot
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* PDF 2 */}
                        <div className="resource-card bg-gvl-cream border border-black p-8 rounded-[2rem] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all">
                            <div className="w-16 h-16 bg-gvl-blue rounded-2xl flex items-center justify-center text-white mb-6">
                                <Sparkles size={32} />
                            </div>
                            <h3 className="text-2xl font-black mb-3">5 Prompts de Gemini para Fotos Lifestyle</h3>
                            <p className="text-gray-700 font-medium mb-6 leading-relaxed">
                                Genera fotos de IA que no se vean fake. Prompts testeados para contenido lifestyle real que sí sirve.
                            </p>
                            <div className="bg-white rounded-xl p-6 border border-black/10">
                                <h4 className="font-bold text-sm uppercase text-gray-400 mb-3 tracking-wider">Qué incluye:</h4>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-2 text-sm font-bold">
                                        <Check size={16} className="mt-0.5 text-gvl-blue shrink-0" /> Street lifestyle shots
                                    </li>
                                    <li className="flex items-start gap-2 text-sm font-bold">
                                        <Check size={16} className="mt-0.5 text-gvl-blue shrink-0" /> Café vibes aesthetic
                                    </li>
                                    <li className="flex items-start gap-2 text-sm font-bold">
                                        <Check size={16} className="mt-0.5 text-gvl-blue shrink-0" /> Urban content creator looks
                                    </li>
                                    <li className="flex items-start gap-2 text-sm font-bold">
                                        <Check size={16} className="mt-0.5 text-gvl-blue shrink-0" /> Nature/outdoor scenes
                                    </li>
                                    <li className="flex items-start gap-2 text-sm font-bold">
                                        <Check size={16} className="mt-0.5 text-gvl-blue shrink-0" /> Cozy home content
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* PDF 3 */}
                        <div className="resource-card bg-gvl-cream border border-black p-8 rounded-[2rem] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all">
                            <div className="w-16 h-16 bg-gvl-yellow rounded-2xl flex items-center justify-center text-black mb-6">
                                <User size={32} />
                            </div>
                            <h3 className="text-2xl font-black mb-3">Análisis de 5 Influencers Chilenos Alternativos</h3>
                            <p className="text-gray-700 font-medium mb-6 leading-relaxed">
                                Qué están haciendo bien @camilarecabarren, @luisandaur y otros para destacar. Estrategias que puedes aplicar tú.
                            </p>
                            <div className="bg-white rounded-xl p-6 border border-black/10">
                                <h4 className="font-bold text-sm uppercase text-gray-400 mb-3 tracking-wider">Qué incluye:</h4>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-2 text-sm font-bold">
                                        <Check size={16} className="mt-0.5 text-gvl-blue shrink-0" /> Análisis de nicho único
                                    </li>
                                    <li className="flex items-start gap-2 text-sm font-bold">
                                        <Check size={16} className="mt-0.5 text-gvl-blue shrink-0" /> Estrategias de monetización
                                    </li>
                                    <li className="flex items-start gap-2 text-sm font-bold">
                                        <Check size={16} className="mt-0.5 text-gvl-blue shrink-0" /> Qué hace diferente a cada uno
                                    </li>
                                    <li className="flex items-start gap-2 text-sm font-bold">
                                        <Check size={16} className="mt-0.5 text-gvl-blue shrink-0" /> Cómo aplicarlo a tu contenido
                                    </li>
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* SECTION 3 - FORMULARIO DE CAPTURA */}
            <section ref={formRef} className="py-24 px-6 md:px-12 bg-black text-white">
                <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-12 lg:gap-20">

                    <div className="flex-1 text-center md:text-left">
                        <h2 className="text-3xl md:text-5xl font-black mb-6">Recibe los 3 PDFs gratis</h2>
                        <p className="text-xl text-gray-400 leading-relaxed font-medium">
                            Los enviaremos a tu email en menos de 2 minutos. Sin spam, sin vender nada. Solo los PDFs.
                        </p>
                    </div>

                    <div className="w-full md:w-[450px]">
                        <div className="bg-white text-black p-8 rounded-[2rem] relative shadow-[8px_8px_0px_0px_#2a2a2a]">
                            <div className="absolute top-0 left-0 w-full h-3 bg-gvl-blue rounded-t-[1.8rem]"></div>

                            {!isSubmitted ? (
                                <form onSubmit={handleFormSubmit} className="space-y-4 mt-2">
                                    <div>
                                        <label htmlFor="name" className="block text-xs font-bold uppercase mb-1 ml-1">Nombre</label>
                                        <input
                                            id="name"
                                            name="name"
                                            required
                                            type="text"
                                            placeholder="Tu nombre"
                                            className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 outline-none focus:border-black focus:ring-1 focus:ring-black transition-all font-medium"
                                            value={formState.name}
                                            onChange={e => setFormState({ ...formState, name: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-xs font-bold uppercase mb-1 ml-1">Email</label>
                                        <input
                                            id="email"
                                            name="email"
                                            required
                                            type="email"
                                            placeholder="tu@email.com"
                                            className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 outline-none focus:border-black focus:ring-1 focus:ring-black transition-all font-medium"
                                            value={formState.email}
                                            onChange={e => setFormState({ ...formState, email: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="instagram" className="block text-xs font-bold uppercase mb-1 ml-1">Instagram <span className="text-gray-400 lowercase font-normal">(opcional)</span></label>
                                        <input
                                            id="instagram"
                                            name="instagram"
                                            type="text"
                                            placeholder="@tuusuario"
                                            className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 outline-none focus:border-black focus:ring-1 focus:ring-black transition-all font-medium"
                                            value={formState.instagram}
                                            onChange={e => setFormState({ ...formState, instagram: e.target.value })}
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <TurnstileWidget onVerify={setTurnstileToken} />
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={!turnstileToken}
                                        className="w-full bg-black text-white font-bold text-lg py-4 rounded-xl mt-2 hover:bg-gvl-yellow hover:text-black transition-all transform hover:-translate-y-1 shadow-md hover:shadow-lg flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Descargar los 3 PDFs
                                        <ArrowRight size={20} />
                                    </button>

                                    <p className="text-xs text-center text-gray-500 mt-4 leading-tight">
                                        Al descargar aceptas recibir emails ocasionales de GVL. Puedes desuscribirte cuando quieras.
                                    </p>
                                </form>
                            ) : (
                                <div className="py-12 text-center">
                                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Check size={32} strokeWidth={3} />
                                    </div>
                                    <h3 className="text-2xl font-black mb-2">¡Listo!</h3>
                                    <p className="text-gray-600 font-medium">
                                        Revisa tu correo. Los PDFs deberían llegar en cualquier momento.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </section>

            {/* SECTION 4 - POR QUÉ ESTOS PDFS */}
            <section className="py-24 px-6 md:px-12 bg-gvl-cream text-center">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl font-black mb-8">Por qué armamos esto</h2>

                    <div className="prose prose-lg mx-auto text-gray-800 font-medium leading-relaxed mb-12">
                        <p className="mb-6">
                            Vemos muchos influencers con contenido bueno pero sin herramientas para profesionalizarse. Automatización, IA, análisis de competencia... son cosas que todos deberían saber usar.
                        </p>
                        <p className="mb-6">
                            Estos PDFs son recursos reales que usamos con nuestros clientes. Los estamos regalando porque creemos que más creadores deberían tener acceso a esto.
                        </p>
                        <p>
                            Si después quieres una web profesional o ayuda con tu marca, hablamos. Pero primero, usa estos recursos.
                        </p>
                    </div>

                    <div className="inline-block bg-white p-1 rounded-full border border-black/10 shadow-sm">
                        <Link
                            to="/web-portfolio"
                            className="flex items-center gap-2 px-6 py-3 rounded-full bg-gray-100 hover:bg-white border border-transparent hover:border-black transition-all text-sm font-bold group"
                        >
                            ¿Necesitas una web portafolio?
                            <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </Link>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default EbooksLanding;
