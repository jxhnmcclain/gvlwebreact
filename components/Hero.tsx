import React from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <section className="relative w-full py-28 px-4 md:px-8 bg-[#050505] text-white overflow-hidden min-h-screen flex flex-col justify-center">
      <div className="ascii-field text-white/80" aria-hidden="true">{`GVL://SIGNAL
01001000 01001111 01001101 01000101
..##[]##..  LEADS / WEB / BRAND
:::: quiet systems for visible companies
####..####..####..####..####..####
no theatre. no noise. just the machine.`}</div>
      <motion.div
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 relative z-10 w-full"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >

        {/* LEFT COLUMN: Text & CTA */}
        <div className="col-span-1 md:col-span-12 lg:col-span-5 flex flex-col justify-center text-left py-8 md:py-0">
          <motion.div variants={itemVariants} className="flex items-center gap-2 mb-6">
            <span className="font-mono text-xs uppercase tracking-[0.32em] text-white/50">Growth Video Lab / Santiago</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1 variants={itemVariants} className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.02] tracking-normal mb-8 text-white max-w-3xl">
            La presencia silenciosa antes de una venta grande.
          </motion.h1>

          <motion.p variants={itemVariants} className="text-lg md:text-xl font-medium text-white/64 mb-10 max-w-lg leading-relaxed flex items-start gap-4">
            <ArrowRight className="shrink-0 mt-1 text-gvl-yellow" />
            Web, marca, contenido y prospeccion para empresas que necesitan parecer tan serias como el trabajo que ya hacen.
          </motion.p>

          <motion.div variants={itemVariants}>
            <button
              onClick={() => navigate('/contacto')}
              className="bg-white text-black rounded-none px-8 py-4 text-lg font-bold flex items-center gap-3 hover:bg-gvl-yellow transition-all active:scale-95 shadow-[6px_6px_0px_0px_rgba(255,255,255,0.16)]"
            >
              Abrir conversacion
              <ArrowUpRight size={20} />
            </button>
          </motion.div>
        </div>

        {/* RIGHT COLUMN: Bento Grid */}
        <div className="col-span-1 md:col-span-12 lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-4 auto-rows-[minmax(240px,auto)]">

          {/* Card 1: Agency Services Tags */}
          <motion.div
            variants={itemVariants}
            className="group relative overflow-hidden cursor-default aspect-[4/3] md:aspect-auto bg-zinc-950 p-8 flex flex-col justify-between brutalist-panel"
          >
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gvl-yellow/60 mb-4 block">Lo que hacemos</span>
              <h3 className="text-2xl font-black text-white leading-tight mb-6">
                Sistemas pequenos para decisiones grandes.
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {["Webs B2B", "Email Outreach", "Automatización n8n", "SEO Local", "Branding", "Lead Generation"].map(tag => (
                <span key={tag} className="px-3 py-1 border border-white/20 text-white/80 text-xs font-bold rounded-none bg-white/5 hover:border-gvl-yellow/40 hover:text-gvl-yellow transition-colors">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Card 2: Branding (Gradient + Strong Text) */}
          <motion.div
            variants={itemVariants}
            onClick={() => navigate('/branding')}
            className="overflow-hidden relative cursor-pointer group aspect-[4/3] md:aspect-auto bg-[#161616] p-8 flex flex-col justify-between brutalist-panel dither-bg transition-colors"
          >
            <div className="relative z-10">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gvl-yellow mb-2 block">Branding</span>
              <h3 className="text-3xl font-black leading-tight text-white">
                Identidad <br />
                sin plantilla.
              </h3>
            </div>

            <div className="relative z-10 self-end">
              <span className="text-xs font-bold text-gray-400 group-hover:text-black transition-colors flex items-center gap-2">
                Ver proyectos <ArrowRight size={14} />
              </span>
            </div>
          </motion.div>

          {/* Card 3: Producción (Gradient + Strong Text) */}
          <motion.div
            variants={itemVariants}
            onClick={() => navigate('/contenido')}
            className="overflow-hidden relative cursor-pointer group aspect-[4/3] md:aspect-auto bg-white p-8 flex flex-col justify-between border border-white/20 transition-colors shadow-none"
          >
            <div className="relative z-10">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-black/50 mb-2 block">Producción audiovisual</span>
              <h3 className="text-3xl font-black leading-tight text-black">
                Prueba visual <br />
                para confiar.
              </h3>
            </div>

            <div className="relative z-10 self-end">
              <div className="bg-black text-white p-3 rounded-full hover:bg-blue-600 transition-colors">
                <ArrowUpRight size={20} />
              </div>
            </div>
          </motion.div>

          {/* Card 4: Websites (Modern Gradient) */}
          <motion.div
            variants={itemVariants}
            onClick={() => navigate('/websites')}
            className="bg-zinc-950 p-8 flex flex-col justify-between relative overflow-hidden cursor-pointer group aspect-[4/3] md:aspect-auto brutalist-panel"
          >
            <div className="relative z-10">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gvl-yellow/60 mb-2 block">Desarrollo</span>
              <h3 className="text-3xl font-black leading-tight text-white">
                Webs que <br />
                <span className="text-gvl-yellow">trabajan bajo tierra.</span>
              </h3>
            </div>

            <div className="relative z-10 flex items-center justify-between">
              <p className="text-xs text-gray-400 max-w-[150px]">
                Landings, blogs y sistemas.
              </p>
              <ArrowRight size={20} className="text-white group-hover:translate-x-2 transition-transform" />
            </div>
          </motion.div>

        </div>

      </motion.div>
    </section>
  );
};

export default Hero;
