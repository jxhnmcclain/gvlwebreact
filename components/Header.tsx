import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const goToContact = () => {
    navigate('/contacto', { state: { background: location } });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gvl-cream/90 backdrop-blur-sm border-b border-gray-200 py-4 px-6 md:px-12 flex justify-between items-center">
      <Link to="/" className="text-2xl font-black tracking-tighter hover:opacity-70 transition-opacity">
        Growth Video Lab
      </Link>

      <nav className="hidden md:flex items-center gap-6">
        <Link to="/" className="text-sm font-medium hover:opacity-70 transition-opacity">
          Inicio
        </Link>
        <Link to="/servicios" className="text-sm font-medium hover:opacity-70 transition-opacity">
          Servicios
        </Link>

        <div className="relative group">
          <button className="flex items-center gap-1 text-sm font-medium hover:opacity-70 transition-opacity focus:outline-none">
            Recursos
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:rotate-180 transition-transform duration-200">
              <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* Dropdown Menu */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-56 hidden group-hover:block">
            <div className="bg-white border border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden flex flex-col">
              <Link
                to="/web-portfolio"
                className="px-5 py-3 text-sm font-bold hover:bg-gvl-cream hover:text-black transition-colors border-b border-gray-100 flex items-center justify-between group/item"
              >
                Webs UGC
                <ArrowUpRight size={14} className="opacity-0 group-hover/item:opacity-100 transition-opacity" />
              </Link>
              <Link
                to="/ebooks-creadores"
                className="px-5 py-3 text-sm font-bold hover:bg-gvl-cream hover:text-black transition-colors flex items-center justify-between group/item"
              >
                Ebooks para creadores
                <ArrowUpRight size={14} className="opacity-0 group-hover/item:opacity-100 transition-opacity" />
              </Link>
            </div>
          </div>
        </div>

        <button
          onClick={goToContact}
          className="px-6 py-2 rounded-full border border-black bg-white flex items-center gap-2 hover:bg-black hover:text-white transition-colors text-sm font-medium group"
        >
          Contacto
          <ArrowUpRight size={16} className="group-hover:rotate-45 transition-transform" />
        </button>
      </nav>

      {/* Mobile Menu Icon Placeholder */}
      <button className="md:hidden p-2" onClick={goToContact}>
        <div className="w-6 h-0.5 bg-black mb-1.5"></div>
        <div className="w-6 h-0.5 bg-black mb-1.5"></div>
        <div className="w-6 h-0.5 bg-black"></div>
      </button>
    </header>
  );
};

export default Header;