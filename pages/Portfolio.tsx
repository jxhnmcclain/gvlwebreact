import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { getAllPortfolioProjects } from '../lib/portfolioUtils';
import { setMetaTags, SITE_URL } from '../lib/seo';

const Portfolio: React.FC = () => {
  const projects = getAllPortfolioProjects();
  const isPublic = projects.length >= 3;

  useEffect(() => {
    setMetaTags({
      title: 'Portafolio | Growth Video Lab',
      description: 'Casos seleccionados de web, marca, contenido y sistemas construidos por Growth Video Lab.',
      canonical: `${SITE_URL}/portafolio`,
      robots: isPublic ? 'index, follow' : 'noindex, follow',
      ogType: 'website',
      ogUrl: `${SITE_URL}/portafolio`,
      ogImage: '/og-image.jpg',
    });
  }, [isPublic]);

  return (
    <div className="min-h-screen bg-[#050505] px-6 pb-24 pt-36 text-white md:px-12">
      <main className="mx-auto max-w-7xl">
        <p className="font-mono text-[10px] uppercase tracking-[0.34em] text-gvl-yellow">Archivo / trabajo</p>
        <h1 className="mt-5 max-w-4xl text-5xl font-black tracking-[-0.05em] md:text-8xl">Lo que sobrevivió al proceso.</h1>
        {isPublic ? (
          <div className="mt-20 grid gap-px bg-white/15 md:grid-cols-2">
            {projects.map((project) => (
              <Link key={project.slug} to={`/portafolio/${project.slug}`} className="group bg-black p-6 md:p-10">
                {project.cover && <img src={project.cover} alt={project.coverAlt} className="aspect-[16/10] w-full object-cover grayscale transition duration-500 group-hover:grayscale-0" />}
                <div className="mt-7 flex items-end justify-between gap-6">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">{project.services.join(' / ')}</p>
                    <h2 className="mt-3 text-3xl font-bold">{project.title}</h2>
                  </div>
                  <ArrowUpRight className="text-white/40 group-hover:text-white" />
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="mt-24 max-w-xl border-l border-white/20 pl-6">
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-white/45">Archivo todavía cerrado.</p>
            <p className="mt-4 text-xl text-white/75">Publicaremos cuando haya tres casos completos y aprobados.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Portfolio;
