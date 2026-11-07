import React, { useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getUTMParams } from '../lib/utm';
import CommercialHero from '../components/CommercialHero';
import TurnstileWidget from '../components/TurnstileWidget';

type Kind = 'creatives' | 'teams' | 'academy';

const copy = {
  creatives: {
    eyebrow: 'Asesoría / creativos',
    title: 'Construyamos eso que tienes en mente.',
    intro: 'Una conversación de trabajo para ordenar tu idea, elegir herramientas y definir el siguiente paso. Puedes venir con un proyecto, un proceso o una pregunta concreta.',
    options: [
      { value: 'single', label: 'Una asesoría', price: '$65.000 CLP' },
      { value: 'four', label: 'Set de 4 asesorías', price: '$200.000 CLP' },
    ],
    note: 'La lista de espera no es una reserva ni un pago. Te contactaremos cuando abramos cupos para confirmar el alcance y la disponibilidad.',
  },
  teams: {
    eyebrow: 'Asesoría / equipos',
    title: 'Ideas, procesos y herramientas para tu equipo.',
    intro: 'Trabajamos con equipos creativos y de marketing que quieren entender dónde aplicar IA, ordenar procesos o explorar una herramienta propia.',
    options: [],
    note: 'Precio a revisar según el equipo y el alcance. Esta lista de espera no confirma una contratación.',
  },
  academy: {
    eyebrow: 'Academia / en construcción',
    title: 'De cero a crear. Y de crear a publicar.',
    intro: 'Un curso en construcción para que diseñadores y creativos aprendan a crear herramientas con IA y publiquen una aplicación propia. Está pensado para empezar sin saber programar. «De cero a deploy» es un nombre provisional.',
    options: [],
    note: 'El curso todavía está en desarrollo. Dejar tu correo no crea una cuenta ni reserva un cupo; nos permite avisarte cuando tengamos novedades.',
  },
} as const;

const academyLevels = [
  {
    number: '01',
    title: 'De cero a crear con IA.',
    body: 'Conocerás Claude y Claude Code, organizarás una carpeta de proyectos y explorarás conexiones útiles. La primera meta es crear un artefacto o una automatización pequeña y explicar qué hace.',
    result: 'Tu primera herramienta.',
  },
  {
    number: '02',
    title: 'Construye y publica una app.',
    body: 'Pasarás de una idea a una aplicación sencilla que otra persona pueda abrir. El recorrido previsto explora Lovable, v0 y Google AI Studio, además de pruebas, correcciones y despliegue.',
    result: 'Una aplicación con enlace.',
  },
  {
    number: '03',
    title: 'Lleva tu proyecto más lejos.',
    body: 'Entenderás las piezas que aparecen después: datos, usuarios, seguridad y hosting. También verás cuándo tiene sentido investigar Cloudflare, AWS u otras rutas para seguir aprendiendo.',
    result: 'Un mapa para tu siguiente paso.',
  },
];

const academyFormat = [
  { title: 'Un recorrido, tres niveles.', body: 'Los tres niveles están pensados como un único producto. El avance será a ritmo propio.' },
  { title: 'Misiones sobre tus ideas.', body: 'Podrás elegir qué construir. Estamos diseñando misiones, hitos y progreso alrededor de creaciones reales.' },
  { title: 'Texto primero, video después.', body: 'Preparamos las clases por escrito y sumaremos videos progresivamente. El material y las herramientas pueden ajustarse mientras desarrollamos el curso.' },
];

export default function WaitlistPage({ kind }: { kind: Kind }) {
  const content = copy[kind];
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [detail, setDetail] = useState('');
  const [option, setOption] = useState(kind === 'creatives' ? 'single' : '');
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState('');
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');
  const [error, setError] = useState('');

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    if (!turnstileToken) { setError('Completa la verificación de Cloudflare para entrar en la lista.'); return; }
    setStatus('sending');
    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ kind, option, name: name.trim(), email: email.trim(), detail: detail.trim(), consent, website, turnstileToken, page_url: window.location.href, ...getUTMParams() }),
      });
      if (!response.ok) throw new Error('No se pudo guardar');
      setStatus('success');
    } catch {
      setError('No pudimos guardar tus datos. Intenta nuevamente más tarde.');
      setTurnstileToken(null);
      setStatus('idle');
    }
  }

  return (
    <div className="min-h-screen bg-gvl-cream text-gvl-black">
      <CommercialHero eyebrow={content.eyebrow} title={content.title} description={content.intro}>
        <a href="#lista-de-espera" className="inline-flex border border-white px-6 py-3 text-sm font-black uppercase text-white hover:bg-white hover:text-black">Entrar en la lista ↓</a>
      </CommercialHero>
      {kind === 'academy' && (
        <>
          <section className="px-4 pb-20 pt-14 md:px-12 md:pb-28 md:pt-20">
            <div className="mx-auto grid max-w-6xl gap-8 border-t border-black pt-9 md:grid-cols-12 md:gap-12">
              <p className="font-mono text-xs uppercase tracking-[0.22em] md:col-span-3">El punto de partida</p>
              <div className="md:col-span-9">
                <h2 className="max-w-4xl text-4xl font-black leading-none tracking-tighter md:text-6xl">Una idea propia es un buen lugar para empezar.</h2>
                <p className="mt-7 max-w-3xl text-lg leading-relaxed text-gvl-dark-gray">Si diseñas, creas contenido o trabajas en marketing, quizás tienes una idea para una herramienta que aún no sabes construir. El curso está pensado para empezar ahí: elegir un proyecto, entender las piezas y probarlo hasta que funcione.</p>
                <p className="mt-5 max-w-3xl text-lg leading-relaxed text-gvl-dark-gray">Puede ser algo útil para tu trabajo, una app personal o un experimento raro. El proyecto lo eliges tú.</p>
              </div>
            </div>
          </section>

          <section id="recorrido" className="px-4 pb-20 md:px-12 md:pb-28">
            <div className="mx-auto max-w-6xl">
              <p className="mb-5 font-mono text-xs uppercase tracking-[0.22em]">El recorrido previsto</p>
              <h2 className="mb-10 max-w-4xl text-4xl font-black leading-none tracking-tighter md:text-6xl">Tres niveles. Algo tuyo al final de cada uno.</h2>
              <div className="border-t-2 border-black">
                {academyLevels.map(level => (
                  <article key={level.number} className="grid gap-4 border-b border-black/30 py-8 md:grid-cols-12 md:gap-8 md:py-10">
                    <span className="font-mono text-sm font-bold md:col-span-1">{level.number}</span>
                    <h3 className="text-2xl font-black leading-tight tracking-tight md:col-span-4 md:text-3xl">{level.title}</h3>
                    <div className="md:col-span-7">
                      <p className="max-w-2xl leading-relaxed text-gvl-dark-gray">{level.body}</p>
                      <p className="mt-5 font-mono text-xs font-bold uppercase tracking-[0.12em]">{level.result}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="bg-[#050505] px-4 py-20 text-white md:px-12 md:py-28">
            <div className="mx-auto max-w-6xl">
              <p className="mb-5 font-mono text-xs uppercase tracking-[0.22em] text-gvl-yellow/70">Cómo lo estamos diseñando</p>
              <h2 className="max-w-4xl text-4xl font-black leading-none tracking-tighter md:text-6xl">Aprender haciendo. Revisar lo que construyes.</h2>
              <div className="mt-10 grid gap-8 md:grid-cols-3">
                {academyFormat.map(item => (
                  <div key={item.title} className="border-t border-white/25 pt-5">
                    <h3 className="text-xl font-black tracking-tight">{item.title}</h3>
                    <p className="mt-3 leading-relaxed text-white/70">{item.body}</p>
                  </div>
                ))}
              </div>
              <div className="mt-16 max-w-3xl border-t border-white/25 pt-7">
                <p className="font-mono text-xs uppercase tracking-[0.22em] text-gvl-yellow/70">Una nota de John</p>
                <p className="mt-5 text-xl leading-relaxed text-white/85 md:text-2xl">Soy John McClain. Estoy creando este curso para que más personas creativas puedan convertir sus ideas en herramientas propias. Quiero enseñar el proceso, incluidos los errores y las decisiones que aparecen antes de publicar.</p>
              </div>
            </div>
          </section>
        </>
      )}
      <section className="px-4 pb-16 pt-12 md:px-12 md:pb-24 md:pt-20">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2 md:items-start">
          <div>
            <h2 className="max-w-xl text-3xl font-black uppercase tracking-tighter md:text-5xl">{kind === 'academy' ? 'El curso sigue en construcción.' : 'Lo que puedes esperar.'}</h2>
            {kind === 'creatives' && (
              <div className="mt-9 space-y-3 border-t-2 border-black pt-6">
                {content.options.map((item) => (
                  <p key={item.value} className="flex flex-wrap justify-between gap-2 text-lg font-bold"><span>{item.label}</span><span>{item.price}</span></p>
                ))}
              </div>
            )}
            {kind === 'teams' && <p className="mt-9 border-t-2 border-black pt-6 text-xl font-bold">Precio a revisar según el alcance.</p>}
            {kind === 'academy' && <p className="mt-9 border-t-2 border-black pt-6 font-bold">Todavía no hay acceso, fecha de lanzamiento ni precio publicado. Si te interesa seguir el proyecto, puedes dejar tu correo en la lista.</p>}
            <p className="mt-7 max-w-xl text-sm leading-relaxed text-gvl-dark-gray">{content.note}</p>
            {kind !== 'academy' && <Link className="mt-8 inline-block text-sm font-bold uppercase underline" to="/servicios">Ver todos los servicios</Link>}
          </div>
          <div id="lista-de-espera" className="border-2 border-black bg-white p-6 shadow-[8px_8px_0_0_#000] md:p-9">
            {status === 'success' ? (
              <div role="status" className="py-12"><CheckCircle2 size={36} /><h2 className="mt-5 text-3xl font-black uppercase">Quedaste en la lista.</h2><p className="mt-4">Guardamos tus datos para avisarte cuando haya novedades.</p></div>
            ) : (
              <form onSubmit={submit} className="space-y-5">
                <h2 className="text-3xl font-black uppercase tracking-tight">Lista de espera</h2>
                <p className="text-sm">Déjanos tus datos para avisarte cuando podamos avanzar.</p>
                <label className="block text-sm font-bold">Nombre<input required maxLength={120} value={name} onChange={e => setName(e.target.value)} className="mt-2 w-full border-2 border-black bg-gvl-cream p-3 font-normal" autoComplete="name" /></label>
                <label className="block text-sm font-bold">Correo<input required type="email" maxLength={254} value={email} onChange={e => setEmail(e.target.value)} className="mt-2 w-full border-2 border-black bg-gvl-cream p-3 font-normal" autoComplete="email" /></label>
                {kind === 'creatives' && <fieldset><legend className="mb-2 text-sm font-bold">Me interesa</legend>{content.options.map(item => <label key={item.value} className="mb-2 flex items-center gap-2 text-sm"><input type="radio" name="option" value={item.value} checked={option === item.value} onChange={e => setOption(e.target.value)} />{item.label} · {item.price}</label>)}</fieldset>}
                {kind !== 'academy' && <label className="block text-sm font-bold">¿Qué te gustaría trabajar? <span className="font-normal">(opcional)</span><textarea maxLength={1000} value={detail} onChange={e => setDetail(e.target.value)} rows={4} className="mt-2 w-full border-2 border-black bg-gvl-cream p-3 font-normal" /></label>}
                <div className="hidden" aria-hidden="true"><label>Sitio web<input tabIndex={-1} autoComplete="off" value={website} onChange={e => setWebsite(e.target.value)} /></label></div>
                <TurnstileWidget onVerify={setTurnstileToken} onError={() => { setTurnstileToken(null); setError('No se pudo completar la verificación. Recarga la página e inténtalo de nuevo.'); }} />
                <label className="flex items-start gap-3 text-sm"><input required type="checkbox" checked={consent} onChange={e => setConsent(e.target.checked)} className="mt-1" /><span>Acepto que Growth Video Lab guarde estos datos para contactarme sobre esta lista de espera.</span></label>
                {error && <p role="alert" className="text-sm font-bold text-red-700">{error}</p>}
                <button type="submit" disabled={status === 'sending' || !turnstileToken} className="flex w-full items-center justify-center gap-2 rounded-full bg-black px-6 py-4 font-black uppercase text-white transition-colors hover:bg-gvl-orange disabled:opacity-60">{status === 'sending' ? 'Guardando…' : 'Entrar en la lista'} <ArrowRight size={18} /></button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
