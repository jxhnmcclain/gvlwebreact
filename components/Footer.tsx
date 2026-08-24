import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Logo from './Logo';

const Footer = () => {
  const container = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.footer-bubble', {
        y: 28,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: container.current, start: 'top 88%' },
      });
    }, container);
    return () => ctx.revert();
  }, []);

  return (
    <footer ref={container} className="relative overflow-hidden border-t border-white/10 bg-black px-5 py-10 text-white md:px-10 md:py-12">
      <div className="pointer-events-none absolute inset-0 opacity-[0.035] [background-image:linear-gradient(rgba(255,255,255,.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.7)_1px,transparent_1px)] [background-size:28px_28px]" />
      <div className="relative mx-auto max-w-6xl">
        <div className="mb-7 flex items-center justify-between border-b border-white/10 pb-5">
          <div className="origin-left scale-[0.62] md:scale-75"><Logo textColor="text-white" /></div>
          <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/35">Santiago · Chile</p>
        </div>

        <div className="flex flex-col gap-3 md:items-end">
          <div style={{ backgroundColor: '#197EE8' }} className="footer-bubble relative max-w-[370px] rounded-[1.55rem] rounded-br-sm border border-[#61a7ef]/35 px-6 py-5 shadow-[0_16px_40px_rgba(0,80,180,.16)] md:px-7">
            <span style={{ backgroundColor: '#197EE8' }} className="absolute -bottom-1 right-0 h-4 w-4 [clip-path:polygon(0_0,100%_0,100%_100%)]" />
            <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-white/60">Growth Video Lab</p>
            <p className="mt-2 text-lg font-medium leading-tight md:text-xl">Estrategia, contenido y sistemas para crecer con claridad.</p>
            <a href="mailto:hola@growthvideolab.com" className="mt-4 inline-block border-b border-white/50 pb-0.5 font-mono text-[10px] text-white transition-colors hover:border-white hover:text-white">hola@growthvideolab.com ↗</a>
          </div>

          <a href="https://wa.me/56973832208" className="footer-bubble group relative mr-auto max-w-[340px] rounded-[1.55rem] rounded-bl-sm border border-[#C8F55A]/60 bg-[#C8F55A] px-6 py-5 text-black transition-transform duration-300 hover:-translate-y-1 md:mr-[17%] md:px-7">
            <span className="absolute -bottom-1 left-0 h-4 w-4 bg-[#C8F55A] [clip-path:polygon(0_0,100%_0,0_100%)]" />
            <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-black/55">Respuesta directa</p>
            <p className="mt-2 text-lg font-medium leading-tight md:text-xl">¿Hablamos de tu proyecto?</p>
            <span className="mt-4 inline-flex items-center gap-2 border-b border-black/40 pb-0.5 font-mono text-[10px] transition-colors group-hover:border-black">WhatsApp +56 9 7383 2208 <span aria-hidden="true">↗</span></span>
          </a>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-white/10 pt-4 font-mono text-[8px] uppercase tracking-[0.16em] text-white/30 md:flex-row md:items-center md:justify-between">
          <p>Growth Video Lab · {new Date().getFullYear()}</p>
          <p>Presencia reservada para empresas que hacen el trabajo.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
