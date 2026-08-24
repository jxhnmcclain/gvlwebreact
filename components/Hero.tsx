import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Logo from './Logo';
import Dither from './Dither.jsx';

const rooms = [
  { label: '01 / paid', title: 'adquisición de clientes', path: '/servicios' },
  { label: '02 / contenido', title: 'piezas que se miden', path: '/contenido' },
  { label: '03 / CRO', title: 'cada clic cuenta', path: '/websites' },
  { label: '04 / marca', title: 'identidad lista para usar', path: '/branding' },
];

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative w-full bg-[#050505] text-white overflow-hidden min-h-screen">
      <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        <Dither waveColor={[1, 0.9607843137254902, 0]} disableAnimation={false} enableMouseInteraction mouseRadius={1} colorNum={3} pixelSize={3} waveAmplitude={0.3} waveFrequency={3} waveSpeed={0.05} />
      </div>
      <div className="pointer-events-none absolute inset-0 z-[1] bg-black/50" />
      <div className="pointer-events-none absolute inset-0 z-[2] bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.12),transparent_52%)]" />
      <div className="ascii-field text-white/55" aria-hidden="true">{`GVL
000000000000000000
signal only
do not decorate
000000000000000000`}</div>

      <div className="relative z-10 min-h-screen px-5 md:px-12 pt-32 pb-16 flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <div className="scale-125 md:scale-150 mb-12 opacity-95">
            <Logo textColor="text-white" />
          </div>

          <p className="font-mono text-xs md:text-sm uppercase tracking-[0.34em] text-white/45 max-w-xl">
            growth marketing que se mueve tan rápido como tu producto
          </p>

          <button
            onClick={() => navigate('/contacto')}
            className="mt-10 mb-12 md:mb-16 inline-flex items-center gap-2 border border-white/20 bg-black/25 px-5 py-3 font-mono text-[11px] uppercase tracking-[0.24em] text-white/60 backdrop-blur-sm hover:text-black hover:bg-white transition-colors"
          >
            hablemos
            <ArrowUpRight size={14} />
          </button>
        </div>

        <div className="mx-1 md:mx-4 mb-1 md:mb-4 grid grid-cols-1 gap-2 md:grid-cols-4 md:gap-3">
          {rooms.map((room) => (
            <button
              key={room.label}
              onClick={() => navigate(room.path)}
              className="group text-left border border-white/15 bg-black/25 px-5 py-5 md:px-6 md:py-6 backdrop-blur-sm hover:bg-white hover:text-black transition-colors"
            >
              <span className="block font-mono text-[10px] uppercase tracking-[0.24em] text-white/35 group-hover:text-black/45 mb-3">
                {room.label}
              </span>
              <span className="flex items-center justify-between text-lg md:text-xl font-black tracking-tight">
                {room.title}
                <ArrowUpRight size={16} className="opacity-35 group-hover:opacity-100" />
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
