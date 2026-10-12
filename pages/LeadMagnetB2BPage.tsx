import React, { useState } from 'react';
import { ArrowDownToLine, ArrowRight, CheckCircle2, Workflow } from 'lucide-react';
import { setMetaTags, SITE_URL } from '../lib/seo';
import { N8N_WEBHOOKS } from '../lib/config';
import { getUTMParams } from '../lib/utm';
import TurnstileWidget from '../components/TurnstileWidget';
import Dither from '../components/Dither.jsx';
import Logo from '../components/Logo';

const GUIDE_URL = '/guia-ia-marketing.html';

const LeadMagnetB2BPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  React.useEffect(() => {
    setMetaTags({
      title: 'Guía práctica: IA en tus flujos de marketing | Growth Video Lab',
      description: 'Aprende a conectar agentes como Codex y Claude Code con tus herramientas de marketing y a diseñar flujos útiles para el trabajo diario y mensual.',
      ogType: 'website',
      canonical: `${SITE_URL}/guia-ia-marketing`,
    });
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
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
      if (!response.ok) throw new Error('No se pudo registrar la solicitud.');
      setIsSubmitted(true);
    } catch {
      setError('No pudimos registrar tu solicitud. Intenta otra vez o descarga la guía directamente aquí abajo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-[80vh] bg-[#050505] text-white selection:bg-gvl-yellow selection:text-black">
      <section className="relative isolate min-h-[78vh] overflow-hidden border-b border-white/15 bg-[#050505]">
        <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
          <Dither waveColor={[1, 0.9607843137254902, 0]} disableAnimation={false} enableMouseInteraction mouseRadius={1} colorNum={3} pixelSize={3} waveAmplitude={0.3} waveFrequency={3} waveSpeed={0.05} />
        </div>
        <div className="pointer-events-none absolute inset-0 z-[1] bg-black/50" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-0 z-[2] bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.12),transparent_52%)]" aria-hidden="true" />
        <div className="ascii-field text-white/55" aria-hidden="true">{'GVL\n000000000000000000\nsignal only\ndo not decorate\n000000000000000000'}</div>
        <div className="relative z-10 mx-auto grid max-w-7xl gap-12 px-6 pb-20 pt-24 md:grid-cols-[1.1fr_.9fr] md:items-center md:px-10 md:pb-28 md:pt-32">
          <div>
            <div className="mb-9 max-w-[190px]"><Logo textColor="text-white" /></div>
            <p className="mb-6 inline-flex items-center gap-2 border border-gvl-yellow/60 bg-black/40 px-3 py-2 font-mono text-[11px] uppercase tracking-[.18em] text-gvl-yellow">
              <Workflow size={15} /> Guía práctica / IA y marketing
            </p>
            <h1 className="max-w-3xl font-sans text-5xl font-black uppercase leading-[.93] tracking-[-.055em] md:text-7xl">
              Implementa IA en tus <span className="text-gvl-yellow">flujos de marketing.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/75 md:text-xl">
              Aprende a pasar de pedir textos a un chatbot a diseñar flujos donde agentes como Codex o Claude Code usan el contexto y las herramientas de tu equipo para avanzar tareas reales.
            </p>
            <div className="mt-9 flex flex-wrap gap-x-7 gap-y-3 font-mono text-xs uppercase tracking-wide text-white/70">
              <span>01 · Encuentra un flujo útil</span><span>02 · Conecta tus sistemas</span><span>03 · Mantén el control</span>
            </div>
            <a href="#solicitar" className="mt-10 inline-flex items-center gap-3 border border-gvl-yellow bg-gvl-yellow px-7 py-4 font-black uppercase tracking-wide text-black transition hover:-translate-y-0.5 hover:bg-white hover:border-white">
              Recibir la guía <ArrowRight size={18} />
            </a>
          </div>

          <div id="solicitar" className="relative mx-auto w-full max-w-md border border-white/30 bg-black/90 p-7 shadow-[8px_8px_0_#DFFF00] md:p-9">
            {isSubmitted ? (
              <div className="py-5">
                <CheckCircle2 className="text-gvl-yellow" size={36} />
                <h2 className="mt-5 font-sans text-2xl font-black uppercase">Ya puedes empezar.</h2>
                <p className="mt-3 leading-7 text-white/65">Enviamos el enlace a tu correo. También puedes abrir la guía ahora.</p>
                <a href={GUIDE_URL} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 border border-gvl-yellow bg-gvl-yellow px-5 py-3 font-black uppercase text-black"><ArrowDownToLine size={17} /> Abrir la guía</a>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="mb-6 flex items-center justify-between border-b border-white/20 pb-4 font-mono text-[10px] uppercase tracking-[.2em] text-white/60">
                  <span>Guía gratuita</span><span>GVL / 01</span>
                </div>
                <h2 className="font-sans text-2xl font-black uppercase">Recíbela en tu correo</h2>
                <p className="text-sm leading-6 text-white/60">Solo necesitamos tu nombre y email para enviarte el acceso.</p>
                <label className="block font-mono text-xs uppercase tracking-wider text-white/60" htmlFor="guide-name">Nombre</label>
                <input id="guide-name" name="name" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Tu nombre" autoComplete="name" className="w-full border border-white/20 bg-white/[.06] px-4 py-3 text-white outline-none transition focus:border-gvl-yellow" />
                <label className="block font-mono text-xs uppercase tracking-wider text-white/60" htmlFor="guide-email">Email de trabajo</label>
                <input id="guide-email" name="email" required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tu@empresa.com" autoComplete="email" className="w-full border border-white/20 bg-white/[.06] px-4 py-3 text-white outline-none transition focus:border-gvl-yellow" />
                <TurnstileWidget onVerify={setTurnstileToken} />
                {error && <p role="alert" className="text-sm leading-6 text-[#ffd0c8]">{error} <a href={GUIDE_URL} target="_blank" rel="noreferrer" className="underline">Descargar sin esperar</a></p>}
                <button type="submit" disabled={!turnstileToken || isSubmitting} className="flex w-full items-center justify-center gap-2 border border-gvl-yellow bg-gvl-yellow px-5 py-4 font-black uppercase tracking-wide text-black transition hover:border-white hover:bg-white disabled:cursor-not-allowed disabled:opacity-50">
                  {isSubmitting ? 'Enviando…' : 'Enviar la guía'} <ArrowRight size={18} />
                </button>
                <p className="text-xs leading-5 text-white/45">Te enviaremos el recurso solicitado. No necesitas agendar una reunión para descargarlo.</p>
              </form>
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">
        <div className="grid gap-12 md:grid-cols-[.8fr_1.2fr]">
          <div>
            <p className="font-mono text-xs uppercase tracking-[.2em] text-gvl-yellow">El cambio de enfoque</p>
            <h2 className="mt-4 max-w-md font-sans text-4xl font-black uppercase leading-[.98] tracking-tight md:text-5xl">La IA no tiene que vivir en otra pestaña.</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              ['Del prompt al proceso', 'Ordena entradas, criterios, pasos y resultados para que la tarea se pueda repetir.'],
              ['Del archivo al contexto', 'Conecta briefs, campañas, reportes y CRM con permisos acotados.'],
              ['Del agente al equipo', 'Usa Codex o Claude Code para investigar, preparar borradores y operar herramientas con revisión humana.'],
              ['De la novedad al hábito', 'Prueba un flujo en pequeño y revisa calidad, tiempo, errores y adopción cada mes.'],
            ].map(([title, copy], index) => (
              <article key={title} className="border border-white/10 bg-white/[.025] p-6 md:p-7">
                <span className="font-mono text-sm text-gvl-yellow">0{index + 1}</span>
                <h3 className="mt-5 font-sans text-lg font-black uppercase">{title}</h3>
                <p className="mt-3 leading-7 text-white/60">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 text-sm leading-6 text-white/45 md:px-10">
        <p>El objetivo no es automatizar cada tarea. Es diseñar un flujo útil, entender qué puede consultar o ejecutar el agente y decidir dónde debe revisar una persona.</p>
      </section>
    </main>
  );
};

export default LeadMagnetB2BPage;
