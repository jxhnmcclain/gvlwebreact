import React, { useRef, useLayoutEffect, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { Check, ArrowRight } from 'lucide-react';
import { N8N_WEBHOOKS } from '../lib/config';
import TurnstileWidget from './TurnstileWidget';

import { getUTMParams } from '../lib/utm';

const LeadMagnet = () => {
  const container = useRef(null);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    instagram: ''
  });
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".lead-card", {
        scale: 0.9,
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 75%",
          toggleActions: "play none none reverse"
        }
      });
    }, container);
    return () => ctx.revert();
  }, []);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const utmParams = getUTMParams();
    try {
      await fetch(N8N_WEBHOOKS.EBOOKS, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formState, turnstileToken, ...utmParams })
      });
    } catch (error) {
      console.error('Error sending form:', error);
    }

    setIsSubmitted(true);
  };

  return (
    <section ref={container} className="relative w-full min-h-[700px] flex items-center overflow-hidden py-20">
      {/* Background Image */}
      <img
        src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop"
        alt="Creative background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="max-w-7xl mx-auto w-full px-4 md:px-8 relative z-10">
        <div className="lead-card bg-gvl-cream rounded-[2.5rem] p-8 md:p-12 max-w-2xl shadow-2xl border border-black/10">
          {!isSubmitted ? (
            <>
              <div className="inline-block px-4 py-1 border border-black rounded-full text-sm font-bold mb-6 bg-gvl-yellow transform -rotate-2">
                RECURSO GRATIS
              </div>

              <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight tracking-tight text-black">
                5 Prompts de Gemini para Fotos Lifestyle
              </h2>

              <p className="text-gray-700 text-lg mb-8 font-medium">
                Genera fotos de IA que no se vean fake. Prompts testeados para contenido lifestyle real que sí sirve.
              </p>

              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-xs font-bold uppercase mb-1 ml-1 text-gray-500">Nombre</label>
                    <input
                      id="name"
                      required
                      type="text"
                      placeholder="Tu nombre"
                      className="w-full bg-white border border-black/10 rounded-xl p-3 outline-none focus:border-black transition-all font-medium"
                      value={formState.name}
                      onChange={e => setFormState({ ...formState, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label htmlFor="instagram" className="block text-xs font-bold uppercase mb-1 ml-1 text-gray-500">Instagram <span className="lowercase font-normal italic">(opcional)</span></label>
                    <input
                      id="instagram"
                      type="text"
                      placeholder="@tuusuario"
                      className="w-full bg-white border border-black/10 rounded-xl p-3 outline-none focus:border-black transition-all font-medium"
                      value={formState.instagram}
                      onChange={e => setFormState({ ...formState, instagram: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs font-bold uppercase mb-1 ml-1 text-gray-500">Email</label>
                  <input
                    id="email"
                    required
                    type="email"
                    placeholder="tu@email.com"
                    className="w-full bg-white border border-black/10 rounded-xl p-3 outline-none focus:border-black transition-all font-medium"
                    value={formState.email}
                    onChange={e => setFormState({ ...formState, email: e.target.value })}
                  />
                </div>

                <div className="py-2">
                  <TurnstileWidget onVerify={setTurnstileToken} />
                </div>

                <button
                  type="submit"
                  disabled={!turnstileToken}
                  className="w-full bg-black text-white px-8 py-4 rounded-xl font-bold hover:bg-gvl-blue transition-all flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                >
                  Descargar gratis
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </>
          ) : (
            <div className="py-12 text-center">
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check size={40} strokeWidth={3} />
              </div>
              <h3 className="text-3xl font-black mb-4">¡Listo!</h3>
              <p className="text-gray-700 text-xl font-medium">
                Revisa tu correo. Los prompts deberían llegar en cualquier momento.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default LeadMagnet;