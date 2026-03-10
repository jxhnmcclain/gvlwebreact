import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { setMetaTags, SITE_URL } from '../lib/seo';
import gsap from 'gsap';
import { ArrowRight, X, BarChart3, Mail, Linkedin, Megaphone, CheckCircle2, AlertCircle } from 'lucide-react';

const LeadMagnetB2BPage = () => {
    const [showPopup, setShowPopup] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Scroll to top on mount
        window.scrollTo(0, 0);

        setMetaTags({
            title: 'El Sistema de Generación de Leads B2B | Growth Video Lab',
            description: 'Cómo las empresas de servicios en Chile están dejando de depender del boca a boca construyendo un motor de adquisición predecible, escalable y rentable.',
            ogType: 'website',
            canonical: `${SITE_URL}/b2b-ebook-generacion-sistema`,
        });

        // Popup logic: show after 10 seconds if not already shown in session
        const popupTimer = setTimeout(() => {
            const hasSeenPopup = sessionStorage.getItem('gvl_b2b_popup_shown');
            if (!hasSeenPopup) {
                setShowPopup(true);
                sessionStorage.setItem('gvl_b2b_popup_shown', 'true');
            }
        }, 10000);

        // Animation logic
        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    gsap.to(entry.target, {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        ease: 'power2.out'
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        animatedElements.forEach(el => {
            gsap.set(el, { opacity: 0, y: 30 });
            observer.observe(el);
        });

        return () => {
            clearTimeout(popupTimer);
            observer.disconnect();
        };
    }, []);

    const closePopup = () => setShowPopup(false);

    return (
        <div className="b2b-page-wrapper bg-[#080808] text-white selection:bg-[#C8F55A] selection:text-black">
            {/* Scoped Styles to maintain HTML fidelity */}
            <style dangerouslySetInnerHTML={{
                __html: `
                @import url('https://fonts.googleapis.com/css2?family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap');

                .b2b-page-wrapper {
                    --lime: #C8F55A;
                    --black: #080808;
                    --white: #F8F8F8;
                    --gray: #888;
                    --gray-light: #BBB;
                    --gray-muted: #151515;
                    --border: rgba(255, 255, 255, 0.1);
                    font-family: 'DM Sans', sans-serif;
                }

                .hero {
                    display: grid;
                    grid-template-columns: 1.2fr 1fr;
                    min-height: 80vh;
                    align-items: center;
                    padding: 180px 5% 60px;
                    gap: 60px;
                    border-bottom: 1px solid var(--border);
                }

                @media (max-width: 968px) {
                    .hero { grid-template-columns: 1fr; padding-top: 160px; }
                }

                .hero-tag {
                    font-family: "DM Mono", monospace;
                    color: var(--lime);
                    text-transform: uppercase;
                    letter-spacing: .2em;
                    font-size: 11px;
                    margin-bottom: 24px;
                }

                .hero-headline {
                    font-family: "Playfair Display", serif;
                    font-size: clamp(40px, 6vw, 76px);
                    font-weight: 700;
                    line-height: 1.05;
                    margin-bottom: 32px;
                    letter-spacing: -0.02em;
                }

                .hero-headline em {
                    font-style: italic;
                    color: var(--lime);
                }

                .hero-sub {
                    font-size: 18px;
                    color: var(--gray-light);
                    max-width: 480px;
                    margin-bottom: 40px;
                    line-height: 1.6;
                }

                .hero-question {
                    font-family: "DM Mono", monospace;
                    font-style: italic;
                    font-size: 14px;
                    color: var(--gray);
                    border-left: 2px solid var(--lime);
                    padding-left: 20px;
                    max-width: 400px;
                }

                .stat-grid {
                    display: grid;
                    gap: 20px;
                }

                .stat-item {
                    padding: 32px;
                    border: 1px solid var(--border);
                    background: rgba(255,255,255,0.02);
                    transition: all .4s ease;
                }

                .stat-item:hover {
                    border-color: var(--lime);
                    background: rgba(200, 245, 90, 0.05);
                    transform: translateX(10px);
                }

                .stat-number {
                    font-family: "Playfair Display", serif;
                    font-size: 48px;
                    font-weight: 700;
                    color: var(--lime);
                    margin-bottom: 8px;
                }

                .stat-label {
                    font-size: 15px;
                    color: var(--gray-light);
                    font-weight: 500;
                    line-height: 1.4;
                }

                .source-link {
                    font-size: 11px;
                    color: var(--gray);
                    text-decoration: none;
                    border-bottom: 1px solid transparent;
                    transition: all .3s;
                }

                .source-link:hover {
                    color: var(--lime);
                    border-color: var(--lime);
                }
                
                .full-bg-section {
                    padding: 100px 0;
                    border-bottom: 1px solid var(--border);
                }

                .inner {
                    max-width: 1000px;
                    margin: 0 auto;
                    padding: 0 5%;
                }

                .section-tag {
                    font-family: "DM Mono", monospace;
                    color: var(--lime);
                    font-size: 12px;
                    margin-bottom: 20px;
                    display: block;
                }

                .section-title {
                    font-family: "Playfair Display", serif;
                    font-size: clamp(32px, 5vw, 56px);
                    margin-bottom: 24px;
                    line-height: 1.15;
                }

                .section-sub {
                    font-size: clamp(18px, 2vw, 22px);
                    color: var(--gray-light);
                    margin-bottom: 64px;
                    max-width: 800px;
                    line-height: 1.6;
                }

                .prose p {
                    font-size: 17px;
                    color: var(--gray-light);
                    margin-bottom: 24px;
                    line-height: 1.8;
                }

                .prose strong { color: var(--white); font-weight: 600; }

                .stat-inline {
                    color: var(--lime);
                    font-weight: 700;
                    font-family: "DM Mono", monospace;
                }

                .cards-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 1px;
                    background: var(--border);
                    margin: 64px 0;
                }

                .diag-card {
                    background: var(--black);
                    padding: 48px;
                }

                .diag-num {
                    font-family: "DM Mono", monospace;
                    color: var(--lime);
                    font-size: 14px;
                    margin-bottom: 24px;
                }

                .diag-title {
                    font-size: 22px;
                    font-weight: 700;
                    margin-bottom: 16px;
                    color: var(--white);
                }

                .diag-desc {
                    font-size: 15px;
                    color: var(--gray);
                    line-height: 1.7;
                }

                .insight-box {
                    background: var(--gray-muted);
                    padding: 48px;
                    border-left: 4px solid var(--lime);
                    margin: 64px 0;
                }

                .insight-text {
                    font-family: "Playfair Display", serif;
                    font-size: 24px;
                    font-style: italic;
                    margin-bottom: 24px;
                    line-height: 1.4;
                }

                .insight-sub {
                    font-family: "DM Mono", monospace;
                    font-size: 12px;
                    text-transform: uppercase;
                    color: var(--gray);
                    letter-spacing: .1em;
                }

                .mid-cta {
                    background: var(--lime);
                    color: var(--black);
                    padding: 64px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    gap: 48px;
                    margin: 100px 0;
                }

                @media (max-width: 768px) {
                    .mid-cta { flex-direction: column; text-align: center; padding: 48px 32px; }
                }

                .mid-cta-text {
                    font-family: "Playfair Display", serif;
                    font-size: 32px;
                    font-weight: 800;
                    line-height: 1.2;
                    margin-bottom: 12px;
                }

                .mid-cta-sub {
                    font-size: 16px;
                    font-weight: 500;
                    max-width: 400px;
                }

                .cta-button-black {
                    background: var(--black);
                    color: var(--lime);
                    padding: 20px 40px;
                    text-decoration: none;
                    font-weight: 700;
                    font-family: "DM Mono", monospace;
                    text-transform: uppercase;
                    font-size: 13px;
                    letter-spacing: .05em;
                    transition: all .3s;
                    white-space: nowrap;
                    border: 2px solid var(--black);
                }

                .cta-button-black:hover {
                    background: transparent;
                    color: var(--black);
                }

                .steps-list {
                    margin-top: 80px;
                }

                .step {
                    display: grid;
                    grid-template-columns: 80px 1fr;
                    gap: 40px;
                    margin-bottom: 120px;
                }

                @media (max-width: 640px) {
                    .step { grid-template-columns: 1fr; gap: 20px; }
                }

                .step-num {
                    font-family: "DM Mono", monospace;
                    font-size: 40px;
                    color: rgba(200, 245, 90, 0.2);
                    font-weight: 500;
                    line-height: 1;
                }

                .step-title {
                    font-family: "Playfair Display", serif;
                    font-size: 32px;
                    margin-bottom: 24px;
                }

                .content-types {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 24px;
                    margin: 40px 0;
                }

                @media (max-width: 640px) {
                    .content-types { grid-template-columns: 1fr; }
                }

                .content-type {
                    background: rgba(255,255,255,0.03);
                    border: 1px solid var(--border);
                    padding: 32px;
                }

                .ct-icon { 
                    font-size: 24px; 
                    margin-bottom: 20px; 
                    width: 48px; 
                    height: 48px; 
                    background: var(--lime); 
                    color: var(--black);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: 800;
                }

                .ct-title { font-size: 18px; font-weight: 700; margin-bottom: 12px; }
                .ct-desc { font-size: 14px; color: var(--gray); margin-bottom: 20px; line-height: 1.6; }
                .ct-hook { font-size: 12px; font-family: "DM Mono", monospace; color: var(--lime); padding-top: 16px; border-top: 1px solid var(--border); }

                .funnel { margin: 40px 0; }
                .funnel-step {
                    display: flex;
                    align-items: center;
                    gap: 24px;
                    padding: 20px 0;
                    border-bottom: 1px solid var(--border);
                }
                .funnel-num {
                    font-family: "DM Mono", monospace;
                    font-size: 32px;
                    color: var(--lime);
                    min-width: 80px;
                    text-align: right;
                }
                .funnel-label { font-size: 15px; color: var(--gray-light); }

                .garantia {
                    background: rgba(200, 245, 90, 0.05);
                    border: 1px dashed var(--lime);
                    padding: 40px;
                    margin: 60px 0;
                    display: grid;
                    grid-template-columns: 100px 1fr;
                    gap: 32px;
                    align-items: center;
                }

                @media (max-width: 640px) {
                    .garantia { grid-template-columns: 1fr; text-align: center; }
                }

                .garantia-icon {
                    font-family: "DM Mono", monospace;
                    font-size: 12px;
                    font-weight: 800;
                    color: var(--black);
                    background: var(--lime);
                    width: 100px;
                    height: 100px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transform: rotate(-10deg);
                }

                .garantia-text { font-size: 15px; line-height: 1.7; color: var(--gray-light); }

                .quote-block {
                    margin: 48px 0;
                    padding-left: 32px;
                    border-left: 1px solid var(--border);
                    font-style: italic;
                    color: var(--gray-light);
                    font-size: 18px;
                }

                .cta-section {
                    text-align: center;
                    padding: 140px 5%;
                    background: var(--black);
                }

                .cta-title {
                    font-family: "Playfair Display", serif;
                    font-size: clamp(40px, 6vw, 72px);
                    margin-bottom: 32px;
                    line-height: 1.1;
                }

                .cta-button {
                    display: inline-block;
                    background: var(--lime);
                    color: var(--black);
                    padding: 24px 48px;
                    text-decoration: none;
                    font-size: 16px;
                    font-weight: 800;
                    font-family: "DM Mono", monospace;
                    text-transform: uppercase;
                    letter-spacing: .05em;
                    transition: all .3s ease;
                    border: 2px solid var(--lime);
                }

                .cta-button:hover {
                    background: transparent;
                    color: var(--lime);
                }

                /* Popup styles */
                .popup-overlay {
                    position: fixed;
                    top: 0; left: 0; right: 0; bottom: 0;
                    background: rgba(0, 0, 0, 0.9);
                    backdrop-filter: blur(10px);
                    z-index: 9999;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 20px;
                }

                .popup {
                    background: #111;
                    border: 1px solid rgba(200, 245, 90, 0.3);
                    border-radius: 20px;
                    padding: 64px 48px;
                    max-width: 540px;
                    width: 100%;
                    text-align: center;
                    position: relative;
                    box-shadow: 0 30px 60px rgba(0,0,0,0.5);
                }

                .popup-close {
                    position: absolute;
                    top: 24px; right: 24px;
                    color: var(--gray);
                    cursor: pointer;
                    background: none; border: none;
                    transition: color .2s;
                }
                .popup-close:hover { color: var(--white); }

                .popup-title {
                    font-family: "Playfair Display", serif;
                    font-size: 32px;
                    font-weight: 700;
                    margin-bottom: 20px;
                    line-height: 1.2;
                }

                .popup-desc {
                    font-size: 16px;
                    color: var(--gray-light);
                    margin-bottom: 32px;
                    line-height: 1.6;
                }
                
                .popup-dismiss {
                    display: block;
                    margin: 20px auto 0;
                    background: none; border: none;
                    color: var(--gray);
                    font-size: 13px;
                    cursor: pointer;
                    text-decoration: underline;
                }
            `}} />

            {/* HERO SECTION */}
            <header className="hero !flex !flex-col !items-center !justify-center !text-center">
                <div className="hero-left !max-w-4xl mx-auto flex flex-col items-center">
                    <div className="hero-tag animate-on-scroll">El playbook oficial para B2B en Chile</div>
                    <h1 className="hero-headline animate-on-scroll">
                        ¿Cuántas reuniones con clientes nuevos tuviste <em>esta semana?</em>
                    </h1>
                    <p className="hero-sub animate-on-scroll !text-center mx-auto" style={{ maxWidth: '700px' }}>
                        Construimos un motor de adquisición B2B que te genera 2 a 4 reuniones calificadas por semana — sin depender del boca a boca.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-8 animate-on-scroll w-full">
                        <a href="https://calendly.com/jxhnmcclain/diagnostico-de-marketing" target="_blank" rel="noopener noreferrer" className="cta-button-black flex items-center justify-center gap-3 text-center" style={{ background: 'var(--lime)', color: 'var(--black)' }}>
                            Agenda tu diagnóstico gratis (15 min) <ArrowRight size={18} />
                        </a>
                        <a href="https://wa.me/56973832208" target="_blank" rel="noopener noreferrer" className="cta-button-black flex items-center justify-center gap-3 text-center" style={{ background: 'transparent', color: 'var(--white)', borderColor: 'rgba(255,255,255,0.2)' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21l1.65-3.8A9 9 0 1 1 12 21c-1.6 0-3.1-.4-4.4-1.1L3 21Z" /></svg>
                            +56 9 7383 2208
                        </a>
                    </div>
                </div>
            </header>

            {/* EL PROBLEMA */}
            <section className="full-bg-section bg-[#0c0c0c]">
                <div className="inner">
                    <span className="section-tag animate-on-scroll">01 · El Problema</span>
                    <h2 className="section-title animate-on-scroll">El modelo del referido tiene fecha de vencimiento</h2>
                    <p className="section-sub animate-on-scroll">
                        Durante mucho tiempo las empresas crecieron orgánicamente gracias a un excelente servicio. Pero hoy, ese modelo es un riesgo.
                    </p>

                    <div className="cards-grid">
                        <div className="diag-card animate-on-scroll">
                            <div className="diag-num">1.</div>
                            <div className="diag-title">Incertidumbre</div>
                            <div className="diag-desc">No tener idea de dónde ni cuándo vendrá el próximo gran cliente genera estrés y frena cualquier inversión en crecimiento real.</div>
                        </div>
                        <div className="diag-card animate-on-scroll">
                            <div className="diag-num">2.</div>
                            <div className="diag-title">Techo de crecimiento</div>
                            <div className="diag-desc">Tus referidos provienen de tu red actual de contactos — un círculo cerrado que eventualmente se satura y no escala.</div>
                        </div>
                        <div className="diag-card animate-on-scroll">
                            <div className="diag-num">3.</div>
                            <div className="diag-title">Ciclos de hambruna</div>
                            <div className="diag-desc">Patrón clásico: meses con mucho trabajo donde no prospectas, seguidos de meses vacíos. Sin sistema, no hay control.</div>
                        </div>
                    </div>

                    <div className="mid-cta animate-on-scroll">
                        <div>
                            <div className="mid-cta-text">¿Te suena familiar?</div>
                            <div className="mid-cta-sub">En 15 minutos te muestro el sistema exacto para salir de este ciclo.</div>
                        </div>
                        <a href="https://calendly.com/jxhnmcclain/diagnostico-de-marketing" target="_blank" rel="noopener noreferrer" className="cta-button-black flex items-center gap-3">
                            Agenda un diagnóstico gratis <ArrowRight size={18} />
                        </a>
                    </div>
                </div>
            </section>

            {/* METODOLOGÍA */}
            <section className="full-bg-section">
                <div className="inner">
                    <span className="section-tag animate-on-scroll">02 · Metodología</span>
                    <h2 className="section-title animate-on-scroll">Un motor de adquisición B2B construido para tu empresa</h2>
                    <p className="section-sub animate-on-scroll">
                        Esto no es subir posts a Instagram. Es un motor de ingeniería que convierte prospectos fríos en reuniones calificadas.
                    </p>

                    <div className="steps-list">
                        {/* STEP 1 */}
                        <div className="step">
                            <div className="step-num animate-on-scroll">01</div>
                            <div className="step-content">
                                <h3 className="step-title animate-on-scroll">La Oferta Posicionada (El Pilar)</h3>
                                <div className="prose animate-on-scroll">
                                    <p>Vender "servicios" es el error #1. Para construir un motor B2B necesitas vender <strong>resultados medibles</strong> y mecanismos únicos.</p>

                                    <div className="content-types">
                                        <div className="content-type">
                                            <div className="ct-icon">✗</div>
                                            <div className="ct-title text-red-400">Genérico</div>
                                            <div className="ct-desc">"Desarrollamos software a medida y aplicaciones móviles para empresas."</div>
                                            <div className="ct-hook !text-red-400 !border-red-400/30">Resultado: Compites por precio contra todos</div>
                                        </div>
                                        <div className="content-type">
                                            <div className="ct-icon">✓</div>
                                            <div className="ct-title">Posicionado</div>
                                            <div className="ct-desc">"Ayudamos a startups SaaS a reducir la pérdida de clientes integrando analítica predictiva en 4 semanas."</div>
                                            <div className="ct-hook">Resultado: Eres el único en tu categoría</div>
                                        </div>
                                    </div>

                                    <div className="quote-block">
                                        "Tu marketing solo será tan bueno como el atractivo intrínseco de lo que estás vendiendo." — <span className="text-white">Alex Hormozi</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* STEP 2 */}
                        <div className="step">
                            <div className="step-num animate-on-scroll">02</div>
                            <div className="step-content">
                                <h3 className="step-title animate-on-scroll">Outreach Multicanal</h3>
                                <div className="prose animate-on-scroll">
                                    <p>Usamos flujos de <strong>Outbound Proactivo</strong> (Cold Email + LinkedIn DMs) e <strong>Inbound</strong> (SEO) para conectarte con tus clientes ideales.</p>
                                    <p className="font-bold text-[#C8F55A]">Todo es 100% personalizado. Nada de spam masivo.</p>

                                    <div className="funnel">
                                        <div className="funnel-step">
                                            <div className="funnel-num">100</div>
                                            <div className="funnel-label">Empresas contactadas / semana (Personalización manual)</div>
                                        </div>
                                        <div className="funnel-step">
                                            <div className="funnel-num">60%</div>
                                            <div className="funnel-label">Tasa de apertura promedio en campañas B2B</div>
                                        </div>
                                        <div className="funnel-step">
                                            <div className="funnel-num">5-10</div>
                                            <div className="funnel-label">Responden con interés real por semana</div>
                                        </div>
                                        <div className="funnel-step">
                                            <div className="funnel-num">2-4</div>
                                            <div className="funnel-label"><strong>Reuniones calificadas</strong> agendadas / semana</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* STEP 3 */}
                        <div className="step">
                            <div className="step-num animate-on-scroll">03</div>
                            <div className="step-content">
                                <h3 className="step-title animate-on-scroll">CRM y Seguimiento Automatizado</h3>
                                <div className="prose animate-on-scroll">
                                    <p>El <span className="stat-inline">80%</span> de las ventas B2B requieren 5 o más touchpoints. <strong>La mayoría de los negocios se pierden en el follow-up. Nosotros lo automatizamos.</strong></p>

                                    <div className="funnel">
                                        <div className="funnel-step">
                                            <div className="funnel-num">Día 0</div>
                                            <div className="funnel-label"><strong>Reunión</strong> — Diagnóstico de problemas y presentación de valor.</div>
                                        </div>
                                        <div className="funnel-step">
                                            <div className="funnel-num">Día 2</div>
                                            <div className="funnel-label"><strong>Resumen</strong> — Recapitulación y envío de propuesta formal.</div>
                                        </div>
                                        <div className="funnel-step">
                                            <div className="funnel-num">Día 5</div>
                                            <div className="funnel-label"><strong>Caso de Estudio</strong> — Prueba social de un cliente similar.</div>
                                        </div>
                                        <div className="funnel-step">
                                            <div className="funnel-num">Día 10</div>
                                            <div className="funnel-label"><strong>Aporte de Valor</strong> — Recurso útil o insight para su negocio.</div>
                                        </div>
                                        <div className="funnel-step">
                                            <div className="funnel-num">Día 14</div>
                                            <div className="funnel-label"><strong>Cierre</strong> — Seguimiento final y próximos pasos.</div>
                                        </div>
                                    </div>

                                    <div className="garantia">
                                        <div className="garantia-icon">SISTEMA</div>
                                        <div className="garantia-text">
                                            Un buen sistema CRM evita que <strong>millones de pesos</strong> se escapen entre los posibles clientes olvidados. Genera hasta un 50% más leads a un tercio del costo.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* FINAL CTA */}
            <section className="cta-section">
                <div className="inner">
                    <h2 className="cta-title animate-on-scroll text-5xl">¿Listo para tener un sistema<br />que funcione <em>mientras tú trabajas?</em></h2>
                    <p className="hero-sub mx-auto mb-12 animate-on-scroll">
                        15 minutos. Sin compromiso. Te decimos exactamente qué canal funciona mejor para tu industria y cuántos leads puedes esperar en los primeros 60 días.<br /><br />
                        <span className="text-white font-bold opacity-80 block mt-4 bg-[rgba(200,245,90,0.1)] py-2 px-4 rounded-full w-fit mx-auto border border-[rgba(200,245,90,0.2)] text-sm">Solo tomamos 3 clientes nuevos por mes para garantizar resultados.</span>
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-on-scroll mt-12 w-full">
                        <a href="https://calendly.com/jxhnmcclain/diagnostico-de-marketing" target="_blank" rel="noopener noreferrer" className="cta-button w-full sm:w-auto text-center flex items-center justify-center" style={{ padding: '20px 48px', fontSize: '1.1rem' }}>
                            Agenda tu diagnóstico gratuito →
                        </a>
                        <a href="https://wa.me/56973832208" target="_blank" rel="noopener noreferrer" className="cta-button-black flex items-center justify-center gap-3 w-full sm:w-auto" style={{ background: 'transparent', color: 'var(--white)', borderColor: 'rgba(255,255,255,0.2)', padding: '20px 48px', fontSize: '1.1rem' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21l1.65-3.8A9 9 0 1 1 12 21c-1.6 0-3.1-.4-4.4-1.1L3 21Z" /></svg>
                            O escríbenos al WhatsApp
                        </a>
                    </div>
                </div>
            </section>

            {/* POPUP OVERLAY */}
            {showPopup && (
                <div className="popup-overlay" onClick={(e) => e.target === e.currentTarget && closePopup()}>
                    <div className="popup animate-on-scroll !opacity-100 !translate-y-0">
                        <button className="popup-close" onClick={closePopup} aria-label="Cerrar">
                            <X size={24} />
                        </button>
                        <div className="text-5xl mb-6">📊</div>
                        <h2 className="popup-title">¿Tu empresa depende<br />100% de referidos?</h2>
                        <p className="popup-desc">
                            En 15 minutos te muestro qué canales funcionan para tu rubro y cómo sistematizar tu generación de leads. Sin compromiso.
                        </p>
                        <a href="https://calendly.com/jxhnmcclain/diagnostico-de-marketing" target="_blank" rel="noopener noreferrer" className="cta-button !py-5 !text-sm !w-full inline-block" onClick={closePopup}>
                            Agendar diagnóstico gratis →
                        </a>
                        <button className="popup-dismiss" onClick={closePopup}>No gracias, sigo leyendo</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LeadMagnetB2BPage;
