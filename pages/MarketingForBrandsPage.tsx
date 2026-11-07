import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import CommercialHero from '../components/CommercialHero';

const stages = [
  { number: '01', title: 'Entender antes de producir.', body: 'Revisamos tu oferta, a quién quieres llegar, qué preguntas aparecen en la venta y cómo responde hoy tu equipo. Partimos con una línea base, no con una cantidad arbitraria de publicaciones.' },
  { number: '02', title: 'Dar forma a una voz.', body: 'Definimos mensajes, temas y formatos que puedan sostener la marca. Cuando tiene sentido, conectamos la voz de quien lidera el proyecto con el trabajo de su equipo.' },
  { number: '03', title: 'Hacer y publicar.', body: 'Planificamos, grabamos, diseñamos y escribimos. Adaptamos piezas para redes, web, video y correo; coordinamos aprobaciones antes de publicar o enviar.' },
  { number: '04', title: 'Medir y ajustar.', body: 'Miramos consultas, respuestas y oportunidades junto con las métricas de contenido. Registramos lo que aprendimos y cambiamos la pauta del siguiente ciclo.' },
];

const capabilities = [
  { label: 'Estrategia', body: 'Públicos, mensajes, recorrido desde el primer contacto hasta la venta y calendario editorial.' },
  { label: 'Contenido', body: 'Video, fotografía, diseño, textos y publicaciones adaptadas a cada canal.' },
  { label: 'Campañas', body: 'Correo y campañas de marketing coordinadas con la oferta, la audiencia y el trabajo comercial.' },
  { label: 'Sistemas', body: 'Formularios, seguimiento de consultas y conexiones entre herramientas cuando ayudan al proceso.' },
];

export default function MarketingForBrandsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const contact = () => navigate('/contacto', { state: { background: location } });
  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <CommercialHero eyebrow="marketing / para tu marca" title="Tu marca tiene algo que decir." description="Hagamos que se vea y se entienda. Pensamos la estrategia y también hacemos el trabajo: contenido, diseño, campañas y sistemas de seguimiento.">
        <button onClick={contact} className="inline-flex items-center gap-2 border border-white bg-white px-6 py-3 text-sm font-black uppercase text-black hover:bg-gvl-yellow hover:border-gvl-yellow">Hablemos de tu marca <ArrowUpRight size={17} /></button>
      </CommercialHero>

      <section className="px-4 pb-20 md:px-12 md:pb-28">
        <div className="mx-auto grid max-w-7xl gap-8 border-t border-white/20 pt-10 md:grid-cols-12 md:gap-12">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-gvl-yellow/70 md:col-span-3">El punto de partida</p>
          <div className="md:col-span-9"><h2 className="max-w-4xl text-4xl font-black leading-none tracking-tighter md:text-6xl">Una marca crece cuando el trabajo tiene dirección.</h2><p className="mt-7 max-w-3xl text-lg leading-relaxed text-white/70">Una publicación aislada puede verse bien y aun así no ayudar a vender. Ordenamos a quién le hablamos, qué necesita saber, dónde ocurre la conversación y quién la continúa. De ahí sale una pauta que podemos producir y revisar juntos.</p></div>
        </div>
      </section>

      <section className="px-4 pb-20 md:px-12 md:pb-28">
        <div className="mx-auto max-w-7xl">
          <p className="mb-5 font-mono text-xs uppercase tracking-[0.25em] text-gvl-yellow/70">Qué podemos trabajar</p>
          <h2 className="mb-10 max-w-3xl text-4xl font-black leading-none tracking-tighter md:text-6xl">De la idea al trabajo publicado.</h2>
          <div className="grid gap-3 md:grid-cols-2">{capabilities.map((item, index) => <article key={item.label} className="flex min-h-[220px] flex-col justify-between border border-white/20 bg-zinc-950 p-7 md:p-9"><p className="font-mono text-xs uppercase tracking-[0.2em] text-gvl-yellow/60">0{index + 1} / {item.label}</p><div><h3 className="mb-3 text-3xl font-black tracking-tight">{item.label}</h3><p className="max-w-xl leading-relaxed text-white/65">{item.body}</p></div></article>)}</div>
        </div>
      </section>

      <section className="px-4 pb-20 md:px-12 md:pb-28">
        <div className="mx-auto max-w-7xl border-t border-white/20 pt-10"><p className="mb-5 font-mono text-xs uppercase tracking-[0.25em] text-gvl-yellow/70">Cómo trabajamos</p><h2 className="mb-10 text-4xl font-black tracking-tighter md:text-6xl">Una secuencia que se puede ejecutar.</h2>
          {stages.map(step => <article key={step.number} className="grid gap-5 border-t border-white/20 py-8 md:grid-cols-12 md:gap-10"><span className="font-mono text-gvl-yellow/60 md:col-span-2">{step.number}</span><h3 className="text-2xl font-black tracking-tight md:col-span-4 md:text-3xl">{step.title}</h3><p className="max-w-2xl leading-relaxed text-white/65 md:col-span-6">{step.body}</p></article>)}
        </div>
      </section>

      <section className="bg-gvl-cream px-4 py-20 text-black md:px-12 md:py-28"><div className="mx-auto max-w-7xl"><p className="mb-5 font-mono text-xs uppercase tracking-[0.25em]">Siguiente paso</p><h2 className="max-w-4xl text-4xl font-black leading-none tracking-tighter md:text-6xl">Cuéntanos qué necesita mover tu marca.</h2><p className="mt-6 max-w-2xl text-lg">Revisamos el punto de partida y proponemos un alcance concreto. La producción, los canales y el ritmo se definen según tu proyecto.</p><button onClick={contact} className="mt-9 inline-flex items-center gap-2 bg-black px-7 py-4 font-black uppercase text-white hover:bg-gvl-orange">Conversemos <ArrowUpRight size={18} /></button></div></section>
    </div>
  );
}
