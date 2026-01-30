import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Menu, X, ChevronDown } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
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

  const resourceLinks = [
    { name: 'Webs UGC', path: '/web-portfolio' },
    { name: 'Ebooks para creadores', path: '/ebooks-creadores' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-[50]">
      <div className="w-full bg-gvl-cream/90 backdrop-blur-sm border-b border-gray-200 py-3 px-6 md:px-12 flex justify-between items-center relative z-[110]">
        <Link to="/" className="hover:opacity-90 transition-opacity">
          <Logo />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-bold tracking-tight hover:text-gvl-yellow transition-colors ${location.pathname === link.path
                ? link.path === '/servicios'
                  ? 'text-black italic'
                  : 'text-black line-through decoration-black decoration-2'
                : ''
                }`}
            >
              {link.name}
            </Link>
          ))}

          <div className="relative group">
            <button className="flex items-center gap-1 text-sm font-bold tracking-tight hover:text-gvl-yellow transition-colors focus:outline-none">
              Recursos
              <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-200" />
            </button>

            {/* Dropdown Menu */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-56 hidden group-hover:block">
              <div className="bg-white border-2 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden flex flex-col">
                {resourceLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="px-5 py-3 text-sm font-bold hover:bg-gvl-cream hover:text-black transition-colors border-b border-gray-100 last:border-0 flex items-center justify-between group/item"
                  >
                    {link.name}
                    <ArrowUpRight size={14} className="opacity-0 group-hover/item:opacity-100 transition-opacity" />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={goToContact}
            className="px-6 py-2 rounded-full border-2 border-black bg-white flex items-center gap-2 hover:bg-black hover:text-white transition-all hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-sm font-bold group"
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
            className="fixed inset-0 bg-gvl-cream z-[105] md:hidden flex flex-col p-8 pt-32 h-[100dvh] w-full"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-4xl font-black tracking-tighter hover:text-black/60 transition-colors"
                >
                  {link.name}
                </Link>
              ))}

              <div className="flex flex-col gap-4">
                <button
                  onClick={() => setIsResourcesOpen(!isResourcesOpen)}
                  className="text-4xl font-black tracking-tighter flex items-center justify-between w-full"
                >
                  Recursos
                  <ChevronDown className={`transition-transform duration-300 ${isResourcesOpen ? 'rotate-180' : ''}`} size={32} />
                </button>

                <AnimatePresence>
                  {isResourcesOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden flex flex-col gap-3 pl-4"
                    >
                      {resourceLinks.map((link) => (
                        <Link
                          key={link.path}
                          to={link.path}
                          className="text-2xl font-bold tracking-tight hover:opacity-70"
                        >
                          {link.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="mt-auto flex flex-col gap-4">
              <button
                onClick={goToContact}
                className="w-full py-4 rounded-2xl border-2 border-black bg-white text-xl font-black flex items-center justify-center gap-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none transition-all"
              >
                HABLEMOS
                <ArrowUpRight size={24} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;