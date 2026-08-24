import type { ProposalData } from '../../lib/proposals/types';

export const gradoClimaProposal: ProposalData = {
  id: 'grado-clima-7f3b',
  client: 'GradoClima',
  dateLabel: 'Febrero 2026',
  eyebrow: 'Propuesta confidencial',
  titleLines: ['Sistema de', 'Adquisición'],
  accentLine: 'GradoClima',
  introduction: 'Un sistema predecible para potenciar el crecimiento de GradoClima y llegar a los 50 edificios, usando la infraestructura, la reputación y los casos de éxito que ya existen.',
  quote: '13 años de entrega impecable merecen un sistema de adquisición igual de bueno.',
  heroStats: [
    { value: '4', label: 'Convenios nuevos / mes hoy', context: '99% por recomendación · no escala' },
    { value: '50', label: 'Edificios meta · 100 convenios', context: 'Para cubrir los 2 técnicos nuevos en 6 meses' },
    { value: '$25M', label: 'CLP ingreso recurrente potencial', context: '50 edificios × $500.000/mes promedio' },
  ],
  diagnosis: {
    title: 'La reputación ya funciona. Falta el sistema.',
    introduction: 'GradoClima no parte desde cero. La oportunidad está en convertir su autoridad técnica y base existente en un canal comercial constante.',
    stats: [
      { value: '99%', label: 'Boca a boca', context: 'Funciona porque la reputación es sólida, pero no permite proyectar el crecimiento.' },
      { value: '4/mes', label: 'Leads actuales', context: 'Sin campañas activas y con picos previos que demuestran una demanda mayor.' },
      { value: '6 meses', label: 'Horizonte', context: 'El equipo técnico está listo; ahora necesita una entrada predecible de oportunidades.' },
    ],
    conclusion: 'No se trata de reemplazar los referidos. Se trata de construir un segundo motor alrededor de la confianza que ya existe.',
  },
  solution: {
    title: 'Cuatro movimientos, un solo sistema.',
    introduction: 'Cada parte alimenta a la siguiente: la oferta abre conversaciones, el outreach crea demanda, el contenido reduce fricción y los datos afinan el sistema.',
    pillars: [
      { title: 'Reactivación y mejora de oferta', description: 'Ordenamos la base existente, refinamos la oferta y detectamos oportunidades de reactivación y upsell.', tag: 'Base existente · Refinamiento' },
      { title: 'Outreach a administradores', description: 'Secuencias segmentadas para entregar valor real, tocar dolores concretos y abrir reuniones calificadas.', tag: 'Cold outreach · Autoridad' },
      { title: 'Contenido de autoridad', description: 'Sesiones mensuales para convertir la experiencia de Sebastián en piezas para email, LinkedIn, Instagram y YouTube.', tag: 'Contenido · Presencia digital' },
      { title: 'Optimización continua', description: 'Revisión quincenal de mensajes, segmentos y resultados para ajustar el sistema con evidencia.', tag: 'Datos · Iteración' },
    ],
  },
  content: {
    title: 'Así se ve la autoridad.',
    introduction: 'VSL y casos de éxito grabados en oficina. Simples, directos y producidos para que el prospecto conozca a GradoClima antes de la primera reunión.',
    images: [
      { src: '/gc-vsl-1.png', label: 'Referencia audiovisual', caption: 'Entrevista / Talking Head profesional' },
      { src: '/gc-vsl-2.png', label: 'VSL de autoridad', caption: 'Contenido educativo estratégico' },
    ],
    examples: [
      { title: 'VSL comercial', description: 'Video de 1–3 minutos enfocado en convertir para mailings, LinkedIn y campañas.', example: '¿Cuánto le está costando a tu edificio no tener mantención preventiva?' },
      { title: 'Contenido de autoridad', description: 'Educación real sobre calderas, eficiencia energética y normativas.', example: '3 señales de que tu sala de calderas necesita mantención urgente.' },
      { title: 'Casos de éxito en video', description: 'Resultados reales de GradoClima transformados en evidencia visual y comercial.', example: 'Cómo este edificio redujo 46% su consumo de gas en 2 meses.' },
    ],
  },
  investment: {
    title: 'Plan de trabajo',
    introduction: 'Estructurado para construir activos comerciales de largo plazo desde el día uno.',
    plans: [
      {
        eyebrow: 'Inversión inicial',
        title: 'Setup estratégico',
        price: '$775.000',
        cadence: 'CLP · pago único',
        deliverables: [
          'Configuración de Mailchimp: listas, segmentos y automatizaciones básicas',
          'Setup de Instantly y calentamiento de 2–3 dominios nuevos',
          'Configuración técnica de SPF, DKIM y DMARC',
          'Segmentación de la base actual y definición del ICP',
          'Secuencias de cold outreach y copy de primeras campañas',
          'Rediseño de 3 PDFs de oferta comercial',
          '3–4 VSL grabados y editados',
          'Optimización simple del sitio web',
          'Línea editorial y primeros 10 posts programados',
        ],
      },
      {
        eyebrow: 'Servicio mensual',
        title: 'Gestión & contenido',
        price: '$600.000',
        cadence: 'CLP · mensual',
        featured: true,
        deliverables: [
          'Gestión y optimización de campañas de cold outreach',
          'A/B testing de mensajes y segmentos',
          'Gestión de Mailchimp y nurturing de leads',
          '2 sesiones de grabación mensuales',
          '6–8 piezas de video editadas',
          '10 posts mensuales publicados y programados',
          'Copywriting técnico para emails y secuencias',
          'Reporte mensual de aperturas, respuestas, reuniones y alcance',
          'Reunión quincenal de revisión estratégica',
        ],
      },
    ],
    addons: [
      { title: 'Podcast / Conversatorio', price: '+$400.000', cadence: 'mensual', description: 'Producción completa de entrevistas para atraer autoridades de la industria y generar fragmentos de alto impacto.' },
      { title: 'Curso Operador Caldera', price: '$500.000', cadence: 'pago único', description: 'Lead magnet técnico para que administradores lo entreguen a sus equipos y conserjes.' },
    ],
    guarantee: 'El setup inicial se paga al firmar. El cobro mensual comienza solo después de conseguir las primeras reuniones calificadas agendadas.',
    roiTitle: '50 edificios representan $25M CLP/mes de ingreso recurrente nuevo.',
    roiBody: 'La inversión mensual equivale al 2,4% del potencial estimado. El sistema se construye hoy para escalar mañana.',
  },
  timeline: {
    title: 'Cómo arrancamos',
    items: [
      { period: 'Semana 0', title: 'Acuerdo técnico', description: 'Firma de contrato y pago del setup inicial.' },
      { period: 'Semana 1–2', title: 'Infraestructura', description: 'Setup de emails, segmentación y primera sesión de grabación.' },
      { period: 'Semana 3', title: 'Lanzamiento', description: 'Activación de outreach y primer contenido publicado.' },
      { period: 'Mes 2–3', title: 'Optimización y resultados', description: 'Primeras reuniones agendadas y ajustes de oferta, mensajes y segmentos.' },
      { period: 'Mes 4–6', title: 'Escalamiento', description: 'Consolidación de autoridad y avance hacia la meta de 50 edificios.' },
    ],
  },
  closing: {
    title: '¿Arrancamos esta semana?',
    body: 'La meta de 50 edificios empieza con una decisión estratégica.',
    terms: [
      { label: 'Contrato', value: '3 meses' },
      { label: 'Renovación', value: 'Mensual' },
      { label: 'Aviso', value: '30 días' },
      { label: 'Primer mes', value: 'Post resultados' },
      { label: 'Setup', value: 'Al firmar' },
    ],
  },
};
