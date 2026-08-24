import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';
import Dither from './Dither.jsx';
import { getAllPortfolioProjects } from '../lib/portfolioUtils';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHeroVisible, setIsHeroVisible] = useState(location.pathname === '/');

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname !== '/') {
      setIsHeroVisible(false);
      return;
    }

    const onScroll = () => {
      setIsHeroVisible(window.scrollY < window.innerHeight * 0.72);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [location.pathname]);

  // Lock scroll when menu is open
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMenuOpen]);

  const goToContact = () => {
    navigate('/contacto', { state: { background: location } });
    setIsMenuOpen(false);
  };

  const navLinks = [
    { name: 'Inicio', path: '/' },
    { name: 'Servicios', path: '/servicios' },
    ...(getAllPortfolioProjects().length >= 3 ? [{ name: 'Portafolio', path: '/portafolio' }] : []),
    { name: 'Blog', path: '/blog' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-[50] transition-all duration-500 ${isHeroVisible && !isMenuOpen ? '-translate-y-full opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'}`}>
      <div className="w-full bg-black/88 text-white backdrop-blur-sm border-b border-white/10 py-3 px-6 md:px-12 flex justify-between items-center relative z-[110]">
        <Link to="/" className="hover:opacity-90 transition-opacity">
          <Logo textColor="text-white" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-bold tracking-tight hover:text-gvl-yellow transition-colors ${location.pathname === link.path
                ? link.path === '/servicios'
                  ? 'text-gvl-yellow italic'
                  : 'text-gvl-yellow line-through decoration-gvl-yellow decoration-2'
                : ''
                }`}
            >
              {link.name}
            </Link>
          ))}

          <button
            onClick={goToContact}
            className="px-6 py-2 rounded-none border border-white bg-white text-black flex items-center gap-2 hover:bg-gvl-yellow hover:text-black transition-all hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.16)] text-sm font-bold group"
          >
            Contacto
            <ArrowUpRight size={16} className="group-hover:rotate-45 transition-transform" />
          </button>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className={`relative z-[110] rounded-full p-2 transition-colors hover:bg-white/10 md:hidden ${isMenuOpen ? 'invisible pointer-events-none' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-navigation"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[120] flex h-[100dvh] w-full flex-col overflow-hidden bg-black text-white md:hidden"
          >
            <div className="absolute inset-0" aria-hidden="true">
              <Dither
                waveColor={[0.42, 0.42, 0.45]}
                disableAnimation={false}
                enableMouseInteraction={false}
                mouseRadius={0.45}
                colorNum={3}
                pixelSize={3}
                waveAmplitude={0.04}
                waveFrequency={1.2}
                waveSpeed={0.014}
              />
            </div>
            <div className="absolute inset-0 bg-black/75" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_32%),radial-gradient(circle_at_20%_80%,rgba(255,255,255,0.04),transparent_22%)]" />

            <div className="relative z-10 flex h-full min-h-0 flex-col px-5 pb-5 pt-3 sm:px-6">
              <div className="relative mx-auto flex w-full max-w-lg shrink-0 items-center justify-center">
                <Link to="/" className="h-[58px] origin-center scale-[0.62] transition-opacity hover:opacity-90">
                  <Logo textColor="text-white" />
                </Link>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="group absolute right-0 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/8 text-white/80 transition-colors hover:text-white"
                  aria-label="Cerrar menú"
                >
                  <X size={16} className="transition-transform duration-300 group-hover:rotate-90" />
                </button>
              </div>

              <div className="flex min-h-0 flex-1 items-center justify-center py-4">
                <div className="w-full max-w-lg rounded-[1.25rem] border border-white/10 bg-black/45 p-4 shadow-[0_30px_120px_rgba(0,0,0,0.55)] backdrop-blur-xl sm:p-5">
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.12, duration: 0.45 }}
                    className="mb-5 text-center font-sans text-[10px] uppercase tracking-[0.28em] text-white/55"
                  >
                    Growth Video Lab / Navegación
                  </motion.p>

                  <nav className="border-t border-white/10" aria-label="Navegación principal">
                    {navLinks.map((link, index) => {
                      const isActive = location.pathname === link.path;
                      return (
                        <motion.div
                          key={link.path}
                          initial={{ opacity: 0, y: 16 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.16 + index * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        >
                          <Link
                            to={link.path}
                            aria-current={isActive ? 'page' : undefined}
                            className="group flex min-h-16 items-center justify-between border-b border-white/10 px-1 font-sans text-white transition-colors hover:text-gvl-yellow"
                          >
                            <span className="flex items-center gap-4">
                              <span className="font-mono text-[10px] tracking-[0.2em] text-white/35">0{index + 1}</span>
                              <span className="text-[1.75rem] font-black leading-none tracking-[-0.045em] sm:text-3xl">{link.name}</span>
                            </span>
                            <ArrowUpRight size={18} className={`transition-all group-hover:rotate-45 ${isActive ? 'text-gvl-yellow' : 'text-white/35'}`} />
                          </Link>
                        </motion.div>
                      );
                    })}
                  </nav>

                  <motion.button
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.44, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    onClick={goToContact}
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-white px-8 py-3.5 font-sans text-sm font-black uppercase tracking-[-0.01em] text-black transition-all hover:scale-[1.01] hover:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.14)] active:scale-[0.99]"
                  >
                    Hablemos
                    <ArrowUpRight size={19} />
                  </motion.button>
                </div>
              </div>

              <p className="shrink-0 text-center font-sans text-[9px] uppercase tracking-[0.26em] text-white/35">
                Santiago / Chile
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
