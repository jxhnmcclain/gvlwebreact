import { SEOMetadata, SITE_URL } from './seo';

type RouteSEOMetadata = SEOMetadata & {
  path: string;
};

export const PUBLIC_ROUTE_SEO: RouteSEOMetadata[] = [
  {
    path: '/',
    title: 'Growth Video Lab | Agencia B2B reservada en Santiago',
    description: 'Webs, marca, contenido y sistemas de prospeccion para empresas B2B que necesitan verse mas serias antes de pedir otra reunion.',
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
    title: 'Contenido para redes sociales B2B | Growth Video Lab',
    description: 'Reels, carruseles y sistemas de contenido para marcas que quieren presencia constante sin parecer una fabrica de posts vacios.',
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
    title: 'Agencia de growth marketing en Santiago | Growth Video Lab',
    description: 'Paid, contenido, CRO y marca para empresas en Santiago que necesitan crecer con datos, no con suposiciones.',
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
    path: '/b2b-ebook-generacion-sistema',
    title: 'Sistema de prospeccion B2B | Growth Video Lab',
    description: 'Recurso gratuito para empresas B2B que quieren dejar de depender solo de referidos y construir un sistema de reuniones calificadas.',
    canonical: `${SITE_URL}/b2b-ebook-generacion-sistema`,
    ogType: 'website',
    ogUrl: `${SITE_URL}/b2b-ebook-generacion-sistema`,
    ogImage: '/og-image.jpg',
  },
  {
    path: '/blog',
    title: 'Blog de marketing B2B | Growth Video Lab',
    description: 'Guias practicas sobre webs, SEO local, prospeccion B2B, contenido y sistemas para empresas de servicios en Chile.',
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
    description: 'Asesoria directa para ordenar tu presencia digital, detectar bloqueos comerciales y construir un sistema de crecimiento mas claro.',
    canonical: `${SITE_URL}/asesoria`,
    ogType: 'website',
    ogUrl: `${SITE_URL}/asesoria`,
    ogImage: '/og-image.jpg',
  },
  {
    path: '/contacto',
    title: 'Contacto | Growth Video Lab',
    description: 'Conversemos sobre tu web, marca, contenido o sistema de prospeccion B2B.',
    canonical: `${SITE_URL}/contacto`,
    ogType: 'website',
    ogUrl: `${SITE_URL}/contacto`,
    ogImage: '/og-image.jpg',
  },
];

export function getRouteSeo(pathname: string): SEOMetadata | undefined {
  return PUBLIC_ROUTE_SEO.find((route) => route.path === pathname);
}
