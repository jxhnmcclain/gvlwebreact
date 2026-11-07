import React, { useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getUTMParams } from '../lib/utm';

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
    intro: 'Estamos construyendo una experiencia para que diseñadores y creativos aprendan a crear sus propias herramientas con IA, desde el primer artefacto hasta publicar una aplicación. «De cero a deploy» es un nombre provisional.',
    options: [],
    note: 'El curso todavía está en desarrollo. Anotarte aquí solo nos permite avisarte cuando tengamos novedades; no crea una cuenta ni da acceso al curso.',
  },
} as const;

export default function WaitlistPage({ kind }: { kind: Kind }) {
  const content = copy[kind];
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [detail, setDetail] = useState('');
  const [option, setOption] = useState(kind === 'creatives' ? 'single' : '');
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');
  const [error, setError] = useState('');

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setStatus('sending');
    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ kind, option, name: name.trim(), email: email.trim(), detail: detail.trim(), consent, website, page_url: window.location.href, ...getUTMParams() }),
      });
      if (!response.ok) throw new Error('No se pudo guardar');
      setStatus('success');
    } catch {
      setError('No pudimos guardar tus datos. Intenta nuevamente más tarde.');
      setStatus('idle');
    }
  }

  return (
    <div className="min-h-screen bg-gvl-cream text-gvl-black">
      <section className="px-4 pb-16 pt-36 md:px-12 md:pb-24">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2 md:items-start">
          <div>
            <p className="mb-5 text-xs font-black uppercase tracking-[0.25em] text-gvl-dark-gray">{content.eyebrow}</p>
            <h1 className="max-w-xl text-5xl font-black uppercase leading-[0.95] tracking-tighter md:text-7xl">{content.title}</h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed md:text-xl">{content.intro}</p>
            {kind === 'creatives' && (
              <div className="mt-9 space-y-3 border-t-2 border-black pt-6">
                {content.options.map((item) => (
                  <p key={item.value} className="flex flex-wrap justify-between gap-2 text-lg font-bold"><span>{item.label}</span><span>{item.price}</span></p>
                ))}
              </div>
            )}
            {kind === 'teams' && <p className="mt-9 border-t-2 border-black pt-6 text-xl font-bold">Precio a revisar según el alcance.</p>}
            {kind === 'academy' && <p className="mt-9 border-t-2 border-black pt-6 font-bold">Un producto a ritmo propio, con tres niveles y proyectos elegidos por cada estudiante. Aún en desarrollo.</p>}
            <p className="mt-7 max-w-xl text-sm leading-relaxed text-gvl-dark-gray">{content.note}</p>
            <Link className="mt-8 inline-block text-sm font-bold uppercase underline" to="/servicios">Ver todos los servicios</Link>
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
                <label className="flex items-start gap-3 text-sm"><input required type="checkbox" checked={consent} onChange={e => setConsent(e.target.checked)} className="mt-1" /><span>Acepto que Growth Video Lab guarde estos datos para contactarme sobre esta lista de espera.</span></label>
                {error && <p role="alert" className="text-sm font-bold text-red-700">{error}</p>}
                <button type="submit" disabled={status === 'sending'} className="flex w-full items-center justify-center gap-2 rounded-full bg-black px-6 py-4 font-black uppercase text-white transition-colors hover:bg-gvl-orange disabled:opacity-60">{status === 'sending' ? 'Guardando…' : 'Entrar en la lista'} <ArrowRight size={18} /></button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
