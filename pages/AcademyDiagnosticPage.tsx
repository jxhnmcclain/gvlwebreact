import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Check, CheckCircle2, RotateCcw, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import TurnstileWidget from '../components/TurnstileWidget';
import { getUTMParams } from '../lib/utm';
import { Answers, QuestionId, deriveDiagnostic, getQuestionFlow, questions, serializeDiagnostic } from '../lib/academyDiagnostic';

type Phase = 'intro' | 'questions' | 'result';
const STORAGE_KEY = 'gvl-academy-diagnostic-v1';
const BRANCH_QUESTIONS: QuestionId[] = ['beginnerInput', 'beginnerMaterial', 'prototypeData', 'prototypeAccess', 'publishedUsers', 'publishedErrors'];

function readSaved(): { answers: Answers; index: number; phase: Phase } {
  if (typeof window === 'undefined') return { answers: {}, index: 0, phase: 'intro' };
  try {
    const saved = JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? 'null');
    if (!saved || typeof saved !== 'object' || !saved.answers || typeof saved.answers !== 'object') throw new Error('empty');
    const answers: Answers = {};
    for (const [id, value] of Object.entries(saved.answers)) {
      if (id in questions && questions[id as QuestionId].choices.some(choice => choice.value === value)) answers[id as QuestionId] = value as string;
    }
    const flow = getQuestionFlow(answers);
    const index = Number.isInteger(saved.index) ? Math.min(Math.max(saved.index, 0), flow.length - 1) : 0;
    const phase: Phase = ['intro', 'questions', 'result'].includes(saved.phase) ? saved.phase : 'intro';
    return { answers, index, phase };
  } catch {
    return { answers: {}, index: 0, phase: 'intro' };
  }
}

export default function AcademyDiagnosticPage() {
  const initial = useMemo(readSaved, []);
  const [answers, setAnswers] = useState<Answers>(initial.answers);
  const [index, setIndex] = useState(initial.index);
  const [phase, setPhase] = useState<Phase>(initial.phase);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState('');
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'sending' | 'success'>('idle');
  const [submitError, setSubmitError] = useState('');
  const headingRef = useRef<HTMLHeadingElement>(null);
  const flow = getQuestionFlow(answers);
  const currentId = flow[Math.min(index, flow.length - 1)];
  const current = questions[currentId];
  const result = deriveDiagnostic(answers);

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ answers, index, phase }));
  }, [answers, index, phase]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    headingRef.current?.focus();
  }, [phase, index]);

  function choose(value: string) {
    setAnswers(previous => {
      const next = { ...previous, [currentId]: value };
      if (currentId === 'built' && previous.built !== value) BRANCH_QUESTIONS.forEach(id => { delete next[id]; });
      return next;
    });
  }

  function next() {
    if (!answers[currentId]) return;
    if (index < flow.length - 1) setIndex(index + 1);
    else setPhase('result');
  }

  function back() {
    if (phase === 'result') { setPhase('questions'); setIndex(flow.length - 1); return; }
    if (index > 0) setIndex(index - 1);
    else setPhase('intro');
  }

  function restart() {
    sessionStorage.removeItem(STORAGE_KEY);
    setAnswers({});
    setIndex(0);
    setPhase('intro');
    setSubmitStatus('idle');
    setSubmitError('');
  }

  async function joinWaitlist(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitError('');
    if (!turnstileToken) { setSubmitError('Completa la verificación para entrar en la lista.'); return; }
    const detail = serializeDiagnostic(answers);
    if (detail.length > 1000) { setSubmitError('No pudimos preparar tu resultado. Intenta de nuevo.'); return; }
    setSubmitStatus('sending');
    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ kind: 'academy', option: '', name: name.trim(), email: email.trim(), detail, consent, website, turnstileToken, page_url: window.location.href, ...getUTMParams() }),
      });
      if (!response.ok) throw new Error('save_failed');
      setSubmitStatus('success');
      (window as Window & { gtag?: (...args: unknown[]) => void }).gtag?.('event', 'academy_waitlist_success', { level: result.level, goal: result.goal, source: 'diagnostic' });
    } catch {
      setSubmitError('No pudimos guardar tu correo. Conservamos tu resultado aquí; intenta de nuevo más tarde.');
      setTurnstileToken(null);
      setSubmitStatus('idle');
    }
  }

  return (
    <div className="min-h-[100dvh] bg-gvl-cream text-gvl-black">
      <header className="flex min-h-16 items-center justify-between border-b border-black/20 bg-[#050505] px-4 text-white md:px-10">
        <Link to="/academia" aria-label="Volver a la academia" className="inline-flex items-center gap-2 font-black tracking-tighter focus-visible:outline focus-visible:outline-2 focus-visible:outline-gvl-yellow">
          <span className="text-xl uppercase">Growth<span className="font-pixel font-normal normal-case">Video</span>Lab</span>
          <span className="hidden border-l border-white/35 pl-3 font-mono text-[10px] font-normal uppercase tracking-[0.2em] text-white/60 sm:inline">Academia</span>
        </Link>
        <Link to="/academia" className="inline-flex min-h-11 items-center gap-2 text-xs font-bold uppercase tracking-wide text-white/80 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-gvl-yellow">
          Salir <X size={17} aria-hidden="true" />
        </Link>
      </header>

      <>
        {phase === 'intro' && (
          <main key="intro" className="diagnostic-enter px-4 py-7 md:px-12 md:py-12">
            <div className="relative mx-auto flex min-h-[calc(100dvh-8rem)] max-w-7xl flex-col justify-between overflow-hidden border border-white/20 bg-[#050505] p-7 text-white md:p-12">
              <div className="dither-bg pointer-events-none absolute inset-0 opacity-30" aria-hidden="true" />
              <div className="relative z-10">
                <p className="mb-8 font-mono text-xs uppercase tracking-[0.25em] text-gvl-yellow">Academia / diagnóstico</p>
                <h1 ref={headingRef} tabIndex={-1} className="max-w-5xl text-[clamp(2.8rem,8vw,7rem)] font-black leading-[0.95] tracking-tighter focus:outline-none">Tu siguiente paso para crear con IA.</h1>
              </div>
              <div className="relative z-10 mt-20 max-w-2xl">
                <p className="text-lg leading-relaxed text-white/85 md:text-2xl">Cuéntame qué quieres construir y qué has probado. Al terminar tendrás un punto de partida y un ejercicio para hacerlo real.</p>
                <p className="mt-5 font-mono text-xs uppercase tracking-[0.16em] text-white/55">El curso está en construcción · el resultado se ve sin dejar tu correo</p>
                <button onClick={() => { setIndex(0); setPhase('questions'); }} className="mt-9 inline-flex min-h-14 w-full items-center justify-between bg-gvl-yellow px-6 text-base font-black uppercase text-black transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gvl-yellow sm:w-auto sm:min-w-72">
                  Empezar <ArrowRight aria-hidden="true" size={20} />
                </button>
              </div>
            </div>
          </main>
        )}

        {phase === 'questions' && (
          <main key={`question-${currentId}`} className="diagnostic-enter mx-auto min-h-[calc(100dvh-4rem)] max-w-7xl px-4 py-8 md:px-12 md:py-16">
            <div className="mb-6 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.2em] md:mb-10">
              <span>{current.chapter}</span><span>Paso {index + 1}{answers.built ? ` / ${flow.length}` : ''}</span>
            </div>
            <div role="progressbar" aria-label="Progreso del diagnóstico" aria-valuenow={index + 1} aria-valuemin={1} aria-valuemax={answers.built ? flow.length : 11} className="h-1 w-full bg-black/15"><div className="h-full bg-black transition-[width] duration-300 motion-reduce:transition-none" style={{ width: `${((index + 1) / (answers.built ? flow.length : 11)) * 100}%` }} /></div>
            <div className="mt-8 grid gap-8 md:mt-12 md:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] md:gap-14">
              <div className="hidden border-t-2 border-black pt-6 md:block">
                <p className="font-mono text-xs uppercase tracking-[0.2em]">01 / Tu idea<br />02 / Lo que ya hiciste<br />03 / Siguiente paso</p>
                <p className="mt-9 max-w-xs text-lg leading-relaxed text-gvl-dark-gray">Una pregunta a la vez. Puedes volver y cambiar cualquier respuesta.</p>
              </div>
              <section aria-labelledby="diagnostic-question" className="border-2 border-black bg-white p-5 shadow-[8px_8px_0_0_#000] sm:p-8 md:p-10">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-gvl-dark-gray">{String(index + 1).padStart(2, '0')} / {current.chapter}</p>
                <h2 id="diagnostic-question" ref={headingRef} tabIndex={-1} className="mt-5 max-w-2xl text-3xl font-black leading-[1.04] tracking-tighter outline-none sm:text-4xl md:text-5xl">{current.title}</h2>
                {current.help && <p className="mt-4 max-w-xl text-sm leading-relaxed text-gvl-dark-gray">{current.help}</p>}
                <div role="group" aria-labelledby="diagnostic-question" className="mt-8 grid gap-3">
                  {current.choices.map((choice, choiceIndex) => {
                    const selected = answers[currentId] === choice.value;
                    return <button key={choice.value} type="button" aria-pressed={selected} onClick={() => choose(choice.value)} className={`flex min-h-16 w-full items-center gap-4 border-2 px-4 py-3 text-left font-bold leading-snug transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black sm:px-5 ${selected ? 'border-black bg-gvl-yellow text-black' : 'border-black/25 bg-gvl-cream hover:border-black hover:bg-gvl-yellow/20'}`}>
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center border border-current font-mono text-xs" aria-hidden="true">{selected ? <Check size={17} /> : String(choiceIndex + 1).padStart(2, '0')}</span>
                      {choice.label}
                    </button>;
                  })}
                </div>
                <div className="mt-9 flex items-center justify-between gap-4 border-t border-black/20 pt-6">
                  <button type="button" onClick={back} className="inline-flex min-h-12 items-center gap-2 text-sm font-bold underline underline-offset-4"><ArrowLeft size={17} aria-hidden="true" /> Volver</button>
                  <button type="button" onClick={next} disabled={!answers[currentId]} className="inline-flex min-h-12 items-center gap-3 bg-black px-5 text-sm font-black uppercase text-white hover:bg-gvl-orange disabled:cursor-not-allowed disabled:opacity-40 sm:px-7">{index === flow.length - 1 ? 'Ver mi resultado' : 'Seguir'} <ArrowRight size={17} aria-hidden="true" /></button>
                </div>
              </section>
            </div>
          </main>
        )}

        {phase === 'result' && (
          <main key="result" className="diagnostic-enter px-4 pb-20 pt-8 md:px-12 md:pt-14">
            <div className="mx-auto max-w-7xl">
              <div className="border border-white/20 bg-[#050505] p-7 text-white md:p-12">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-gvl-yellow">Tu punto de partida / según tus respuestas</p>
                <h1 ref={headingRef} tabIndex={-1} className="mt-5 text-5xl font-black leading-none tracking-tighter outline-none sm:text-7xl md:text-8xl">Nivel {result.level}<span className="text-gvl-yellow">.</span></h1>
                <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/80 md:text-2xl">{result.reason}</p>
              </div>
              <div className="grid gap-9 border-2 border-t-0 border-black bg-white p-6 shadow-[8px_8px_0_0_#000] md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] md:gap-14 md:p-12">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.2em]">Tu primer ejercicio</p>
                  <h2 className="mt-5 max-w-2xl text-3xl font-black leading-tight tracking-tighter md:text-5xl">{result.exercise.title}</h2>
                  <ol className="mt-9 space-y-0 border-t-2 border-black">
                    {result.exercise.steps.map((step, stepIndex) => <li key={step} className="grid grid-cols-[2rem_1fr] gap-3 border-b border-black/25 py-4 text-base leading-relaxed"><span className="font-mono text-xs font-bold">{String(stepIndex + 1).padStart(2, '0')}</span><span>{step}</span></li>)}
                  </ol>
                  <p className="mt-6 border-l-4 border-gvl-yellow pl-4 text-sm leading-relaxed"><strong>Comprueba:</strong> {result.exercise.proof}</p>
                </div>
                <aside className="border-t-2 border-black pt-6 md:border-t-0 md:border-l-2 md:pl-9 md:pt-0">
                  <p className="font-mono text-xs uppercase tracking-[0.2em]">Para tu caso</p>
                  <p className="mt-5 leading-relaxed">{result.roleNote}</p>
                  <p className="mt-4 leading-relaxed">{result.startingNote}</p>
                  <p className="mt-4 leading-relaxed">{result.toolNote}</p>
                  <p className="mt-4 leading-relaxed">{result.technicalNote}</p>
                  <p className="mt-4 leading-relaxed">{result.blockerNote}</p>
                  <p className="mt-4 leading-relaxed">{result.testingNote}</p>
                  <p className="mt-4 leading-relaxed">{result.timeNote}</p>
                  <p className="mt-8 text-sm text-gvl-dark-gray">Esta recomendación sale de tus respuestas. Puedes corregirlas si algo no te representa.</p>
                  <button onClick={back} className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-bold underline underline-offset-4"><ArrowLeft size={16} aria-hidden="true" /> Revisar respuestas</button>
                  <button onClick={restart} className="mt-1 flex min-h-11 items-center gap-2 text-sm font-bold underline underline-offset-4"><RotateCcw size={15} aria-hidden="true" /> Empezar de nuevo</button>
                </aside>
              </div>

              <section className="mt-14 grid gap-8 md:grid-cols-2 md:gap-16" aria-labelledby="academy-followup">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.2em]">El recorrido completo</p>
                  <h2 id="academy-followup" className="mt-5 text-3xl font-black leading-tight tracking-tighter md:text-5xl">Este es un primer paso. El curso sigue en construcción.</h2>
                  <p className="mt-5 max-w-xl leading-relaxed text-gvl-dark-gray">Estoy preparando tres niveles para que creativos conviertan una idea en una herramienta y lleguen a publicar una app. Tu ejercicio se puede hacer ahora, sin esperar el curso.</p>
                  <Link to="/academia#recorrido" className="mt-7 inline-flex min-h-12 items-center gap-2 font-bold underline underline-offset-4">Ver el recorrido del curso <ArrowRight size={18} aria-hidden="true" /></Link>
                </div>
                <div className="border-2 border-black bg-white p-6 md:p-9">
                  {submitStatus === 'success' ? (
                    <div role="status" className="py-8"><CheckCircle2 size={38} /><h3 className="mt-5 text-2xl font-black uppercase">Quedaste en la lista.</h3><p className="mt-4 leading-relaxed">Guardamos tu correo y el punto de partida sugerido para avisarte cuando haya novedades del curso.</p></div>
                  ) : (
                    <form onSubmit={joinWaitlist} className="space-y-5">
                      <h3 className="text-2xl font-black uppercase tracking-tight">Recibir novedades</h3>
                      <p className="text-sm leading-relaxed text-gvl-dark-gray">Te avisaré cuando tenga avances del curso. No crea una cuenta ni reserva un cupo.</p>
                      <label className="block text-sm font-bold">Nombre<input required maxLength={120} autoComplete="name" value={name} onChange={event => setName(event.target.value)} className="mt-2 min-h-12 w-full border-2 border-black bg-gvl-cream p-3 font-normal" /></label>
                      <label className="block text-sm font-bold">Correo<input required type="email" maxLength={254} autoComplete="email" value={email} onChange={event => setEmail(event.target.value)} className="mt-2 min-h-12 w-full border-2 border-black bg-gvl-cream p-3 font-normal" /></label>
                      <div className="hidden" aria-hidden="true"><label>Sitio web<input tabIndex={-1} autoComplete="off" value={website} onChange={event => setWebsite(event.target.value)} /></label></div>
                      <TurnstileWidget onVerify={setTurnstileToken} onError={() => { setTurnstileToken(null); setSubmitError('No se pudo completar la verificación. Recarga la página e inténtalo de nuevo.'); }} />
                      <label className="flex items-start gap-3 text-sm leading-relaxed"><input required type="checkbox" checked={consent} onChange={event => setConsent(event.target.checked)} className="mt-1" /><span>Quiero recibir por correo novedades de este curso en construcción y material educativo relacionado con crear herramientas con IA. Growth Video Lab guardará mi nombre, correo, respuestas y resultado para enviarme estos mensajes. Puedo pedir la baja en <a href="mailto:hola@growthvideolab.com?subject=Baja%20academia" className="underline">hola@growthvideolab.com</a>.</span></label>
                      {submitError && <p role="alert" className="text-sm font-bold text-red-700">{submitError}</p>}
                      <button type="submit" disabled={submitStatus === 'sending' || !turnstileToken} className="flex min-h-14 w-full items-center justify-center gap-3 bg-black px-5 text-sm font-black uppercase text-white hover:bg-gvl-orange disabled:cursor-not-allowed disabled:opacity-50">{submitStatus === 'sending' ? 'Guardando…' : 'Entrar en la lista'} <ArrowRight size={18} aria-hidden="true" /></button>
                    </form>
                  )}
                </div>
              </section>
            </div>
          </main>
        )}
      </>
    </div>
  );
}
