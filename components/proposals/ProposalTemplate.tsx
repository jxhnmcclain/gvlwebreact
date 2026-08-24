import React from 'react';
import { motion } from 'framer-motion';
import Logo from '../Logo';
import type { ProposalData } from '../../lib/proposals/types';
import ProposalInterestForm from './ProposalInterestForm';

const ACCENT = '#C8F55A';

const reveal = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

const SectionIntro = ({ index, eyebrow, title, body }: { index: string; eyebrow: string; title: string; body?: string }) => (
  <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={reveal} className="mb-12">
    <p className="mb-4 flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.24em] text-[#C8F55A]">
      <span className="h-px w-6 bg-[#C8F55A]" />
      {index} · {eyebrow}
    </p>
    <h2 className="max-w-3xl text-4xl font-black leading-[0.98] tracking-tighter md:text-6xl">{title}</h2>
    {body && <p className="mt-5 max-w-2xl text-sm leading-7 text-white/50 md:text-base">{body}</p>}
  </motion.div>
);

const ProposalTemplate = ({ proposal }: { proposal: ProposalData }) => {
  const isOffer = proposal.mode === 'offer';
  const labels = proposal.sectionLabels ?? {};
  let sectionCursor = 3;
  const contentIndex = proposal.content ? String(sectionCursor++).padStart(2, '0') : undefined;
  const investmentIndex = proposal.investment ? String(sectionCursor++).padStart(2, '0') : undefined;
  const timelineIndex = String(sectionCursor++).padStart(2, '0');
  const closingIndex = String(sectionCursor).padStart(2, '0');

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#080808] text-[#FAFAF8] selection:bg-[#C8F55A] selection:text-black">
      <header className="absolute left-0 right-0 top-0 z-30 flex items-center justify-between px-6 py-5 md:px-10">
        <div className="origin-left scale-[0.65] md:scale-75">
          <Logo textColor="text-white" />
        </div>
        <p className="font-mono text-[8px] uppercase tracking-[0.22em] text-white/35">{proposal.client} / confidential</p>
      </header>

      <main>
        <section className="grid min-h-screen lg:grid-cols-2">
          <div className="relative flex flex-col justify-center overflow-hidden px-7 pb-16 pt-32 md:px-12 lg:px-16">
            <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,.45)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.45)_1px,transparent_1px)] [background-size:36px_36px]" />
            <motion.div initial="hidden" animate="visible" variants={reveal} className="relative z-10">
              <p className="mb-8 font-mono text-[9px] uppercase tracking-[0.24em] text-[#C8F55A]">
                {proposal.eyebrow} · {proposal.dateLabel}
              </p>
              <h1 className="text-5xl font-black leading-[0.92] tracking-tighter md:text-7xl">
                {proposal.titleLines.map((line) => <React.Fragment key={line}>{line}<br /></React.Fragment>)}
                <span className="text-[#C8F55A]">{proposal.accentLine}</span>
              </h1>
              <p className="mt-8 max-w-xl text-sm leading-7 text-white/55 md:text-base">{proposal.introduction}</p>
              {isOffer ? (
                <div className="mt-10 max-w-xl border-l-2 border-[#C8F55A] bg-white/[0.035] p-5">
                  <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-[#C8F55A]">Para qué sirve</p>
                  <p className="mt-3 text-base leading-7 text-white/85">{proposal.quote}</p>
                </div>
              ) : <blockquote className="mt-10 max-w-xl border-l-2 border-[#C8F55A] bg-white/[0.035] p-5 text-base italic leading-7 text-white/85">“{proposal.quote}”</blockquote>}
            </motion.div>
          </div>

          <div className="relative flex flex-col justify-center border-l border-white/[0.07] bg-[#111] px-7 pb-16 pt-32 md:px-12 lg:px-16">
            <div className="absolute inset-x-0 top-0 h-0.5 bg-[#C8F55A]" />
            {isOffer && proposal.heroSummary ? (
              <div className="relative z-10 max-w-xl">
                <p className="mb-8 font-mono text-[9px] uppercase tracking-[0.22em] text-[#C8F55A]">{proposal.heroSummary.title}</p>
                {proposal.heroSummary.items.map((item, index) => (
                  <motion.article key={item.title} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 + index * 0.1, duration: 0.5 }} className="border-b border-white/[0.07] py-7 last:border-0">
                    <p className="font-mono text-[9px] text-[#C8F55A]">0{index + 1}</p>
                    <h2 className="mt-3 text-xl font-black uppercase tracking-tight">{item.title}</h2>
                    <p className="mt-3 text-sm leading-6 text-white/50">{item.body}</p>
                  </motion.article>
                ))}
              </div>
            ) : proposal.heroStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18 + index * 0.1, duration: 0.5 }}
                className="border-b border-white/[0.07] py-8 last:border-0"
              >
                <p className="text-5xl font-black leading-none tracking-tighter text-[#C8F55A]">{stat.value}</p>
                <p className="mt-3 text-xs font-bold uppercase tracking-wide text-white/65">{stat.label}</p>
                {stat.context && <p className="mt-1 font-mono text-[9px] text-white/25">{stat.context}</p>}
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-7 py-24 md:px-12 md:py-32">
          <SectionIntro index="01" eyebrow={labels.diagnosis ?? 'diagnóstico'} title={proposal.diagnosis.title} body={proposal.diagnosis.introduction} />
          <div className="grid gap-px bg-white/10 md:grid-cols-3">
            {proposal.diagnosis.stats.map((stat) => (
              <article key={stat.label} className="bg-[#0d0d0d] p-7 md:p-9">
                <p className="text-4xl font-black tracking-tighter text-[#C8F55A]">{stat.value}</p>
                <h3 className="mt-5 text-sm font-black uppercase tracking-wide">{stat.label}</h3>
                <p className="mt-3 text-sm leading-6 text-white/45">{stat.context}</p>
              </article>
            ))}
          </div>
          <p className="mt-px border border-white/10 bg-white/[0.025] p-7 text-lg font-semibold leading-8 md:p-9 md:text-2xl">{proposal.diagnosis.conclusion}</p>
        </section>

        <section className="border-y border-white/[0.07] bg-[#0b0b0b]">
          <div className="mx-auto max-w-6xl px-7 py-24 md:px-12 md:py-32">
            <SectionIntro index="02" eyebrow={labels.solution ?? 'solución'} title={proposal.solution.title} body={proposal.solution.introduction} />
            <div className="grid gap-px bg-white/10 md:grid-cols-2">
              {proposal.solution.pillars.map((pillar, index) => (
                <article key={pillar.title} className="group bg-[#101010] p-7 transition-colors hover:bg-[#141414] md:p-9">
                  <p className="font-mono text-[9px] tracking-[0.22em] text-[#C8F55A]">0{index + 1}</p>
                  <h3 className="mt-8 text-2xl font-black uppercase leading-none tracking-tight">{pillar.title}</h3>
                  <p className="mt-5 text-sm leading-7 text-white/50">{pillar.description}</p>
                  <p className="mt-8 font-mono text-[8px] uppercase tracking-[0.18em] text-white/25">{pillar.tag}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {proposal.content && (
          <section className="mx-auto max-w-6xl px-7 py-24 md:px-12 md:py-32">
            <SectionIntro index={contentIndex!} eyebrow={labels.content ?? 'dirección de contenido'} title={proposal.content.title} body={proposal.content.introduction} />
            <div className="grid gap-1 md:grid-cols-2">
              {proposal.content.images.map((image) => (
                <figure key={image.src} className="group relative aspect-video overflow-hidden bg-[#111]">
                  <img src={image.src} alt={image.caption} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/70 to-transparent p-6 pt-20">
                    <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#C8F55A]">{image.label}</p>
                    <p className="mt-1 text-xs text-white/65">{image.caption}</p>
                  </figcaption>
                </figure>
              ))}
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {proposal.content.examples.map((example, index) => (
                <article key={example.title}>
                  <p className="text-4xl font-black text-[#C8F55A]">0{index + 1}</p>
                  <h3 className="mt-5 text-lg font-black uppercase">{example.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/45">{example.description}</p>
                  <blockquote className="mt-5 border-l-2 border-[#C8F55A] pl-4 text-sm italic leading-6 text-[#C8F55A]">“{example.example}”</blockquote>
                </article>
              ))}
            </div>
          </section>
        )}

        {proposal.investment && <section className="border-y border-white/[0.07] bg-[#0b0b0b]">
          <div className="mx-auto max-w-6xl px-7 py-24 md:px-12 md:py-32">
            <SectionIntro index={investmentIndex!} eyebrow={labels.investment ?? 'inversión'} title={proposal.investment.title} body={proposal.investment.introduction} />
            <div className="space-y-4">
              {proposal.investment.plans.map((plan) => (
                <article key={plan.title} className={`border p-7 md:p-10 ${plan.featured ? 'border-[#C8F55A]/40 bg-[#13150f]' : 'border-white/10 bg-[#111]'}`}>
                  <div className="grid gap-8 md:grid-cols-[1fr_240px]">
                    <div>
                      <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#C8F55A]">{plan.eyebrow}</p>
                      <h3 className="mt-4 text-3xl font-black uppercase tracking-tight">{plan.title}</h3>
                      <details className="mt-7 group">
                        <summary className="cursor-pointer list-none font-mono text-[9px] uppercase tracking-[0.18em] text-[#C8F55A]">Ver entregables <span className="ml-2 inline-block transition-transform group-open:rotate-180">↓</span></summary>
                        <ul className="mt-6 grid gap-3 border-t border-white/10 pt-6 md:grid-cols-2">
                          {plan.deliverables.map((item) => <li key={item} className="flex gap-2 text-xs leading-5 text-white/50 before:text-[#C8F55A] before:content-['→']">{item}</li>)}
                        </ul>
                      </details>
                    </div>
                    <div className={`flex flex-col items-center justify-center border p-7 text-center ${plan.featured ? 'border-[#C8F55A]/25 bg-[#C8F55A]/5' : 'border-white/10 bg-white/[0.025]'}`}>
                      <p className={`text-4xl font-black tracking-tighter ${plan.featured ? 'text-[#C8F55A]' : 'text-white'}`}>{plan.price}</p>
                      <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.18em] text-white/30">{plan.cadence}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {proposal.investment.addons && (
              <div className="mt-10 grid gap-4 md:grid-cols-2">
                {proposal.investment.addons.map((addon) => (
                  <article key={addon.title} className="border border-white/10 bg-[#111] p-7">
                    <div className="flex items-start justify-between gap-5">
                      <h3 className="text-lg font-black uppercase">{addon.title}</h3>
                      <div className="shrink-0 text-right"><p className="font-black text-[#C8F55A]">{addon.price}</p><p className="font-mono text-[8px] uppercase text-white/25">{addon.cadence}</p></div>
                    </div>
                    <p className="mt-5 text-sm leading-6 text-white/45">{addon.description}</p>
                  </article>
                ))}
              </div>
            )}

            {proposal.investment.guarantee && <p className="mt-4 border border-white/10 bg-black p-6 text-sm leading-7 text-white/55"><strong className="text-white">Garantía de inicio:</strong> {proposal.investment.guarantee}</p>}
            {proposal.investment.roiTitle && (
              <div className="mt-4 bg-[#C8F55A] p-7 text-black md:p-10">
                <h3 className="text-xl font-black leading-tight md:text-2xl">{proposal.investment.roiTitle}</h3>
                {proposal.investment.roiBody && <p className="mt-3 max-w-2xl text-sm leading-6 text-black/65">{proposal.investment.roiBody}</p>}
              </div>
            )}
          </div>
        </section>}

        <section className="mx-auto max-w-6xl px-7 py-24 md:px-12 md:py-32">
          <SectionIntro index={timelineIndex} eyebrow={labels.timeline ?? 'timeline'} title={proposal.timeline.title} />
          <div className="border-t border-white/10">
            {proposal.timeline.items.map((item) => (
              <article key={item.period} className="grid gap-3 border-b border-white/10 py-7 md:grid-cols-[150px_1fr] md:gap-8">
                <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#C8F55A]">{item.period}</p>
                <div><h3 className="font-black uppercase">{item.title}</h3><p className="mt-2 max-w-xl text-sm leading-6 text-white/45">{item.description}</p></div>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-white px-7 py-24 text-black md:px-12 md:py-28">
          <div className="mx-auto max-w-6xl">
            <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-black/40">{closingIndex} · {labels.closing ?? 'siguiente paso'}</p>
            <h2 className="mt-5 max-w-4xl text-5xl font-black uppercase leading-[0.92] tracking-tighter md:text-7xl">{proposal.closing.title}</h2>
            <p className="mt-6 text-base text-black/55">{proposal.closing.body}</p>
            <div className="mt-12 grid grid-cols-2 gap-5 border-t border-black/10 pt-8 md:grid-cols-5">
              {proposal.closing.terms.map((term) => <div key={term.label}><p className="font-mono text-[8px] uppercase tracking-[0.16em] text-black/35">{term.label}</p><p className="mt-1 text-sm font-black uppercase">{term.value}</p></div>)}
            </div>
            {isOffer && <ProposalInterestForm proposalId={proposal.id} proposalName={`${proposal.titleLines.join(' ')} ${proposal.accentLine}`} options={proposal.interestOptions} />}
          </div>
        </section>
      </main>

      <footer className="flex flex-col items-center justify-between gap-4 border-t border-white/[0.07] px-7 py-12 md:flex-row md:px-12">
        <div className="origin-left scale-[0.5] opacity-45"><Logo textColor="text-white" /></div>
        <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/20">Propuesta {proposal.client} · {proposal.dateLabel}</p>
      </footer>
    </div>
  );
};

export default ProposalTemplate;
