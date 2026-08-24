import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';
import Dither from './Dither.jsx';

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
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  const goToContact = () => {
    navigate('/contacto', { state: { background: location } });
    setIsMenuOpen(false);
  };

  const navLinks = [
    { name: 'Inicio', path: '/' },
    { name: 'Servicios', path: '/servicios' },
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
          className="md:hidden p-2 hover:bg-black/5 rounded-full transition-colors relative z-[110]"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[105] md:hidden flex flex-col overflow-hidden bg-black h-[100dvh] w-full"
          >
            <div className="absolute inset-0" aria-hidden="true">
              <Dither
                waveColor={[0.7, 0.7, 0.72]}
                disableAnimation={false}
                enableMouseInteraction={false}
                mouseRadius={0.45}
                colorNum={2}
                pixelSize={6}
                waveAmplitude={0.08}
                waveFrequency={1.55}
                waveSpeed={0.018}
              />
            </div>
            <div className="absolute inset-0 bg-black/72" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_35%),radial-gradient(circle_at_20%_80%,rgba(255,255,255,0.05),transparent_22%)]" />

            <div className="relative z-10 flex h-full flex-col px-6 pt-8 pb-8">
              <div className="flex items-center justify-between">
                <Link to="/" className="hover:opacity-90 transition-opacity">
                  <Logo textColor="text-white" />
                </Link>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-2 text-white/80 font-bold uppercase text-xs tracking-[0.18em] hover:text-white transition-colors"
                  aria-label="Close menu"
                >
                  <span>Cerrar</span>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/8">
                    <X size={18} />
                  </div>
                </button>
              </div>

              <div className="mt-20 flex flex-col gap-7">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="text-4xl md:text-5xl font-black tracking-tighter text-white hover:text-gvl-yellow transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              <div className="mt-auto pt-10">
                <button
                  onClick={goToContact}
                  className="w-full py-4 rounded-[1.25rem] border border-white/20 bg-white text-black text-lg font-black flex items-center justify-center gap-2 shadow-[4px_4px_0px_0px_rgba(255,255,255,0.14)] active:translate-y-1 active:shadow-none transition-all"
                >
                  HABLEMOS
                  <ArrowUpRight size={22} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
