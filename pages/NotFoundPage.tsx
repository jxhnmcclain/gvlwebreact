import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, AlertTriangle } from 'lucide-react';

const NotFoundPage = () => {
  return (
    // Changed to fixed inset-0 z-[100] to cover Header/Footer and ensure visibility
    <div className="fixed inset-0 z-[100] bg-gvl-cream flex flex-col items-center justify-center p-6 overflow-hidden">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none" 
        style={{ 
            backgroundImage: 'radial-gradient(circle, #111 1px, transparent 1px)', 
            backgroundSize: '24px 24px' 
        }}
      ></div>

      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "circOut" }}
        className="bg-white border-2 border-black rounded-[2.5rem] p-8 md:p-16 text-center max-w-xl w-full shadow-[10px_10px_0px_0px_black] relative z-10"
      >
         <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gvl-yellow border-2 border-black rounded-full flex items-center justify-center animate-bounce">
                <AlertTriangle size={40} className="text-black" />
            </div>
         </div>

         <h1 
            className="text-8xl md:text-9xl font-black mb-4 text-transparent bg-clip-text bg-black"
            style={{ WebkitTextStroke: '3px black', color: 'transparent' }}
         >
            404
         </h1>
         
         <h2 className="text-2xl md:text-4xl font-black uppercase mb-6 tracking-tight">
            Te has perdido
         </h2>
         
         <p className="text-gray-600 mb-10 text-lg leading-relaxed">
           Parece que la página que buscas fue eliminada, movida o nunca existió en este universo digital.
         </p>
         
         <Link 
            to="/" 
            className="inline-flex items-center gap-3 bg-black text-white px-8 py-4 rounded-full font-bold uppercase hover:bg-gvl-yellow hover:text-black hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 border border-transparent hover:border-black transition-all"
         >
            <Home size={20} />
            Volver al inicio
         </Link>
      </motion.div>

      <div className="absolute bottom-8 text-xs font-bold uppercase opacity-50">
        Error Code: PAGE_NOT_FOUND
      </div>
    </div>
  );
};

export default NotFoundPage;