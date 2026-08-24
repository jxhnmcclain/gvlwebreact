import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import Dither from './Dither.jsx';
import Carousel from './Carousel';

export type AgencyLabProof = {
  label: string;
  value: string;
};

export type AgencyLabOffering = {
  eyebrow: string;
  title: string;
  body: string;
};

export type AgencyLabFaq = { question: string; answer: string };

export type AgencyLabShowcase = {
  eyebrow: string;
  title: string;
  body: string;
  images: string[];
  aspectRatio?: 'video' | 'square' | 'portrait' | 'auto';
};

type AgencyLabPageProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  ascii: string;
  proof: AgencyLabProof[];
  offerings: AgencyLabOffering[];
  showcase?: AgencyLabShowcase[];
  process: string[];
  faq?: AgencyLabFaq[];
  ctaLabel: string;
  onCta: () => void;
};

const AgencyLabPage = ({
  eyebrow,
  title,
  subtitle,
  ascii,
  proof,
  offerings,
  showcase = [],
  process,
  faq = [],
  ctaLabel,
  onCta,
}: AgencyLabPageProps) => {
  return (
    <div className="min-h-screen bg-[#050505] text-white pt-28 md:pt-36 overflow-hidden">
      <section className="relative px-4 md:px-12 pb-16 md:pb-24">
        <div className="ascii-field text-white/70" aria-hidden="true">{ascii}</div>
        <div className="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-12 gap-8 md:gap-12 items-end">
          <div className="lg:col-span-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.34em] text-gvl-yellow/70 mb-8">
              {eyebrow}
            </p>
            <h1 className="text-5xl md:text-7xl lg:text-[7.5rem] font-black leading-[0.88] tracking-tighter max-w-5xl">
              {title}
            </h1>
          </div>

          <div className="lg:col-span-4 brutalist-panel bg-white text-black p-6 md:p-8">
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-black/50 mb-6">
              growth video lab
            </p>
            <p className="text-xl md:text-2xl font-semibold leading-snug">
              {subtitle}
            </p>
            <button
              onClick={onCta}
              className="mt-8 inline-flex items-center gap-3 bg-black text-white px-6 py-3 font-black uppercase tracking-tight hover:bg-gvl-yellow hover:text-black transition-colors"
            >
              {ctaLabel}
              <ArrowUpRight size={18} />
            </button>
          </div>
        </div>
      </section>

      <section className="px-4 md:px-12 pb-16 md:pb-24">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 border border-white/15">
          {proof.map((item) => (
            <div key={item.label} className="p-5 md:p-7 border-r border-b md:border-b-0 border-white/15 last:border-r-0 bg-white/[0.03]">
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/35 mb-3">{item.label}</p>
              <p className="text-lg md:text-xl font-black leading-tight">{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 md:px-12 pb-20 md:pb-28">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-6">
          <div className="lg:col-span-4 relative overflow-hidden border border-white/15 min-h-[420px] p-8 md:p-10 flex flex-col justify-between">
            <div className="absolute inset-0" aria-hidden="true">
              <Dither waveColor={[0.62, 0.62, 0.62]} disableAnimation={false} enableMouseInteraction mouseRadius={0.7} colorNum={2} pixelSize={4} waveAmplitude={0.18} waveFrequency={2.1} waveSpeed={0.025} />
            </div>
            <div className="pointer-events-none absolute inset-0 bg-black/70" />
            <div className="relative z-10">
              <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-gvl-yellow/70 mb-5">metodo</p>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter leading-none">
                Así trabajamos.
              </h2>
            </div>
            <p className="relative z-10 text-white leading-relaxed max-w-sm">
              Definimos qué hacer, lo ejecutamos y revisamos los resultados para ajustar el siguiente paso.
            </p>
          </div>

          <div className="lg:col-span-8 grid md:grid-cols-2 gap-6">
            {offerings.map((item, index) => (
              <article
                key={item.title}
                className={`border border-white/15 p-7 md:p-8 min-h-[260px] flex flex-col justify-between ${
                  index === 1 ? 'bg-white text-black' : 'bg-zinc-950'
                }`}
              >
                <div>
                  <p className={`font-mono text-[10px] uppercase tracking-[0.24em] mb-5 ${index === 1 ? 'text-black/45' : 'text-gvl-yellow/60'}`}>
                    {item.eyebrow}
                  </p>
                  <h3 className="text-2xl md:text-3xl font-black tracking-tight leading-none mb-5">
                    {item.title}
                  </h3>
                </div>
                <p className={`leading-relaxed text-sm md:text-base ${index === 1 ? 'text-black/65' : 'text-white/55'}`}>
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {showcase.length > 0 && (
        <section className="px-4 md:px-12 pb-24 md:pb-32">
          <div className="mx-auto max-w-7xl border-t border-white/15 pt-10 md:pt-14">
            <div className="mb-10 grid gap-5 md:grid-cols-12 md:items-end">
              <div className="md:col-span-8">
                <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.28em] text-gvl-yellow/70">trabajo en contexto</p>
                <h2 className="max-w-4xl text-4xl font-black leading-none tracking-tighter md:text-6xl">
                  Trabajo aplicado.
                </h2>
              </div>
              <p className="max-w-sm text-sm leading-relaxed text-white/55 md:col-span-4 md:justify-self-end">
                Piezas reales pensadas para usarse en los canales donde trabaja cada marca.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              {showcase.map((item, index) => (
                <article key={item.title} className="overflow-hidden border border-white/15 bg-black/60">
                  <Carousel
                    images={item.images}
                    aspectRatio={item.aspectRatio ?? 'square'}
                    className="rounded-none border-b border-white/15 bg-zinc-950"
                  />
                  <div className="grid gap-5 p-6 md:grid-cols-[auto_1fr] md:p-8">
                    <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-gvl-yellow/65">
                      0{index + 1} / {item.eyebrow}
                    </p>
                    <div>
                      <h3 className="mb-3 text-2xl font-black leading-none tracking-tight md:text-3xl">{item.title}</h3>
                      <p className="max-w-xl text-sm leading-relaxed text-white/55 md:text-base">{item.body}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="px-4 md:px-12 pb-24 md:pb-32">
        <div className="max-w-7xl mx-auto border-t border-white/15">
          {process.map((step, index) => (
            <div key={step} className="grid md:grid-cols-12 gap-6 py-8 border-b border-white/15">
              <p className="md:col-span-2 font-mono text-gvl-yellow/60">0{index + 1}</p>
              <p className="md:col-span-10 text-2xl md:text-4xl font-black tracking-tight leading-tight">
                {step}
              </p>
            </div>
          ))}
        </div>
      </section>

      {faq.length > 0 && (
        <section className="px-4 md:px-12 pb-24 md:pb-32">
          <div className="max-w-7xl mx-auto border-t border-white/15 pt-8 md:pt-12">
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-gvl-yellow/70 mb-4">preguntas frecuentes</p>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-10">Preguntas antes de empezar.</h2>
            <div className="grid md:grid-cols-2 gap-x-10">
              {faq.map((item) => (
                <article key={item.question} className="border-t border-white/15 py-6">
                  <h3 className="text-lg md:text-xl font-black mb-3">{item.question}</h3>
                  <p className="text-white/60 leading-relaxed">{item.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default AgencyLabPage;
