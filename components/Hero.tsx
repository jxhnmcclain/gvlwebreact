import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
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
  const location = useLocation();

  const goToContact = () => {
    navigate('/contacto', { state: { background: location } });
  };

  return (
    <section className="relative h-[100svh] w-full overflow-hidden bg-[#050505] text-white">
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

      <div className="relative z-10 flex h-full flex-col px-4 pb-4 pt-20 sm:px-5 md:px-12 md:pb-6 md:pt-24">
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <div className="mb-6 scale-100 opacity-95 sm:mb-8 md:scale-125 md:mb-8">
            <Logo textColor="text-white" />
          </div>

          <h1 className="max-w-5xl text-3xl font-black uppercase leading-[0.92] tracking-[-0.05em] sm:text-4xl md:text-5xl lg:text-6xl">
            Marketing B2B para empresas que necesitan conseguir más clientes.
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-snug text-white/70 sm:text-base md:mt-5 md:text-lg">
            Growth Video Lab ayuda a empresas de servicios en Santiago a verse más serias,
            explicar mejor lo que hacen y convertir su presencia digital en oportunidades comerciales.
          </p>

          <button
            onClick={goToContact}
            className="mb-5 mt-6 inline-flex items-center gap-2 border border-white/20 bg-black/25 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.24em] text-white/60 backdrop-blur-sm transition-colors hover:bg-white hover:text-black md:mb-7 md:mt-7"
          >
            hablemos
            <ArrowUpRight size={14} />
          </button>
        </div>

        <div className="mx-0 grid grid-cols-2 gap-2 md:mx-4 md:grid-cols-4 md:gap-3">
          {rooms.map((room) => (
            <button
              key={room.label}
              onClick={() => navigate(room.path)}
              className="group border border-white/15 bg-black/25 px-3 py-3 text-left backdrop-blur-sm transition-colors hover:bg-white hover:text-black sm:px-4 sm:py-4 md:px-5 md:py-5"
            >
              <span className="mb-1 block font-mono text-[9px] uppercase tracking-[0.18em] text-white/35 group-hover:text-black/45 sm:mb-2 md:text-[10px] md:tracking-[0.24em]">
                {room.label}
              </span>
              <span className="flex items-center justify-between text-sm font-black leading-tight tracking-tight sm:text-base md:text-lg">
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
