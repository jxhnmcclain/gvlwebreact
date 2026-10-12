import type { ProposalData } from '../../lib/proposals/types';

export const gradoClimaProposal: ProposalData = {
  id: 'grado-clima-7f3b',
  mode: 'offer',
  client: 'GradoClima',
  dateLabel: 'Octubre 2026',
  eyebrow: 'Propuesta de servicios',
  titleLines: ['Gestión de Redes de', 'GradoClima y Marca Personal de'],
  accentLine: 'Sebastián',
  introduction: 'Contenido y marketing para compartir la experiencia de Sebastián, dueño de GradoClima, y del equipo que trabaja junto a él.',
  quote: 'Sebastián será la voz principal de GradoClima, con el conocimiento de su equipo presente en los contenidos.',
  heroStats: [],
  heroSummary: {
    title: 'La propuesta en breve',
    items: [
      { title: 'Una voz principal', body: 'Sebastián representa a GradoClima y comparte su experiencia y mirada de la industria.' },
      { title: 'Un equipo detrás', body: 'El contenido también mostrará el conocimiento y el trabajo de las personas que forman parte de GradoClima.' },
      { title: 'Un plan de tres meses', body: 'Definimos la estrategia inicial y sostenemos la publicación de contenido y mailing mes a mes.' },
    ],
  },
  sectionLabels: {
    diagnosis: 'punto de partida',
    solution: 'cómo trabajaremos',
    content: 'portafolio',
    investment: 'inversión',
    timeline: 'inicio y pagos',
    closing: 'siguiente paso',
  },
  interestOptions: ['Quiero revisar la propuesta', 'Quiero conversar sobre el alcance'],
  diagnosis: {
    title: 'La experiencia de GradoClima, contada por quienes la conocen.',
    introduction: 'La marca personal de Sebastián y la presencia de GradoClima se pueden trabajar juntas. Él será la voz principal; su equipo aportará el conocimiento y las experiencias que dan vida al contenido.',
    stats: [
      { value: 'Sebastián', label: 'Voz principal', context: 'El dueño de GradoClima comparte su experiencia y punto de vista.' },
      { value: 'El equipo', label: 'Experiencia compartida', context: 'Las personas de GradoClima también forman parte de las historias y temas.' },
      { value: '90 días', label: 'Plan inicial', context: 'Un primer período para ordenar los temas, publicar con constancia y revisar qué interesa a la audiencia.' },
    ],
    conclusion: 'La meta es que la comunicación se sienta coherente: Sebastián al frente y GradoClima presente en cada tema, publicación y conversación.',
  },
  solution: {
    title: 'Estrategia, contenido y mailing en un mismo calendario.',
    introduction: 'Partimos definiendo qué queremos comunicar. Después producimos y organizamos las publicaciones y campañas de correo para que el trabajo del mes esté aprobado antes de salir.',
    pillars: [
      { title: 'Estrategia inicial', description: 'Definimos el enfoque de Sebastián y GradoClima, los temas principales y el plan de contenido para los primeros 90 días.', tag: 'Plan inicial · 90 días' },
      { title: 'Grabación y producción', description: 'Dos jornadas mensuales en las oficinas de GradoClima para crear videos, carruseles y fotografías con Sebastián y su equipo.', tag: 'Producción · 2 jornadas al mes' },
      { title: 'Redes sociales', description: 'Programamos dos publicaciones por semana en LinkedIn e Instagram, adaptando a cada canal las piezas producidas ese mes.', tag: 'LinkedIn · Instagram' },
      { title: 'Mailing semanal', description: 'Redactamos y preparamos cuatro campañas al mes. Al inicio de cada mes se aprueba el calendario de correos junto con el contenido para redes.', tag: '4 campañas · 1 por semana' },
    ],
  },
  content: {
    title: 'Ejemplos de nuestro trabajo',
    introduction: 'Una selección de piezas audiovisuales de nuestro portafolio.',
    images: [
      { src: '/gc-vsl-1.png', label: 'Ejemplo de nuestro trabajo', caption: 'Contenido audiovisual' },
      { src: '/gc-vsl-2.png', label: 'Ejemplo de nuestro trabajo', caption: 'Contenido audiovisual' },
    ],
    examples: [
      { title: 'La mirada de Sebastián', description: 'Ideas, aprendizajes y puntos de vista sobre temas que conoce de primera mano.', example: 'Una conversación directa, desde la experiencia de quien lidera GradoClima.' },
      { title: 'El conocimiento del equipo', description: 'Personas y experiencias de GradoClima que ayudan a explicar cómo trabajan.', example: 'Mostrar quiénes están detrás del trabajo de la empresa.' },
      { title: 'Temas que importan a sus clientes', description: 'Respuestas claras a preguntas y situaciones que aparecen en las conversaciones con sus clientes.', example: 'Contenido útil para abrir una conversación y compartir experiencia.' },
    ],
  },
  investment: {
    title: 'Estrategia y trabajo mensual',
    introduction: 'Los valores están expresados en pesos chilenos y son más IVA. La inversión por la estrategia y los primeros tres meses es de $2.700.000 + IVA. El CRM, la configuración técnica de mailing, las automatizaciones y las licencias de plataformas no están incluidos; si se requieren, revisaremos el alcance y los cotizaremos por separado.',
    plans: [
      {
        eyebrow: 'Pago único',
        title: 'Estrategia inicial',
        price: '$450.000',
        cadence: 'CLP · más IVA',
        deliverables: [
          'Sesión de trabajo con Sebastián para conocer la empresa, sus objetivos y temas prioritarios.',
          'Enfoque de comunicación para la marca personal de Sebastián y las redes de GradoClima.',
          'Pilares de contenido y calendario inicial de 90 días para redes y mailing.',
          'Pago en dos partes: $225.000 + IVA al comenzar y $225.000 + IVA al entregar la estrategia.',
        ],
      },
      {
        eyebrow: 'Servicio mensual · período inicial de 3 meses',
        title: 'Contenido y marketing',
        price: '$750.000',
        cadence: 'CLP · por mes · más IVA',
        featured: true,
        deliverables: [
          '2 jornadas de grabación al mes en las oficinas de GradoClima.',
          '4 reels o videos horizontales al mes.',
          '2 carruseles y 8 fotografías editadas al mes.',
          'Dos publicaciones por semana en LinkedIn e Instagram, adaptando las piezas producidas a cada canal.',
          '1 publicación mensual en YouTube, a partir de una pieza horizontal.',
          '4 campañas de mailing al mes, una por semana, redactadas y preparadas para envío.',
          'Calendario mensual de redes y mailing para revisión y aprobación al inicio de cada mes.',
          'La mensualidad se paga al comienzo de cada mes de servicio.',
        ],
      },
    ],
  },
  timeline: {
    title: 'Empezamos en octubre con la estrategia.',
    items: [
      { period: 'Semana del 19 de octubre', title: 'Primera conversación estratégica', description: 'Si acordamos avanzar después de la reunión del 13 de octubre, tendremos la primera conversación de trabajo la semana siguiente. Al comenzar se paga la primera cuota de estrategia: $225.000 + IVA.' },
      { period: 'Al entregar la estrategia', title: 'Cierre de la etapa inicial', description: 'Se paga la segunda cuota de $225.000 + IVA. La estrategia deja listo el calendario inicial para los primeros 90 días.' },
      { period: 'Noviembre', title: 'Mes 1 de contenido y mailing', description: 'Comienza el primer ciclo mensual. Pago: $750.000 + IVA al inicio del mes.' },
      { period: 'Diciembre', title: 'Mes 2', description: 'Pago mensual de $750.000 + IVA al inicio del mes.' },
      { period: 'Enero', title: 'Mes 3', description: 'Pago mensual de $750.000 + IVA al inicio del mes. Al cierre revisamos el trabajo y acordamos cómo continuar.' },
    ],
  },
  closing: {
    title: '¿Lo revisamos juntos?',
    body: 'Nos reunimos el 13 de octubre para revisar la propuesta. Si avanzamos, la primera conversación de estrategia puede ser la semana del 19 de octubre. Octubre queda para definir el rumbo; el primer ciclo mensual de contenido comienza en noviembre.',
    terms: [
      { label: 'Estrategia inicial', value: '$450.000 + IVA' },
      { label: 'Mensualidad', value: '$750.000 + IVA' },
      { label: 'Período inicial', value: '3 meses' },
      { label: 'Estrategia', value: 'Octubre 2026' },
      { label: 'Primer mes de contenido', value: 'Noviembre 2026' },
    ],
  },
};
