import React from 'react';
import Dither from './Dither.jsx';

type Props = { eyebrow: string; title: string; description: string; children?: React.ReactNode };

export default function CommercialHero({ eyebrow, title, description, children }: Props) {
  return (
    <section className="bg-[#050505] px-4 pb-12 pt-32 text-white md:px-12 md:pb-20 md:pt-40">
      <div className="relative mx-auto flex min-h-[540px] max-w-7xl flex-col justify-between gap-14 overflow-hidden border border-white/20 p-7 md:min-h-[520px] md:p-12">
        <div className="absolute inset-0" aria-hidden="true"><Dither waveColor={[0.62, 0.62, 0.62]} disableAnimation={false} enableMouseInteraction={false} mouseRadius={0.7} colorNum={2} pixelSize={4} waveAmplitude={0.18} waveFrequency={2.1} waveSpeed={0.025} /></div>
        <div className="pointer-events-none absolute inset-0 bg-black/80" aria-hidden="true" />
        <div className="relative z-10">
          <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.28em] text-gvl-yellow/70">{eyebrow}</p>
          <h1 className="max-w-5xl text-4xl font-black leading-[0.98] tracking-tighter sm:text-6xl lg:text-7xl">{title}</h1>
        </div>
        <div className="relative z-10 max-w-3xl">
          <p className="text-lg leading-relaxed text-white/85 md:text-2xl">{description}</p>
          {children && <div className="mt-7">{children}</div>}
        </div>
      </div>
    </section>
  );
}
