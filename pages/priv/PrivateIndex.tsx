import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const PrivateIndex = () => {
    const links = [
        { name: 'Social Media', path: '/priv/social-media', color: 'bg-gvl-orange' },
        { name: 'Marca & Diseño', path: '/priv/marca-diseno', color: 'bg-gvl-blue' },
        { name: 'Branding Collection', path: '/priv/branding', color: 'bg-gvl-yellow' },
    ];

    return (
        <div className="min-h-screen pt-32 pb-20 px-4 md:px-12 bg-gray-100 flex flex-col justify-center items-center">
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-12 text-center">
                Accesos <br /> Privados
            </h1>

            <div className="grid gap-6 w-full max-w-2xl">
                {links.map((link) => (
                    <Link
                        key={link.path}
                        to={link.path}
                        className={`group relative overflow-hidden rounded-2xl p-8 ${link.color} border-2 border-black shadow-[4px_4px_0px_0px_black] hover:translate-y-1 hover:shadow-none transition-all duration-200`}
                    >
                        <div className="flex justify-between items-center relative z-10">
                            <span className="text-2xl md:text-4xl font-black uppercase text-white drop-shadow-md">
                                {link.name}
                            </span>
                            <ArrowRight className="text-white w-8 h-8 transform group-hover:translate-x-2 transition-transform" />
                        </div>
                        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                    </Link>
                ))}
            </div>

            <div className="mt-12 text-sm text-gray-500 font-mono">
                CONFIDENTIAL / GVL AGENCY
            </div>
        </div>
    );
};

export default PrivateIndex;
