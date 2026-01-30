import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';
import { N8N_WEBHOOKS } from '../lib/config';
import TurnstileWidget from '../components/TurnstileWidget';

type FormState = {
  name: string;
  email: string;
  company: string;
  message: string;
};

type Errors = Partial<FormState> & { turnstile?: string; submit?: string };

const ContactPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [errors, setErrors] = useState<Errors>({});
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');



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

    try {
      await fetch(N8N_WEBHOOKS.CONTACT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, turnstileToken })
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
      className="fixed inset-0 z-[60] bg-gvl-yellow w-full h-full overflow-y-auto flex flex-col"
    >
      {/* Header with Close Button */}
      <div className="flex justify-between items-center p-6 md:p-12 relative z-10">
        <h2 className="text-lg md:text-xl font-bold tracking-widest uppercase">Growth Video Lab</h2>
        <button
          onClick={() => navigate(-1)}
          className="group flex items-center gap-2 font-bold uppercase text-xs hover:opacity-60 transition-opacity"
        >
          <span>Cerrar</span>
          <div className="bg-black text-gvl-yellow p-1.5 rounded-full group-hover:rotate-90 transition-transform duration-300">
            <X size={16} />
          </div>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-grow flex items-center justify-center px-6 md:px-0 py-8 relative">
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
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-3xl w-full"
            >
              <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-10 text-center leading-[0.9]">
                Hablemos de <br /> tu proyecto
              </h1>

              <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
                {/* Name Field */}
                <div className="group relative">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="TU NOMBRE"
                    className={`w-full bg-transparent border-b-2 text-xl md:text-3xl font-bold placeholder-black/30 focus:outline-none py-3 uppercase tracking-tight transition-colors
                            ${errors.name ? 'border-red-600 text-red-600 focus:border-red-600' : 'border-black focus:border-white'}`}
                  />
                  {errors.name && (
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 text-red-600 flex items-center gap-1 font-bold text-xs md:text-sm pointer-events-none">
                      <AlertCircle size={16} /> {errors.name}
                    </div>
                  )}
                </div>

                {/* Email Field */}
                <div className="group relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="TU CORREO ELECTRÓNICO"
                    className={`w-full bg-transparent border-b-2 text-xl md:text-3xl font-bold placeholder-black/30 focus:outline-none py-3 uppercase tracking-tight transition-colors
                            ${errors.email ? 'border-red-600 text-red-600 focus:border-red-600' : 'border-black focus:border-white'}`}
                  />
                  {errors.email && (
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 text-red-600 flex items-center gap-1 font-bold text-xs md:text-sm pointer-events-none">
                      <AlertCircle size={16} /> {errors.email}
                    </div>
                  )}
                </div>

                {/* Company Field */}
                <div className="group relative">
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="NOMBRE DE TU EMPRESA"
                    className={`w-full bg-transparent border-b-2 text-xl md:text-3xl font-bold placeholder-black/30 focus:outline-none py-3 uppercase tracking-tight transition-colors border-black focus:border-white`}
                  />
                </div>

                {/* Message Field */}
                <div className="group relative">
                  <textarea
                    name="message"
                    value={formData.message}
                    rows={1}
                    placeholder="CUÉNTANOS TU IDEA..."
                    className={`w-full bg-transparent border-b-2 text-xl md:text-3xl font-bold placeholder-black/30 focus:outline-none py-3 uppercase tracking-tight resize-none transition-colors
                             ${errors.message ? 'border-red-600 text-red-600 focus:border-red-600' : 'border-black focus:border-white'}`}
                    onChange={(e) => {
                      handleChange(e);
                      // Auto-grow
                      e.target.style.height = "auto";
                      e.target.style.height = `${e.target.scrollHeight}px`;
                    }}
                  ></textarea>
                  {errors.message && (
                    <div className="absolute right-0 bottom-full mb-1 text-red-600 flex items-center gap-1 font-bold text-xs md:text-sm pointer-events-none">
                      <AlertCircle size={16} /> {errors.message}
                    </div>
                  )}
                </div>

                {/* Cloudflare Turnstile */}
                <div className="flex flex-col items-center justify-center pt-4 gap-2">
                  <div className={`${errors.turnstile ? 'p-1 border-2 border-red-600 rounded-md' : ''}`}>
                    <TurnstileWidget
                      onVerify={(token) => {
                        setTurnstileToken(token);
                        setErrors(prev => ({ ...prev, turnstile: undefined }));
                      }}
                    />
                  </div>
                  {errors.turnstile && (
                    <span className="text-red-600 font-bold text-sm">{errors.turnstile}</span>
                  )}
                </div>

                <div className="flex justify-center pt-2">
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="bg-black text-gvl-yellow px-8 py-4 rounded-full text-lg font-black uppercase flex items-center gap-2 hover:scale-105 hover:shadow-[6px_6px_0px_0px_white] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {status === 'submitting' ? 'Enviando...' : 'Enviar Mensaje'}
                    {status !== 'submitting' && <ArrowRight size={20} />}
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer Info */}
      <div className="p-6 md:p-8 text-center relative z-10">
        <p className="font-bold text-sm md:text-base">HOLA@GROWTHVIDEOLAB.COM • SANTIAGO, CHILE</p>
      </div>

    </motion.div>
  );
};

export default ContactPage;