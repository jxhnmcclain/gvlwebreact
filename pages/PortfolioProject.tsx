import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { getPortfolioProject } from '../lib/portfolioUtils';
import { injectStructuredData, setMetaTags, SITE_URL } from '../lib/seo';
import NotFoundPage from './NotFoundPage';

const PortfolioProjectPage: React.FC = () => {
  const { slug = '' } = useParams();
  const project = getPortfolioProject(slug);

  useEffect(() => {
    if (!project) return;
    const url = `${SITE_URL}/portafolio/${project.slug}`;
    setMetaTags({
      title: `${project.title} | Growth Video Lab`,
      description: project.summary ?? `Caso de ${project.services.join(', ')} desarrollado por Growth Video Lab.`,
      canonical: url,
      ogType: 'article',
      ogUrl: url,
      ogImage: project.cover ?? '/og-image.jpg',
      articlePublishedTime: project.publishedAt,
    });
    return injectStructuredData({
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      name: project.title,
      description: project.summary,
      image: project.cover,
      datePublished: project.publishedAt,
      creator: { '@type': 'Organization', name: 'Growth Video Lab', url: SITE_URL },
      url,
    });
  }, [project]);

  if (!project) return <NotFoundPage />;

  return (
    <article className="min-h-screen bg-[#050505] px-6 pb-24 pt-32 text-white md:px-12">
      <div className="mx-auto max-w-6xl">
        <Link to="/portafolio" className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-white/45 hover:text-white"><ArrowLeft size={15} /> Archivo</Link>
        <p className="mt-16 font-mono text-[10px] uppercase tracking-[0.3em] text-gvl-yellow">{project.services.join(' / ')}</p>
        <h1 className="mt-5 text-5xl font-black tracking-[-0.05em] md:text-8xl">{project.title}</h1>
        {project.summary && <p className="mt-8 max-w-2xl text-xl leading-relaxed text-white/65 md:text-2xl">{project.summary}</p>}
        {project.cover && <img src={project.cover} alt={project.coverAlt} className="mt-16 max-h-[75vh] w-full object-cover" />}
        <div className="mt-20 grid gap-12 border-t border-white/15 pt-10 md:grid-cols-3">
          {project.challenge && <section><p className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/35">Problema</p><p className="mt-4 leading-relaxed text-white/75">{project.challenge}</p></section>}
          {project.approach && <section><p className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/35">Proceso</p><p className="mt-4 leading-relaxed text-white/75">{project.approach}</p></section>}
          {project.outcome && <section><p className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/35">Resultado</p><p className="mt-4 leading-relaxed text-white/75">{project.outcome}</p></section>}
        </div>
        {project.assets.length > 0 && <div className="mt-20 grid gap-6 md:grid-cols-2">{project.assets.map((asset) => asset.type === 'image' ? <figure key={asset.url}><img src={asset.url} alt={asset.alt} className="w-full" />{asset.caption && <figcaption className="mt-3 text-sm text-white/40">{asset.caption}</figcaption>}</figure> : asset.type === 'video' ? <video key={asset.url} src={asset.url} controls className="w-full" /> : null)}</div>}
      </div>
    </article>
  );
};

export default PortfolioProjectPage;
