import React, { useRef, useLayoutEffect, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { Check, ArrowRight, ArrowDownToLine } from 'lucide-react';
import { N8N_WEBHOOKS } from '../lib/config';
import TurnstileWidget from './TurnstileWidget';
import { getUTMParams } from '../lib/utm';

const GUIDE_URL = '/guia-ia-marketing.html';

const LeadMagnet = () => {
  const container = useRef<HTMLElement>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.lead-card', {
        scale: 0.96,
        opacity: 0,
        y: 32,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: container.current, start: 'top 78%', toggleActions: 'play none none reverse' },
      });
    }, container);
    return () => ctx.revert();
  }, []);

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      const response = await fetch(N8N_WEBHOOKS.EBOOKS, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          form_type: 'lead_magnet',
          resource_slug: 'guia-ia-flujos-marketing',
          resource_title: 'IA en tus flujos de marketing',
          name,
          email,
          turnstileToken,
          page_url: window.location.href,
          ...getUTMParams(),
        }),
      });
      if (!response.ok) throw new Error('Lead intake failed');
      setIsSubmitted(true);
    } catch {
      setError('No pudimos registrar la solicitud. Puedes descargar la guía directamente y volver a intentarlo más tarde.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section ref={container} className="relative w-full min-h-[620px] flex items-center overflow-hidden py-20">
      <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop" alt="Equipo revisando una estrategia de marketing" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black/65" />
      <div className="max-w-7xl mx-auto w-full px-4 md:px-8 relative z-10">
        <div className="lead-card bg-gvl-cream rounded-[2rem] p-8 md:p-12 max-w-3xl shadow-2xl border border-black/10">
          {!isSubmitted ? (
            <>
              <div className="inline-block px-4 py-1 border border-black text-xs font-black uppercase tracking-widest mb-6 bg-gvl-yellow">GUÍA GRATIS / GVL 01</div>
              <h2 className="text-3xl md:text-5xl font-black uppercase mb-5 leading-[.98] tracking-tight text-black">Implementa IA en tus flujos de marketing.</h2>
              <p className="text-gray-700 text-lg mb-7 font-medium max-w-2xl">Una guía práctica para conectar agentes como Codex o Claude Code con tus herramientas y organizar el trabajo diario y mensual, con revisión humana donde importa.</p>
              <a href="/guia-ia-marketing" className="inline-flex items-center gap-2 mb-8 font-bold underline underline-offset-4">Mira qué incluye <ArrowRight size={17} /></a>
              <form onSubmit={handleFormSubmit} className="space-y-4 max-w-2xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="home-guide-name" className="block text-xs font-bold uppercase mb-1 ml-1 text-gray-500">Nombre</label>
                    <input id="home-guide-name" name="name" required type="text" autoComplete="name" placeholder="Tu nombre" className="w-full bg-white border border-black/20 p-3 outline-none focus:border-black transition-all font-medium" value={name} onChange={(event) => setName(event.target.value)} />
                  </div>
                  <div>
                    <label htmlFor="home-guide-email" className="block text-xs font-bold uppercase mb-1 ml-1 text-gray-500">Email</label>
                    <input id="home-guide-email" name="email" required type="email" autoComplete="email" placeholder="tu@empresa.com" className="w-full bg-white border border-black/20 p-3 outline-none focus:border-black transition-all font-medium" value={email} onChange={(event) => setEmail(event.target.value)} />
                  </div>
                </div>
                <TurnstileWidget onVerify={setTurnstileToken} />
                {error && <p role="alert" className="text-sm text-red-800">{error} <a href={GUIDE_URL} className="font-bold underline">Descargar guía</a></p>}
                <button type="submit" disabled={!turnstileToken || isSubmitting} className="w-full bg-black text-white border border-black px-8 py-4 font-black uppercase tracking-wide hover:bg-gvl-yellow hover:text-black transition-all flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed shadow-lg">
                  {isSubmitting ? 'Enviando…' : 'Envíame la guía'} <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <p className="text-xs text-center text-gray-500">Te enviaremos el recurso solicitado por email.</p>
              </form>
            </>
          ) : (
            <div className="py-10 text-center">
              <div className="w-20 h-20 bg-gvl-yellow text-black flex items-center justify-center mx-auto mb-6"><Check size={40} strokeWidth={3} /></div>
              <h3 className="text-3xl font-black uppercase mb-4">Ya puedes empezar.</h3>
              <p className="text-gray-700 text-lg font-medium">Enviamos el enlace a tu correo. También puedes abrir la guía ahora.</p>
              <a href={GUIDE_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 mt-6 bg-black text-white border border-black px-6 py-4 font-black uppercase"><ArrowDownToLine size={18} /> Abrir la guía</a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default LeadMagnet;
