import { SEOMetadata, SITE_URL } from './seo';

type RouteSEOMetadata = SEOMetadata & {
  path: string;
};

export const PUBLIC_ROUTE_SEO: RouteSEOMetadata[] = [
  {
    path: '/',
    title: 'Growth Video Lab | Estudio creativo, herramientas con IA y marketing',
    description: 'Estudio creativo que construye herramientas con IA y trabaja en estrategia, diseño, contenido y campañas para personas y proyectos.',
    canonical: SITE_URL,
    ogType: 'website',
    ogUrl: SITE_URL,
    ogImage: '/og-image.jpg',
  },
  {
    path: '/contenido',
    title: 'Producción de contenido en Santiago | Growth Video Lab',
    description: 'Producción de contenido para redes y campañas en Santiago: video, pauta y piezas que se prueban, miden y ajustan.',
    canonical: `${SITE_URL}/contenido`,
    ogType: 'website',
    ogUrl: `${SITE_URL}/contenido`,
    ogImage: '/og-image.jpg',
  },
  {
    path: '/reels',
    title: 'Contenido para redes sociales | Growth Video Lab',
    description: 'Reels, carruseles y contenido mensual para marcas que necesitan presencia constante en sus redes sociales.',
    canonical: `${SITE_URL}/reels`,
    ogType: 'website',
    ogUrl: `${SITE_URL}/reels`,
    ogImage: '/og-image.jpg',
  },
  {
    path: '/websites',
    title: 'Diseño y desarrollo web en Santiago | Growth Video Lab',
    description: 'Sitios web, landings e integraciones para empresas en Santiago: rápidos, claros y diseñados para captar leads o vender.',
    canonical: `${SITE_URL}/websites`,
    ogType: 'website',
    ogUrl: `${SITE_URL}/websites`,
    ogImage: '/og-image.jpg',
  },
  {
    path: '/branding',
    title: 'Branding e identidad visual en Santiago | Growth Video Lab',
    description: 'Diseño de marca e identidad visual para empresas en Santiago: estrategia, mensajes y sistemas listos para cualquier canal.',
    canonical: `${SITE_URL}/branding`,
    ogType: 'website',
    ogUrl: `${SITE_URL}/branding`,
    ogImage: '/og-image.jpg',
  },
  {
    path: '/servicios',
    title: 'Herramientas con IA y marketing creativo | Growth Video Lab',
    description: 'Desarrollamos aplicaciones y automatizaciones con IA. También trabajamos en estrategia, diseño, contenido y campañas.',
    canonical: `${SITE_URL}/servicios`,
    ogType: 'website',
    ogUrl: `${SITE_URL}/servicios`,
    ogImage: '/og-image.jpg',
  },
  {
    path: '/cotizacion-web',
    title: 'Cotiza tu sitio web B2B | Growth Video Lab',
    description: 'Cuestionario breve para cotizar una web profesional, landing page o sistema digital para tu empresa.',
    canonical: `${SITE_URL}/cotizacion-web`,
    ogType: 'website',
    ogUrl: `${SITE_URL}/cotizacion-web`,
    ogImage: '/og-image.jpg',
  },
  {
    path: '/web-portfolio',
    title: 'Portfolio de websites | Growth Video Lab',
    description: 'Ejemplos de sitios, landings y experiencias web producidas por Growth Video Lab.',
    canonical: `${SITE_URL}/web-portfolio`,
    ogType: 'website',
    ogUrl: `${SITE_URL}/web-portfolio`,
    ogImage: '/og-image.jpg',
  },
  {
    path: '/guia-ia-marketing',
    title: 'Guía para implementar IA en marketing | Growth Video Lab',
    description: 'Aprende a implementar agentes de IA en tus flujos de marketing, conectarlos con tus herramientas y organizar la gestión diaria y mensual.',
    canonical: `${SITE_URL}/guia-ia-marketing`,
    ogType: 'website',
    ogUrl: `${SITE_URL}/guia-ia-marketing`,
    ogImage: '/og-image.jpg',
  },
  {
    path: '/blog',
    title: 'Notas del estudio | Growth Video Lab',
    description: 'Ideas y aprendizajes sobre herramientas con IA, creatividad, contenido, diseño y marketing.',
    canonical: `${SITE_URL}/blog`,
    ogType: 'website',
    ogUrl: `${SITE_URL}/blog`,
    ogImage: '/og-blog.jpg',
  },
  {
    path: '/portafolio',
    title: 'Portafolio | Growth Video Lab',
    description: 'Casos seleccionados de web, marca, contenido y sistemas construidos por Growth Video Lab.',
    canonical: `${SITE_URL}/portafolio`,
    ogType: 'website',
    ogUrl: `${SITE_URL}/portafolio`,
    ogImage: '/og-image.jpg',
  },
  {
    path: '/asesoria',
    title: 'Asesoria de marketing y sistemas B2B | Growth Video Lab',
    description: 'Asesoría para revisar tu marketing, ordenar prioridades y definir qué acciones conviene ejecutar primero.',
    canonical: `${SITE_URL}/asesoria`,
    ogType: 'website',
    ogUrl: `${SITE_URL}/asesoria`,
    ogImage: '/og-image.jpg',
  },
  {
    path: '/contacto',
    title: 'Contacto | Growth Video Lab',
    description: 'Conversemos sobre tu idea, una herramienta con IA o un proyecto de marketing, diseño y contenido.',
    canonical: `${SITE_URL}/contacto`,
    ogType: 'website',
    ogUrl: `${SITE_URL}/contacto`,
    ogImage: '/og-image.jpg',
  },
];

export function getRouteSeo(pathname: string): SEOMetadata | undefined {
  return PUBLIC_ROUTE_SEO.find((route) => route.path === pathname);
}
