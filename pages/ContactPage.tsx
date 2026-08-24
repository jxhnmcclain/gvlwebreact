import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';
import { N8N_WEBHOOKS } from '../lib/config';
import TurnstileWidget from '../components/TurnstileWidget';
import Dither from '../components/Dither.jsx';
import Logo from '../components/Logo';

import { getUTMParams } from '../lib/utm';

type FormState = {
  name: string;
  email: string;
  company: string;
  phone: string;
  message: string;
};

type Errors = Partial<FormState> & { turnstile?: string; submit?: string };

const ContactPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: ''
  });
  const [errors, setErrors] = useState<Errors>({});
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const isPrerendering =
    typeof navigator !== 'undefined' && navigator.userAgent.includes('HeadlessChrome');

  useEffect(() => {
    const previousBodyOverflow = document.body.style.overflow;
    const previousRootOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousRootOverflow;
    };
  }, []);



  const validate = (): boolean => {
    const newErrors: Errors = {};
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es obligatorio';
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El correo es obligatorio';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Ingresa un correo válido';
      isValid = false;
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'El teléfono es obligatorio';
      isValid = false;
    }

    // Company is optional

    if (!formData.message.trim()) {
      newErrors.message = 'Cuéntanos tu idea (es obligatorio)';
      isValid = false;
    }

    if (!turnstileToken) {
      newErrors.turnstile = 'Por favor verifica que no eres un robot';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field when user types
    if (errors[name as keyof FormState]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('submitting');
    const utmParams = getUTMParams();

    try {
      await fetch(N8N_WEBHOOKS.CONTACT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, turnstileToken, ...utmParams })
      });
    } catch (error) {
      console.error('Error sending form:', error);
    }


    // Simulate delay for UX
    setTimeout(() => {
      console.log('Form POSTed to n8n', { ...formData, turnstileToken });
      setStatus('success');
      setErrors({});
    }, 1500);
  };

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[60] flex h-[100dvh] w-full flex-col overflow-hidden bg-black text-white"
    >
      {isPrerendering ? (
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_32%),radial-gradient(circle_at_20%_80%,rgba(255,255,255,0.04),transparent_22%)]"
          aria-hidden="true"
        />
      ) : (
        <div className="absolute inset-0" aria-hidden="true">
          <Dither
            waveColor={[0.42, 0.42, 0.45]}
            disableAnimation={false}
            enableMouseInteraction={false}
            mouseRadius={0.45}
            colorNum={3}
            pixelSize={3}
            waveAmplitude={0.04}
            waveFrequency={1.2}
            waveSpeed={0.014}
          />
        </div>
      )}
      <div className="absolute inset-0 bg-black/75" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_32%),radial-gradient(circle_at_20%_80%,rgba(255,255,255,0.04),transparent_22%)]" />

      {/* Header with Close Button */}
      <div className="relative z-10 shrink-0 px-6 pt-3 md:px-10 md:pt-3 lg:px-12">
        <div className="relative mx-auto flex w-full max-w-7xl items-center justify-center">
          <div className="h-[58px] origin-center scale-[0.62] md:h-[66px] md:scale-[0.72]">
            <Logo textColor="text-white" />
          </div>
          <button
            onClick={() => navigate(-1)}
            aria-label="Cerrar formulario"
            className="group absolute right-0 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/8 text-white/80 transition-colors hover:text-white"
          >
            <X size={16} className="transition-transform duration-300 group-hover:rotate-90" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex min-h-0 flex-1 items-center justify-center px-4 py-4 sm:px-6 md:px-8 md:py-2">
        <AnimatePresence mode='wait'>
          {status === 'success' ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="text-center max-w-2xl"
            >
              <div className="flex justify-center mb-6">
                <CheckCircle size={80} className="text-black" />
              </div>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6 leading-none">
                ¡Mensaje Enviado!
              </h2>
              <p className="text-xl font-medium mb-8">
                Gracias por escribirnos, {formData.name}.<br />
                Analizaremos tu proyecto y te responderemos pronto.
              </p>
              <button
                onClick={() => navigate(-1)}
                className="bg-black text-gvl-yellow px-8 py-3 rounded-full font-bold uppercase hover:bg-white hover:text-black transition-colors"
              >
                Volver al sitio
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-5xl"
            >
              <div className="mx-auto mb-5 max-w-3xl text-center md:mb-4">
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.05 }}
                  className="mb-2 font-sans text-[10px] uppercase tracking-[0.28em] text-white/55"
                >
                  Growth Video Lab
                </motion.p>
                <motion.h1
                  initial={{ opacity: 0, y: 22, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 0.75, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="text-3xl font-black uppercase leading-[0.92] tracking-tighter sm:text-4xl md:text-[2.7rem] lg:text-5xl"
                >
                  Hablemos de <br /> tu proyecto
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.16 }}
                  className="mx-auto mt-2 max-w-2xl font-sans text-xs leading-relaxed text-white/60 md:text-sm"
                >
                  Cuéntanos qué necesitas y te respondemos con una propuesta clara, corta y accionable.
                </motion.p>
              </div>

              <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
                <div className="rounded-[1.25rem] border border-white/10 bg-black/40 p-4 shadow-[0_30px_120px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:p-5 md:p-5 lg:p-6">
                  <div className="grid grid-cols-2 gap-x-4 gap-y-3 md:gap-x-6 md:gap-y-4">
                    <div className="group relative">
                      <label htmlFor="name" className="mb-1 hidden text-[10px] font-sans uppercase tracking-[0.2em] text-white/45 sm:block">
                        Tu nombre
                      </label>
                      <input
                        id="name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Escribe tu nombre"
                        className={`w-full bg-transparent border-b border-white/15 text-sm sm:text-base font-sans placeholder:text-white/28 focus:outline-none py-2 transition-colors
                                ${errors.name ? 'border-red-500 text-red-300 focus:border-red-500' : 'text-white focus:border-white'}`}
                      />
                      {errors.name && (
                        <div className="mt-1.5 flex items-center gap-1 text-red-400 font-sans text-[11px] md:text-sm">
                          <AlertCircle size={16} /> {errors.name}
                        </div>
                      )}
                    </div>

                    <div className="group relative">
                      <label htmlFor="email" className="mb-1 hidden text-[10px] font-sans uppercase tracking-[0.2em] text-white/45 sm:block">
                        Tu correo electrónico
                      </label>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="nombre@empresa.com"
                        className={`w-full bg-transparent border-b border-white/15 text-sm sm:text-base font-sans placeholder:text-white/28 focus:outline-none py-2 transition-colors
                                ${errors.email ? 'border-red-500 text-red-300 focus:border-red-500' : 'text-white focus:border-white'}`}
                      />
                      {errors.email && (
                        <div className="mt-1.5 flex items-center gap-1 text-red-400 font-sans text-[11px] md:text-sm">
                          <AlertCircle size={16} /> {errors.email}
                        </div>
                      )}
                    </div>

                    <div className="group relative">
                      <label htmlFor="phone" className="mb-1 hidden text-[10px] font-sans uppercase tracking-[0.2em] text-white/45 sm:block">
                        Tu teléfono / whatsapp
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+56 9 1234 5678"
                        className={`w-full bg-transparent border-b border-white/15 text-sm sm:text-base font-sans placeholder:text-white/28 focus:outline-none py-2 transition-colors
                                ${errors.phone ? 'border-red-500 text-red-300 focus:border-red-500' : 'text-white focus:border-white'}`}
                      />
                      {errors.phone && (
                        <div className="mt-1.5 flex items-center gap-1 text-red-400 font-sans text-[11px] md:text-sm">
                          <AlertCircle size={16} /> {errors.phone}
                        </div>
                      )}
                    </div>

                    <div className="group relative">
                      <label htmlFor="company" className="mb-1 hidden text-[10px] font-sans uppercase tracking-[0.2em] text-white/45 sm:block">
                        Empresa
                      </label>
                      <input
                        id="company"
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Nombre de tu empresa"
                        className="w-full border-b border-white/15 bg-transparent py-2 font-sans text-sm text-white transition-colors placeholder:text-white/28 focus:border-white focus:outline-none sm:text-base"
                      />
                    </div>
                  </div>

                  <div className="mt-3 md:mt-4">
                    <div className="group relative">
                      <label htmlFor="message" className="mb-1 hidden text-[10px] font-sans uppercase tracking-[0.2em] text-white/45 sm:block">
                        Cuéntanos tu idea
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        rows={2}
                        placeholder="Qué estás buscando, qué necesitas resolver o qué te gustaría construir"
                        className={`w-full bg-transparent border-b border-white/15 text-sm sm:text-base font-sans placeholder:text-white/28 focus:outline-none py-2 resize-none leading-relaxed transition-colors
                                 ${errors.message ? 'border-red-500 text-red-300 focus:border-red-500' : 'text-white focus:border-white'}`}
                        onChange={handleChange}
                      ></textarea>
                      {errors.message && (
                        <div className="mt-1.5 flex items-center gap-1 text-red-400 font-sans text-[11px] md:text-sm">
                          <AlertCircle size={16} /> {errors.message}
                        </div>
                      )}
                    </div>
                  </div>

                {/* Cloudflare Turnstile */}
                  <div className="flex flex-col items-center justify-center gap-2 pt-3 md:pt-4">
                    <div className={`${errors.turnstile ? 'p-1 border-2 border-red-500 rounded-md' : ''}`}>
                      <TurnstileWidget
                        onVerify={(token) => {
                          setTurnstileToken(token);
                          setErrors(prev => ({ ...prev, turnstile: undefined }));
                        }}
                      />
                    </div>
                    {errors.turnstile && (
                      <span className="text-red-400 font-sans text-[11px] md:text-sm">{errors.turnstile}</span>
                    )}
                  </div>

                  <div className="flex justify-center pt-3 md:pt-4">
                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className="flex items-center gap-2 rounded-full bg-white px-8 py-2.5 text-sm font-black uppercase text-black transition-all hover:scale-[1.02] hover:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.14)] disabled:cursor-not-allowed disabled:opacity-50 md:px-10 md:py-3"
                    >
                      {status === 'submitting' ? 'Enviando...' : 'Enviar Mensaje'}
                      {status !== 'submitting' && <ArrowRight size={20} />}
                    </button>
                  </div>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer Info */}
      <div className="relative z-10 hidden shrink-0 p-3 text-center lg:block">
        <p className="font-sans font-medium text-[10px] md:text-xs tracking-[0.28em] text-white/45 uppercase">HOLA@GROWTHVIDEOLAB.COM • SANTIAGO, CHILE</p>
      </div>

    </motion.div>
  );
};

export default ContactPage;
