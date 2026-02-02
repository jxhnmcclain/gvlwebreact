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
            Mi laboratorio de <span className="text-gvl-orange">Contenido</span> y marketing
          </motion.h1>

          <motion.p variants={itemVariants} className="text-lg md:text-xl font-medium text-gray-600 mb-10 max-w-md leading-relaxed flex items-start gap-4">
            <ArrowRight className="shrink-0 mt-1" />
            Ayudo a empresas a potenciar su negocio con estrategias creativas y efectivas, enfocadas en tus resultados.
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

          {/* Card 1: Redes Sociales (Text + Icon style) */}
          <motion.div
            variants={itemVariants}
            onClick={() => window.open('https://www.linkedin.com/in/john-mcclain-1a5546187/', '_blank')}
            className="group relative rounded-3xl overflow-hidden cursor-pointer aspect-[4/3] md:aspect-auto"
          >
            {/* Background Image */}
            <img
              src="pfp.jpg"
              alt="John Mcclain"
              className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:blur-sm"
            />

            {/* Subtle Gradient Overlay - Bottom Left centric */}
            <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/20 to-transparent z-10"></div>

            {/* Darker Overlay on Hover */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500 z-10"></div>

            {/* Content - Absolute Bottom Left */}
            <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 text-left pointer-events-none">
              <h3 className="font-black text-white text-3xl mb-1 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                Quién soy
              </h3>

              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                <p className="text-xs md:text-sm text-gray-200 leading-relaxed font-medium mt-1 max-w-[85%]">
                  Soy John Mcclain, marketer, productor audiovisual y creativo. Tengo más de 7 años de experiencia en el marketing y más de 15 en el internet.
                </p>
              </div>
            </div>

            {/* Icon */}
            <div className="absolute top-6 right-6 bg-white/20 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 backdrop-blur-md z-20">
              <ArrowUpRight size={20} />
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