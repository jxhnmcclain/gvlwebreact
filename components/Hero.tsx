import React, { useRef, useState, useEffect } from 'react';
import { ArrowUpRight, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { BubbleBackground } from './BubbleBackground';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const [isDraggable, setIsDraggable] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Enable drag after entrance animations complete (approx 2s)
    const timer = setTimeout(() => {
      setIsDraggable(true);
    }, 2200);

    return () => {
      window.removeEventListener('resize', checkMobile);
      clearTimeout(timer);
    };
  }, []);

  const cardProps = {
    drag: !isMobile && isDraggable, // Disable drag on mobile for better scroll experience
    dragConstraints: containerRef,
    dragElastic: 0.2,
    dragSnapToOrigin: false,
    whileHover: isMobile ? {} : { scale: 1.25, cursor: isDraggable ? 'grab' : 'pointer', zIndex: 50 },
    whileTap: isMobile ? { scale: 0.95 } : { scale: 1.20, cursor: isDraggable ? 'grabbing' : 'default' },
    whileDrag: { scale: 1.1, cursor: 'grabbing', zIndex: 100 },
  };

  const containerVariants = {
    hidden: { opacity: isMobile ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: isMobile ? 0 : 0.5
      }
    }
  };

  const itemVariants = {
    hidden: { y: isMobile ? 0 : 100, opacity: isMobile ? 1 : 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number]
      }
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full pt-32 pb-20 md:pt-48 md:pb-32 px-4 md:px-8 bg-white overflow-hidden h-auto min-h-screen md:min-h-0 md:h-[95vh] md:max-h-[1200px] flex flex-col justify-center"
    >
      <BubbleBackground className="absolute inset-0 pointer-events-none z-0" interactive={!isMobile} />

      <div className="absolute inset-0 opacity-20 pointer-events-none z-0"
        style={{
          backgroundImage: 'radial-gradient(circle at 50% 50%, white 0%, transparent 60%)'
        }}>
      </div>

      <motion.div
        className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-12 gap-4 md:gap-6 relative z-10 w-full h-full content-center pointer-events-none"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >

        {/* Top Left: Reels -> Mobile: Order 2, Col 1 */}
        <motion.div
          className="order-2 col-span-1 md:order-none md:col-span-3 md:row-span-1 flex flex-col items-center justify-center md:justify-end relative z-20"
          variants={itemVariants}
        >
          <motion.div
            {...cardProps}
            className="relative w-full aspect-[3/4] md:aspect-auto md:w-full md:h-72 rounded-3xl overflow-hidden border-2 border-black shadow-lg rotate-0 md:rotate-[-2deg] pointer-events-auto bg-white touch-none"
          >
            <img src="https://picsum.photos/400/600?random=1" alt="Redes Sociales" className="w-full h-full object-cover pointer-events-none select-none" />
            <div
              onClick={(e) => { e.stopPropagation(); navigate('/reels'); }}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-4 py-1.5 md:px-6 md:py-2 rounded-full border border-black text-xs md:text-sm font-black shadow-sm z-10 pointer-events-auto cursor-pointer select-none whitespace-nowrap hover:bg-gray-100 transition-colors"
            >
              redes sociales
            </div>
          </motion.div>
        </motion.div>

        {/* Center Main Card -> Mobile: Order 1, Col 2 (Full Width) */}
        <motion.div
          className="order-1 col-span-2 md:order-none md:col-span-6 flex flex-col items-center justify-center relative z-50 pointer-events-auto mb-2 md:mb-0"
          variants={itemVariants}
        >
          <div className="bg-gvl-cream/80 backdrop-blur-sm border-2 border-black rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-12 text-center shadow-xl w-full relative">
            <div className="flex justify-center mb-4 md:mb-6">
              <div className="relative">
                <Star className="text-gvl-yellow w-16 h-16 md:w-20 md:h-20 fill-current rotate-12" />
                <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-black text-2xl md:text-3xl tracking-tighter">
                  GVL
                </span>
              </div>
            </div>

            <h1 className="text-3xl md:text-5xl font-black leading-tight mb-6 md:mb-8 tracking-tighter">
              Creamos <span className="underline decoration-[6px] decoration-gvl-yellow">contenido</span> y diseño para marcas con personalidad
            </h1>

            <button
              onClick={() => navigate('/contacto')}
              className="bg-white border-2 border-black rounded-full px-6 py-2 md:px-8 md:py-3 text-base md:text-lg font-black flex items-center gap-2 mx-auto hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all active:translate-y-1 active:shadow-none"
            >
              conversemos
              <ArrowUpRight size={20} />
            </button>
          </div>
        </motion.div>

        {/* Top Right: Branding -> Mobile: Order 3, Col 1 */}
        <motion.div
          className="order-3 col-span-1 md:order-none md:col-span-3 flex items-center md:items-end justify-center z-20"
          variants={itemVariants}
        >
          <motion.div
            {...cardProps}
            className="relative w-full aspect-[3/4] md:aspect-auto md:w-56 md:h-56 rounded-3xl overflow-hidden border-2 border-black shadow-lg rotate-0 md:rotate-[3deg] bg-orange-400 pointer-events-auto touch-none"
          >
            <img src="https://picsum.photos/400/400?random=2" alt="Branding" className="w-full h-full object-cover pointer-events-none select-none" />
            <div
              onClick={(e) => { e.stopPropagation(); navigate('/branding'); }}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-4 py-1.5 md:px-6 md:py-2 rounded-full border border-black text-xs md:text-sm font-black shadow-sm z-10 pointer-events-auto cursor-pointer select-none hover:bg-gray-100 transition-colors"
            >
              branding
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Left: Content -> Mobile: Order 4, Col 1 */}
        <motion.div
          className="order-4 col-span-1 md:order-none md:col-span-4 flex justify-center md:justify-end md:-mt-12 z-20"
          variants={itemVariants}
        >
          <motion.div
            {...cardProps}
            className="relative w-full aspect-[3/4] md:aspect-auto md:w-64 md:h-72 rounded-3xl overflow-hidden border-2 border-black shadow-lg rotate-0 md:rotate-[2deg] pointer-events-auto bg-white touch-none"
          >
            <img src="https://picsum.photos/400/600?random=3" alt="Producción" className="w-full h-full object-cover pointer-events-none select-none" />
            <div
              onClick={(e) => { e.stopPropagation(); navigate('/contenido'); }}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-4 py-1.5 md:px-6 md:py-2 rounded-full border border-black text-xs md:text-sm font-black shadow-sm whitespace-nowrap z-10 pointer-events-auto cursor-pointer select-none hover:bg-gray-100 transition-colors"
            >
              producción audiovisual
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Right: Websites -> Mobile: Order 5, Col 1 */}
        <motion.div
          className="order-5 col-span-1 md:order-none md:col-span-8 flex justify-center md:justify-start md:-mt-8 md:pl-12 z-20"
          variants={itemVariants}
        >
          <motion.div
            {...cardProps}
            className="relative w-full aspect-[3/4] md:aspect-auto md:w-full md:max-w-md md:h-64 bg-white rounded-3xl border-2 border-black shadow-lg overflow-hidden pointer-events-auto touch-none"
          >
            <img src="https://picsum.photos/800/600?random=4" alt="Websites" className="w-full h-full object-cover select-none pointer-events-none" />
            <div className="absolute inset-0 flex items-center justify-center bg-black/10 pointer-events-none">
              <div
                onClick={(e) => { e.stopPropagation(); navigate('/websites'); }}
                className="bg-white px-4 py-1.5 md:px-6 md:py-2 rounded-full border border-black text-xs md:text-sm font-black shadow-sm flex items-center gap-2 pointer-events-auto cursor-pointer select-none hover:bg-gray-100 transition-colors"
              >
                websites
              </div>
            </div>
          </motion.div>
        </motion.div>

      </motion.div>
    </section>
  );
};

export default Hero;