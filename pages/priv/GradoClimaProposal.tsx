import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, CheckCircle2, ArrowRight, Zap, Play, FileText } from 'lucide-react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { GradoClimaPDF } from '../../components/GradoClimaPDF';
import Logo from '../../components/Logo';

// Animation variants matching the HTML's fadeUp
const fadeUp = {
  hidden: { opacity: 0, y: 15 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const GradoClimaProposal = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Removed manual print function in favor of @react-pdf/renderer
  return (
    <div className="bg-[#080808] text-[#FAFAF8] font-sans font-light selection:bg-[#C8F55A] selection:text-[#080808] overflow-x-hidden min-h-screen">
      {/* CSS Overrides to match GVL Branding with refined sizes */}
      <style dangerouslySetInnerHTML={{
        __html: ".font-machina { font-family: 'Neue Machina', sans-serif; } .font-mono-gvl { font-family: 'Neue Machina', monospace; font-weight: 400; } .lime-text { color: #C8F55A; } .lime-bg { background-color: #C8F55A; } .lime-dim-text { color: #8fad3a; } .lime-dim-border { border-color: #8fad3a; } .gray-light-text { color: #999; } .gray-text { color: #555; } .gray-card-bg { background-color: #131313; } .border-base { border-color: rgba(255, 255, 255, 0.07); } @media print { .no-print { display: none !important; } body { background: white !important; color: black !important; } .bg-\\[\\#080808\\], .bg-\\[\\#111\\], .bg-\\[\\#131313\\], .bg-\\[\\#0a0a0a\\] { background: white !important; color: black !important; border: 1px solid #eee !important; } .text-\\[\\#FAFAF8\\], .text-white, .text-\\[\\#888\\], .text-\\[\\#999\\], .text-\\[\\#555\\], .text-\\[\\#777\\] { color: black !important; } .text-\\[\\#C8F55A\\], .lime-text { color: #000 !important; font-weight: bold !important; text-decoration: underline !important; } .bg-\\[\\#C8F55A\\], .lime-bg { background: #f5f5f5 !important; color: black !important; border: 1px solid #ccc !important; } .border-white\\/5, .border-b, .border-l { border-color: #eee !important; } section { page-break-inside: avoid; } .min-h-screen { min-height: auto !important; height: auto !important; } nav { position: relative !important; background: white !important; border-bottom: 1px solid #eee !important; } .print-logo { filter: none !important; } }"
      }} />

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-[100] flex justify-between items-center px-8 py-2.5 transition-all duration-300 ${isScrolled ? 'bg-[#080808]/95 backdrop-blur-xl border-b border-white/5' : 'bg-transparent'} no-print`}>
        <div className="flex items-center gap-2">
          <div className="scale-[0.75] origin-left">
            <Logo textColor="text-white" />
          </div>
        </div>
        <div className="flex items-center gap-8">
          <ul className="hidden lg:flex gap-6 list-none">
            {['Diagnóstico', 'Solución', 'Contenido', 'Inversión'].map((item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`}
                  className="text-[9px] font-machina tracking-[0.1em] text-[#666] uppercase no-underline transition-colors hover:text-[#C8F55A]"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>


      {/* Hero Section */}
      <section className="min-h-screen grid lg:grid-cols-2 relative overflow-hidden">
        {/* Hero Left */}
        <div className="px-10 pt-[120px] pb-16 flex flex-col justify-center relative z-10">
          <motion.div
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="font-machina text-[9px] tracking-[0.2em] text-[#C8F55A] uppercase mb-6 flex items-center gap-3"
          >
            <div className="w-6 h-[1px] bg-[#C8F55A]"></div>
            Propuesta confidencial · Febrero 2026
          </motion.div>

          <motion.h1
            custom={1}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="font-machina text-[clamp(40px,5vw,60px)] font-extrabold leading-[1.05] tracking-tight mb-6"
          >
            Sistema de<br />
            Adquisición<br />
            <span className="text-[#C8F55A]">GradoClima</span>
          </motion.h1>

          <motion.p
            custom={2}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-[14px] text-[#888] leading-[1.7] max-w-[380px] mb-10"
          >
            Un sistema predecible para potenciar el crecimiento de GradoClima y llegar a los <span className="text-white font-medium">50 edificios</span> — con la infraestructura, la reputación y los casos de éxito que ya tienen.
          </motion.p>

          <motion.div
            custom={3}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="bg-[#111] border-l-2 border-[#C8F55A] p-5 text-[15px] text-[#FAFAF8]/90 italic leading-[1.5] max-w-[420px] font-sans"
          >
            "13 años de entrega impecable merecen un sistema de adquisición igual de bueno."
          </motion.div>
        </div>

        {/* Hero Right */}
        <div className="bg-[#111] flex flex-col justify-center px-10 pt-[120px] pb-16 border-l border-white/5 relative">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#C8F55A]"></div>
          <div className="flex flex-col gap-8">
            {[
              { num: '4', label: 'Convenios nuevos / mes hoy', context: '99% por recomendación · no escala' },
              { num: '50', label: 'Edificios meta · 100 convenios', context: 'Para cubrir los 2 técnicos nuevos en 6 meses' },
              { num: '$25M', label: 'CLP ingreso recurrente potencial', context: '50 edificios × $500.000/mes promedio' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                custom={i + 4}
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                className="flex flex-col gap-1 pb-8 border-b border-white/5 last:border-0 last:pb-0"
              >
                <div className="font-machina text-[44px] font-extrabold text-[#C8F55A] leading-none tracking-tight">{stat.num}</div>
                <div className="text-[11px] text-[#999] tracking-wide uppercase font-machina font-medium">{stat.label}</div>
                <div className="text-[10px] text-[#555] font-machina">{stat.context}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Diagnóstico Section */}
      <section id="diagnostico" className="py-24 px-8 max-w-[1100px] mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={0}
        >
          <div className="font-machina text-[9px] tracking-[0.2em] text-[#C8F55A] uppercase mb-[12px] flex items-center gap-[10px]">
            <div className="w-[20px] h-[1px] bg-[#C8F55A]"></div>
            01 · Diagnóstico
          </div>
          <h2 className="font-machina text-[clamp(30px,4vw,40px)] font-extrabold leading-[1.1] mb-[12px] tracking-tight">
            Dónde está GradoClima hoy
          </h2>
          <p className="text-[14px] text-[#888] leading-[1.7] max-w-[500px] mb-12">
            Una empresa boutique con 13 años de reputación impecable, casos de éxito con números reales, y un equipo listo para crecer. El sistema de adquisición potenciará ese crecimiento.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-1 mb-1">
          {[
            { num: '99%', title: 'BOCA A BOCA', desc: 'Funciona porque la reputación es sólida. Pero para escalar, necesita un canal predecible.' },
            { num: '4/mes', title: 'Leads actuales', desc: 'Sin campañas activas. El potencial de crecimiento fue demostrado con picos previos de 10.' },
            { num: '6 meses', title: 'Crecimiento meta', desc: 'Equipo técnico listo. Es el momento de activar el sistema de forma estructurada.' },
          ].map((card, i) => (
            <motion.div
              key={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={i}
              className="bg-[#131313] p-8 relative overflow-hidden group transition-colors hover:bg-[#161616]"
            >
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/5 transition-colors group-hover:bg-[#C8F55A]"></div>
              <div className="font-machina text-[38px] font-extrabold text-[#C8F55A] mb-1 leading-none tracking-tight">{card.num}</div>
              <div className="text-[10px] font-bold text-white mb-2 tracking-widest uppercase font-machina">{card.title}</div>
              <div className="text-[11px] text-[#888] leading-[1.6]">{card.desc}</div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="bg-[#C8F55A] p-9 flex flex-col md:flex-row justify-between items-center gap-6"
        >
          <div className="font-machina text-[18px] font-bold text-[#080808] leading-[1.4] max-w-[540px]">
            GradoClima tiene todo lo necesario para crecer: reputación, casos de éxito y un equipo técnico de primer nivel.
          </div>
          <div className="text-[10px] text-[#3a4a10] shrink-0 font-machina font-bold tracking-[0.04em] leading-[1.8] text-right">
            46% AHORRO PROMEDIO · LOS ANDES<br />
            CLUB SUIZO · 30% AHORRO
          </div>
        </motion.div>
      </section>

      {/* Solución Section */}
      <section id="solucion" className="py-24 px-8 max-w-[1100px] mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <div className="font-machina text-[9px] tracking-[0.2em] text-[#C8F55A] uppercase mb-[12px] flex items-center gap-[10px]">
            <div className="w-[20px] h-[1px] bg-[#C8F55A]"></div>
            02 · La Solución
          </div>
          <h2 className="font-machina text-[clamp(30px,4vw,40px)] font-extrabold leading-[1.1] mb-[12px] tracking-tight">
            El Sistema de Adquisición
          </h2>
          <p className="text-[14px] text-[#888] leading-[1.7] max-w-[500px] mb-12">
            Cuatro pilares que trabajan juntos para posicionar a GradoClima como la autoridad máxima del mercado.
          </p>
        </motion.div>

        <div className="flex flex-col">
          {[
            { num: '01', title: 'Reactivación y Mejora de Oferta', desc: 'Empezamos por lo más cercano: los contactos que GradoClima ya tiene pero nunca ha trabajado sistemáticamente. Revisamos y afinamos cómo está empaquetada la oferta actual para hacer más fácil el sí del administrador. Identificamos oportunidades de upsell con clientes actuales. Esta es la fruta más rápida y donde aparecen los primeros resultados. ', tag: 'Base existente · Refinamiento' },
            { num: '02', title: 'Outreach a Administradores (Inbound)', desc: 'Acceso a base segmentada en Chile. Secuencias de email diseñadas para entregar valor real — no spam comercial, sino contenido que toca los dolores reales del administrador y posiciona a GradoClima como la autoridad del rubro.', tag: 'Cold Outreach · Autoridad' },
            { num: '03', title: 'Contenido de Autoridad', desc: '2 sesiones de grabación mensuales en la oficina u obras. Talking heads de alta calidad — la cara y voz de Sebastián llegando directamente a los administradores en LinkedIn, Instagram y YouTube. 6 a 8 piezas editadas por mes para mailings y redes. El contenido construye autoridad de marca mientras la campaña genera reuniones. Incluye optimización del sitio web actual: copy, fotos y mejoras simples para proyectar la credibilidad que GradoClima ya tiene.', tag: 'Contenido · Presencia Digital' },
            { num: '04', title: 'Optimización Continua', desc: 'Análisis de métricas y ajustes grandes en conjunto cada 15 días para ver como hemos iterado en las secuencias hacia los prospectos. Este es quizás el pilar más importante — el sistema funciona porque se itera constantemente, no porque se configura una vez y se olvida', tag: 'Datos · Iteración' },
          ].map((step, i) => (
            <motion.div
              key={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="grid grid-cols-[60px_1fr] py-8 border-b border-white/5 group"
              style={{ borderTop: i === 0 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}
            >
              <div className="font-machina text-[11px] text-[#444] pt-1 group-hover:text-[#C8F55A] transition-colors">{step.num}</div>
              <div>
                <h3 className="font-machina text-[18px] font-bold mb-2 leading-[1.2] tracking-tight">{step.title}</h3>
                <p className="text-[13px] text-[#888] leading-[1.7] max-w-[520px]">{step.desc}</p>
                <span className="inline-block mt-3 font-machina text-[8px] tracking-[0.15em] text-[#8fad3a] uppercase border border-[#8fad3a] px-2 py-0.5">
                  {step.tag}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Dirección de Contenido Section */}
      <section id="contenido" className="py-24 px-8 max-w-[1100px] mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <div className="font-machina text-[9px] tracking-[0.2em] text-[#C8F55A] uppercase mb-[12px] flex items-center gap-[10px]">
            <div className="w-[20px] h-[1px] bg-[#C8F55A]"></div>
            03 · Dirección de Contenido
          </div>
          <h2 className="font-machina text-[clamp(30px,4vw,40px)] font-extrabold leading-[1.1] mb-[12px] tracking-tight">
            Así se ve el contenido
          </h2>
          <p className="text-[14px] text-[#888] leading-[1.7] max-w-[500px] mb-12">
            VSL y Casos de éxito grabados en oficina. Simples, directos y de alta calidad. Ejemplos de trabajo previo en el ecosistema de condominios y administración de edificios en Chile.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-[2px] mb-[2px]">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="relative overflow-hidden aspect-video group"
          >
            <img src="/gc-vsl-1.png" alt="Referencia Audiovisual 1" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent p-6 flex flex-col justify-end">
              <div className="font-machina text-[9px] tracking-[0.1em] text-[#C8F55A] uppercase mb-1">Referencia Audiovisual</div>
              <div className="text-[11px] text-white/80 font-machina">Entrevista / Talking Head profesional</div>
            </div>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="relative overflow-hidden aspect-video group"
          >
            <img src="/gc-vsl-2.png" alt="Referencia Audiovisual 2" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent p-6 flex flex-col justify-end">
              <div className="font-machina text-[9px] tracking-[0.1em] text-[#C8F55A] uppercase mb-1">VSL de Autoridad</div>
              <div className="text-[11px] text-white/80 font-machina">Contenido educativo estratégico</div>
            </div>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              num: '01',
              title: 'VSL Comercial',
              desc: 'Video de 1-3 minutos enfocado en convertir. Para mailings, LinkedIn y campañas. El administrador ve la cara de GradoClima antes de la primera reunión.',
              quote: '"¿Cuánto le está costando a tu edificio no tener mantención preventiva?"'
            },
            {
              num: '02',
              title: 'Contenido de Autoridad',
              desc: 'Educación real sobre calderas, eficiencia energética, normativas. Sebastián como la voz experta del rubro. Construye confianza antes del contacto comercial.',
              quote: '"3 señales de que tu sala de calderas necesita mantención urgente"'
            },
            {
              num: '03',
              title: 'Casos de Éxito en Video',
              desc: 'Los resultados reales de GradoClima en formato visual. 46% de ahorro en Los Andes contado por Sebastián es mucho más poderoso que un número en un PDF.',
              quote: '"Cómo este edificio redujo 46% su consumo de gas en 2 meses"'
            },
          ].map((type, i) => (
            <motion.div
              key={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="flex flex-col gap-4"
            >
              <div className="font-machina text-[32px] font-extrabold text-[#C8F55A] leading-none mb-2">{type.num}</div>
              <div className="text-[16px] font-bold text-white mb-2 font-machina tracking-tight uppercase">{type.title}</div>
              <div className="text-[13px] text-[#888] leading-[1.6] mb-4">{type.desc}</div>
              <div className="border-l-2 border-[#C8F55A] pl-4 py-1">
                <p className="text-[14px] text-[#C8F55A] italic leading-[1.5] font-machina font-medium">
                  {type.quote}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>


      {/* Inversión Section */}
      <section id="inversion" className="py-24 px-8 max-w-[1100px] mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <div className="font-machina text-[9px] tracking-[0.2em] text-[#C8F55A] uppercase mb-[12px] flex items-center gap-[10px]">
            <div className="w-[20px] h-[1px] bg-[#C8F55A]"></div>
            04 · Inversión
          </div>
          <h2 className="font-machina text-[clamp(30px,4vw,40px)] font-extrabold leading-[1.1] mb-[12px] tracking-tight">
            Plan de Trabajo
          </h2>
          <p className="text-[14px] text-[#888] leading-[1.7] max-w-[500px] mb-12">
            Estructurado para construir activos de largo plazo desde el día 1.
          </p>
        </motion.div>

        <div className="flex flex-col gap-4 mb-4">
          {/* Setup Fee */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="bg-[#131313] p-10 relative border border-white/5 hover:border-[#C8F55A]/30 transition-colors"
          >
            <div className="grid md:grid-cols-[1fr_250px] gap-10 items-start">
              <div>
                <span className="font-machina text-[8px] tracking-[0.2em] text-[#C8F55A] uppercase mb-4 block font-bold">Inversión Inicial</span>
                <h3 className="font-machina text-[32px] font-extrabold text-white leading-none mb-4 tracking-tight uppercase">Setup Estratégico</h3>
                <ul className="list-none grid md:grid-cols-2 gap-x-8 gap-y-3">
                  {[
                    'Infraestructura técnica de email (3 dominios)',
                    'Estrategia de segmentación ICP (Administradores)',
                    'Primeras secuencias de outreach automatizadas',
                    'Setup de marca y línea editorial de contenido',
                    'Optimización de web y oferta comercial técnica'
                  ].map((item, i) => (
                    <li key={i} className="text-[12px] text-[#888] flex gap-2 items-start leading-[1.4] before:content-['→'] before:text-[#C8F55A] before:font-machina before:text-[9px]">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-[#1a1a1a] p-8 border border-white/5 flex flex-col justify-center items-center text-center">
                <div className="font-machina text-[36px] font-extrabold text-white leading-none mb-1 tracking-tight">$775.000</div>
                <div className="text-[10px] text-[#666] font-machina uppercase tracking-widest font-bold">CLP · PAGO ÚNICO</div>
              </div>
            </div>
          </motion.div>

          {/* Monthly Service */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="bg-[#131313] p-10 relative border border-[#C8F55A]/40 hover:bg-[#161616] transition-all"
          >
            <div className="grid md:grid-cols-[1fr_250px] gap-10 items-start">
              <div>
                <span className="font-machina text-[8px] tracking-[0.2em] text-[#C8F55A] uppercase mb-4 block font-bold">Servicio Mensual</span>
                <h3 className="font-machina text-[32px] font-extrabold text-white leading-none mb-4 tracking-tight uppercase">Gestión & Contenido</h3>
                <ul className="list-none grid md:grid-cols-2 gap-x-8 gap-y-3">
                  {[
                    'Gestión campañas outreach (Administradores)',
                    '2 sesiones de grabación mensuales in situ',
                    '6 a 8 piezas de contenido editadas para LinkedIn/IG',
                    'Copywriting técnico para newsletters/mailings',
                    'Reporte de métricas y optimización bimensual'
                  ].map((item, i) => (
                    <li key={i} className="text-[12px] text-[#FAFAF8]/80 flex gap-2 items-start leading-[1.4] before:content-['→'] before:text-[#C8F55A] before:font-machina before:text-[9px]">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-[#C8F55A]/5 p-8 border border-[#C8F55A]/20 flex flex-col justify-center items-center text-center">
                <div className="font-machina text-[36px] font-extrabold text-[#C8F55A] leading-none mb-1 tracking-tight">$600.000</div>
                <div className="text-[10px] text-[#C8F55A] font-machina uppercase tracking-widest font-bold">CLP · MENSUAL</div>
              </div>
            </div>
          </motion.div>

          {/* Technical Add-ons Label */}
          <div className="py-6 flex items-center gap-4 px-4">
            <div className="font-machina text-[10px] tracking-[0.2em] text-[#555] uppercase font-bold">Complementos Estratégicos</div>
            <div className="h-[1px] bg-white/5 flex-1"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="bg-[#131313] p-8 border border-white/5 hover:border-white/10 transition-colors"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="font-machina text-[8px] tracking-[0.2em] text-[#8fad3a] uppercase mb-1 block font-bold">Add-on 01</span>
                  <h4 className="font-machina text-[20px] font-extrabold text-white leading-none tracking-tight uppercase">Podcast / Conversatorio</h4>
                </div>
                <div className="text-right">
                  <div className="font-machina text-[20px] font-bold text-[#C8F55A] tracking-tight">+$400.000</div>
                  <div className="text-[9px] text-[#666] uppercase font-machina">mensual</div>
                </div>
              </div>
              <p className="text-[12px] text-[#888] leading-[1.6]">
                Producción completa de un espacio de entrevista para atraer autoridades de la industria y generar fragmentos de alto impacto.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="bg-[#131313] p-8 border border-white/5 hover:border-white/10 transition-colors"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="font-machina text-[8px] tracking-[0.2em] text-[#8fad3a] uppercase mb-1 block font-bold">Add-on 02</span>
                  <h4 className="font-machina text-[20px] font-extrabold text-white leading-none tracking-tight uppercase">Curso Operador Caldera</h4>
                </div>
                <div className="text-right">
                  <div className="font-machina text-[20px] font-bold text-[#C8F55A] tracking-tight">$500.000</div>
                  <div className="text-[9px] text-[#666] uppercase font-machina">Pago Único</div>
                </div>
              </div>
              <p className="text-[12px] text-[#888] leading-[1.6]">
                Lead Magnet de alta conversión: producción de curso técnico para que los administradores lo entreguen a sus conserjes.
              </p>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="bg-[#0a0a0a] border border-white/5 p-8 flex flex-col md:flex-row gap-6 items-center mb-1"
        >
          <div className="font-machina text-[8px] tracking-[0.2em] text-[#C8F55A] uppercase md:[writing-mode:vertical-rl] md:rotate-180 font-bold">Garantía</div>
          <div className="text-[12px] text-[#888] leading-[1.7]">
            <strong className="text-white">Garantía de inicio:</strong> El setup inicial se paga al firmar. <strong>El cobro mensual comienza solo después de conseguir las primeras reuniones calificadas agendadas.</strong>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="bg-[#C8F55A] p-10"
        >
          <div className="font-machina text-[8px] font-bold tracking-[0.2em] text-[#3a4a10] uppercase mb-4">El contexto del ROI</div>
          <div className="font-machina text-[20px] font-extrabold text-[#080808] leading-[1.3] mb-3 tracking-tight">
            50 edificios representan $25M CLP/mes de ingreso recurrente nuevo.
          </div>
          <p className="text-[11px] text-[#3a4a10] leading-[1.7] max-w-[600px] font-medium">
            La inversión mensual equivale a una fracción mínima del potencial generado. El sistema se construye hoy para escalar mañana. <span className="font-bold">(ROI: 2.4% de inversión)</span>.
          </p>
        </motion.div>
      </section>

      {/* Timeline Section */}
      <section id="timeline" className="py-24 px-8 max-w-[1100px] mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <div className="font-machina text-[9px] tracking-[0.2em] text-[#C8F55A] uppercase mb-[12px] flex items-center gap-[10px]">
            <div className="w-[20px] h-[1px] bg-[#C8F55A]"></div>
            05 · Timeline
          </div>
          <h2 className="font-machina text-[clamp(28px,4vw,38px)] font-extrabold leading-[1.1] mb-[12px] tracking-tight">
            Cómo arrancamos
          </h2>
        </motion.div>

        <div className="flex flex-col mb-12">
          {[
            { period: 'Semana 0', title: 'Acuerdo Técnico', desc: 'Firma de contrato y pago de setup initial.' },
            { period: 'Semana 1–2', title: 'Infraestructura', desc: 'Setup de emails, segmentación y primera sesión de grabación.' },
            { period: 'Semana 3', title: 'Lanzamiento', desc: 'Activación de outreach y primer contenido publicado.' },
            { period: 'Mes 2–3', title: 'Optimización y Resultados', desc: 'Primeras reuniones agendadas y ajustes de oferta.' },
            { period: 'Mes 3', title: 'Implementación de Canal 2', desc: 'Expansión de outreach y contenido estratégico.' },
            { period: 'Mes 4–6', title: 'Escalamiento', desc: 'Consolidación de autoridad y meta de 50 edificios.' },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="grid grid-cols-1 md:grid-cols-[140px_1fr]"
            >
              <div className="p-6 border-r border-white/5 relative flex flex-col gap-1">
                <div className="absolute right-[-4px] top-8 w-[7px] h-[7px] rounded-full bg-[#C8F55A] border border-[#080808]"></div>
                <div className="font-machina text-[9px] text-[#666] font-bold uppercase tracking-wider">{item.period}</div>
              </div>
              <div className="p-6 md:pl-10">
                <div className="text-[15px] font-bold text-white mb-1 font-machina tracking-tight uppercase">{item.title}</div>
                <div className="text-[12px] text-[#888] leading-[1.6] max-w-[500px]">{item.desc}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>


      {/* CTA Section */}
      <div className="bg-white py-24 px-8 text-[#080808]">
        <div className="max-w-[1100px] mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <div className="font-machina text-[9px] tracking-[0.2em] text-[#8fad3a] uppercase mb-4 flex items-center gap-[10px]">
              <div className="w-[20px] h-[1px] bg-[#8fad3a]"></div>
              06 · Siguiente paso
            </div>
            <h2 className="font-machina text-[clamp(36px,5vw,54px)] font-extrabold leading-[1.0] tracking-tight mb-4 uppercase">
              ¿Arrancamos esta semana?
            </h2>
            <p className="text-[15px] text-[#555] leading-[1.7] max-w-[540px] mb-12">
              La meta de 50 edificios empieza con una decisión estratégica.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 border-t border-black/5 pt-10">
            {[
              { label: 'Contrato', value: '3 meses' },
              { label: 'Renovación', value: 'Mensual' },
              { label: 'Aviso', value: '30 días' },
              { label: 'Primer Mes', value: 'Post Resultados' },
              { label: 'Setup', value: 'Al firmar' },
            ].map((term, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                className="flex flex-col gap-0.5"
              >
                <div className="font-machina text-[8px] tracking-[0.1em] text-[#999] uppercase">{term.label}</div>
                <div className="text-[13px] font-bold font-machina tracking-tight text-[#080808] uppercase">{term.value}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <footer className="py-16 px-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
        <img src="/assets/images/brandassets/logojusttext.svg" alt="GVL Logo" className="h-3 opacity-50 grayscale invert" />
        <div className="text-[9px] text-[#444] font-machina tracking-widest uppercase">PROPUESTA GRADOCLIMA · 2026</div>
      </footer>
    </div>
  );
};

export default GradoClimaProposal;
