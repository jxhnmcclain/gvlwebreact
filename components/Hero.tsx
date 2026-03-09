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
    <section className="relative w-full py-20 px-4 md:px-8 bg-white overflow-hidden min-h-screen flex flex-col justify-center">
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
            <span className="font-bold text-lg tracking-tight">Hey, bienvenido a</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1 variants={itemVariants} className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tighter mb-8 text-black">
            Agencia de Webs y Generación de <span className="text-gvl-orange">Leads B2B</span> en <span className="text-gvl-blue">Santiago</span>
          </motion.h1>

          <motion.p variants={itemVariants} className="text-lg md:text-xl font-medium text-gray-600 mb-10 max-w-md leading-relaxed flex items-start gap-4">
            <ArrowRight className="shrink-0 mt-1" />
            Ayudo a empresas de servicios a conseguir más contratos con una web profesional y un sistema de prospección automatizado.
          </motion.p>

          <motion.div variants={itemVariants}>
            <button
              onClick={() => navigate('/contacto')}
              className="bg-black text-white rounded-full px-8 py-4 text-lg font-bold flex items-center gap-3 hover:bg-gray-800 transition-all hover:scale-105 active:scale-95 shadow-xl"
            >
              Contactame
              <ArrowUpRight size={20} />
            </button>
          </motion.div>
        </div>

        {/* RIGHT COLUMN: Bento Grid */}
        <div className="col-span-1 md:col-span-12 lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-4 auto-rows-[minmax(240px,auto)]">

          {/* Card 1: Agency Services Tags */}
          <motion.div
            variants={itemVariants}
            className="group relative rounded-3xl overflow-hidden cursor-default aspect-[4/3] md:aspect-auto bg-zinc-900 p-8 flex flex-col justify-between"
          >
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gvl-yellow/60 mb-4 block">Lo que hacemos</span>
              <h3 className="text-2xl font-black text-white leading-tight mb-6">
                Todo lo que necesitas <span className="text-gvl-yellow">para cerrar más contratos.</span>
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {["Webs B2B", "Email Outreach", "Automatización n8n", "SEO Local", "Branding", "Lead Generation"].map(tag => (
                <span key={tag} className="px-3 py-1 border border-white/20 text-white/80 text-xs font-bold rounded-full bg-white/5 hover:border-gvl-yellow/40 hover:text-gvl-yellow transition-colors">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Card 2: Branding (Gradient + Strong Text) */}
          <motion.div
            variants={itemVariants}
            onClick={() => navigate('/branding')}
            className="rounded-3xl overflow-hidden relative cursor-pointer group aspect-[4/3] md:aspect-auto bg-gvl-cream p-8 flex flex-col justify-between border border-black/5 hover:border-black/10 transition-colors shadow-sm"
          >
            {/* Gradient Blob */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-gvl-orange/30 blur-[60px] rounded-full -mr-10 -mt-10 group-hover:scale-125 transition-transform duration-700"></div>

            <div className="relative z-10">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gvl-orange mb-2 block">Branding</span>
              <h3 className="text-3xl font-black leading-tight text-black">
                Marcas <br />
                <span className="text-gvl-orange">con caracter.</span>
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
            className="rounded-3xl overflow-hidden relative cursor-pointer group aspect-[4/3] md:aspect-auto bg-white p-8 flex flex-col justify-between border border-black/5 hover:border-black/10 transition-colors shadow-sm"
          >
            {/* Gradient Blob */}
            <div className="absolute bottom-0 left-0 w-56 h-56 bg-blue-500/10 blur-[70px] rounded-full -ml-16 -mb-16 group-hover:scale-110 transition-transform duration-700"></div>

            <div className="relative z-10">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 mb-2 block">Producción audiovisual</span>
              <h3 className="text-3xl font-black leading-tight text-black">
                Cuenta tu idea <br />
                <span className="text-blue-500">en video</span>
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
            className="bg-zinc-900 rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden cursor-pointer group aspect-[4/3] md:aspect-auto shadow-2xl"
          >
            {/* Dark technical gradient */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gvl-yellow/20 blur-[90px] rounded-full -mr-20 -mt-20 group-hover:opacity-40 transition-opacity"></div>

            <div className="relative z-10">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gvl-yellow/60 mb-2 block">Desarrollo</span>
              <h3 className="text-3xl font-black leading-tight text-white">
                Tu página web <br />
                <span className="text-gvl-yellow">adaptada a ti</span>
              </h3>
            </div>

            <div className="relative z-10 flex items-center justify-between">
              <p className="text-xs text-gray-400 max-w-[150px]">
                Landings, blogs y tiendas.
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