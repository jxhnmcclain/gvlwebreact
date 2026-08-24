import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { getFeaturedPortfolioProjects } from '../lib/portfolioUtils';

const FeaturedWork: React.FC = () => {
  const projects = getFeaturedPortfolioProjects(3);
  if (projects.length < 3) return null;

  return (
    <section className="bg-black px-6 py-24 text-white md:px-12">
      <div className="mx-auto max-w-7xl border-t border-white/15 pt-8">
        <div className="mb-12 flex items-end justify-between gap-8">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-white/50">Trabajo seleccionado</p>
            <h2 className="mt-4 max-w-xl text-4xl font-black tracking-tight md:text-6xl">Pruebas, no promesas.</h2>
          </div>
          <Link to="/portafolio" className="hidden items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-white/60 hover:text-white md:flex">
            Ver archivo <ArrowUpRight size={16} />
          </Link>
        </div>
        <div className="grid gap-px bg-white/15 md:grid-cols-3">
          {projects.map((project) => (
            <Link key={project.slug} to={`/portafolio/${project.slug}`} className="group min-h-80 bg-[#080808] p-6 transition-colors hover:bg-[#101010]">
              {project.cover && <img src={project.cover} alt={project.coverAlt} className="mb-8 aspect-[4/3] w-full object-cover grayscale transition duration-500 group-hover:grayscale-0" />}
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/40">{project.services.join(' / ')}</p>
              <div className="mt-3 flex items-end justify-between gap-4">
                <h3 className="text-2xl font-bold">{project.title}</h3>
                <ArrowUpRight className="text-white/40 transition group-hover:text-white" size={20} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedWork;
