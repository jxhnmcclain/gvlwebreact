import React, { useState } from 'react';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { N8N_WEBHOOKS } from '../../lib/config';
import TurnstileWidget from '../TurnstileWidget';
import { getUTMParams } from '../../lib/utm';

type ProposalInterestFormProps = {
  proposalId: string;
  proposalName: string;
  options?: string[];
};

const ProposalInterestForm = ({ proposalId, proposalName, options = [] }: ProposalInterestFormProps) => {
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', message: '', interest: options[0] ?? '' });
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');
  const isLocal = import.meta.env.DEV;

  const update = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');

    if (!form.name.trim() || !form.email.trim() || !form.company.trim()) {
      setError('Completa tu nombre, empresa y correo para enviarnos la solicitud.');
      return;
    }

    if (!isLocal && !turnstileToken) {
      setError('Confirma que no eres un robot para enviar la solicitud.');
      return;
    }

    setStatus('sending');
    try {
      const response = await fetch(N8N_WEBHOOKS.CONTACT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          company: form.company,
          phone: form.phone,
          message: form.message || `Interés en: ${form.interest || proposalName}`,
          leadSource: 'proposal',
          proposalId,
          proposalName,
          selectedOption: form.interest || undefined,
          turnstileToken,
          ...getUTMParams(),
        }),
      });

      if (!response.ok) throw new Error('No se pudo enviar');
      setStatus('success');
    } catch {
      setStatus('error');
      setError('No pudimos enviar tu solicitud. Escríbenos a hola@growthvideolab.com.');
    }
  };

  if (status === 'success') {
    return (
      <div className="border border-white/15 bg-white/[0.04] p-8 text-center md:p-12">
        <CheckCircle2 className="mx-auto h-9 w-9 text-[#C8F55A]" />
        <h3 className="mt-5 text-3xl font-black tracking-tight">Recibimos tu solicitud.</h3>
        <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-white/55">Te respondemos con los siguientes pasos y, si hace falta, ajustamos el alcance a tu caso.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="border border-white/15 bg-[#0c0c0c] p-6 md:p-10">
      <div className="grid gap-x-8 gap-y-6 md:grid-cols-2">
        <label className="block">
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/40">Tu nombre</span>
          <input name="name" value={form.name} onChange={update} required autoComplete="name" placeholder="Nombre y apellido" className="mt-2 w-full border-b border-white/20 bg-transparent py-3 text-base text-white outline-none placeholder:text-white/25 focus:border-[#C8F55A]" />
        </label>
        <label className="block">
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/40">Empresa</span>
          <input name="company" value={form.company} onChange={update} required autoComplete="organization" placeholder="Nombre de la empresa" className="mt-2 w-full border-b border-white/20 bg-transparent py-3 text-base text-white outline-none placeholder:text-white/25 focus:border-[#C8F55A]" />
        </label>
        <label className="block">
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/40">Correo</span>
          <input name="email" type="email" value={form.email} onChange={update} required autoComplete="email" placeholder="nombre@empresa.com" className="mt-2 w-full border-b border-white/20 bg-transparent py-3 text-base text-white outline-none placeholder:text-white/25 focus:border-[#C8F55A]" />
        </label>
        <label className="block">
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/40">Teléfono / WhatsApp</span>
          <input name="phone" type="tel" value={form.phone} onChange={update} autoComplete="tel" placeholder="Opcional" className="mt-2 w-full border-b border-white/20 bg-transparent py-3 text-base text-white outline-none placeholder:text-white/25 focus:border-[#C8F55A]" />
        </label>
      </div>

      {options.length > 0 && (
        <label className="mt-7 block">
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/40">Me interesa</span>
          <select name="interest" value={form.interest} onChange={update} className="mt-2 w-full border-b border-white/20 bg-[#0c0c0c] py-3 text-base text-white outline-none focus:border-[#C8F55A]">
            {options.map((option) => <option key={option} value={option}>{option}</option>)}
          </select>
        </label>
      )}

      <label className="mt-7 block">
        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/40">Qué te gustaría resolver</span>
        <textarea name="message" value={form.message} onChange={update} rows={3} placeholder="Cuéntanos brevemente qué necesitas." className="mt-2 w-full resize-none border-b border-white/20 bg-transparent py-3 text-base leading-6 text-white outline-none placeholder:text-white/25 focus:border-[#C8F55A]" />
      </label>

      <div className="mt-7 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          {isLocal ? <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-white/30">Captcha se activa en producción.</p> : <TurnstileWidget onVerify={setTurnstileToken} theme="dark" />}
          {error && <p className="mt-3 text-sm text-red-300">{error}</p>}
        </div>
        <button type="submit" disabled={status === 'sending'} className="inline-flex items-center gap-2 bg-white px-6 py-3 text-sm font-black text-black transition-transform hover:scale-[1.02] disabled:opacity-60">
          {status === 'sending' ? 'Enviando…' : 'Quiero conversar'}
          <ArrowUpRight size={17} />
        </button>
      </div>
    </form>
  );
};

export default ProposalInterestForm;
