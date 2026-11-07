import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AgencyLabPage from '../components/AgencyLabPage';
import CtaBanner from '../components/CtaBanner';
import { setMetaTags, SITE_URL } from '../lib/seo';

const ServicesPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    setMetaTags({
      title: 'Herramientas con IA y marketing creativo | Growth Video Lab',
      description: 'Estudio creativo que desarrolla aplicaciones y automatizaciones con IA, y trabaja en estrategia, diseño, contenido y campañas.',
      canonical: `${SITE_URL}/servicios`,
      ogType: 'website',
      ogUrl: `${SITE_URL}/servicios`,
      ogImage: '/og-image.jpg',
    });
  }, []);

  const goToContact = () => {
    navigate('/contacto', { state: { background: location } });
  };

  return (
    <>
      <AgencyLabPage
        eyebrow="estudio creativo / santiago, chile"
        title="Creatividad, marketing y herramientas con IA."
        subtitle="Construimos aplicaciones y automatizaciones. También diseñamos y ejecutamos marketing, contenido y marca."
        ctaLabel="hablemos"
        onCta={goToContact}
        ascii={`SERVICES://INDEX
web      █████░░
content  ███░░░░
brand    ██████░
systems  ██░░░░░
select / build / connect`}
        proof={[
          { label: '01 / herramientas', value: 'aplicaciones con IA' },
          { label: '02 / procesos', value: 'flujos e integraciones' },
          { label: '03 / marketing', value: 'estrategia y ejecución' },
          { label: '04 / aprendizaje', value: 'curso en construcción' },
        ]}
        offerings={[
          {
            eyebrow: '01 / herramientas',
            title: 'Aplicaciones y herramientas con IA.',
            body: 'Desarrollamos prototipos y aplicaciones para organizar información, crear un recurso o probar una idea.',
          },
          {
            eyebrow: '02 / procesos',
            title: 'Automatización e integraciones.',
            body: 'Diseñamos flujos que conectan plataformas y reducen pasos repetidos, con revisión humana donde importa.',
          },
          {
            eyebrow: '03 / marketing',
            title: 'Marketing, contenido y diseño.',
            body: 'Pensamos y ejecutamos estrategia, contenido, diseño y campañas para personas, proyectos y marcas.',
          },
          {
            eyebrow: '04 / laboratorio',
            title: 'Prototipos y productos propios.',
            body: 'Probamos ideas digitales y desarrollamos recursos para compartir lo que aprendemos al construir.',
          },
        ]}
        process={[
          'Entender la idea o el proceso que quieres mejorar.',
          'Elegir qué conviene diseñar, conectar o comunicar.',
          'Construir la herramienta o producir la campaña.',
          'Probar el resultado y ajustar lo que haga falta.',
        ]}
        faq={[
          { question: '¿Qué podemos construir?', answer: 'Aplicaciones, prototipos, automatizaciones y conexiones entre herramientas. Definimos el alcance a partir de la tarea que necesitas resolver.' },
          { question: '¿También hacen marketing?', answer: 'Sí. Trabajamos en estrategia, diseño, contenido y campañas. La IA entra cuando ayuda al proceso; no hace falta convertir cada proyecto en una aplicación.' },
          { question: '¿Qué es «De cero a deploy»?', answer: 'Es el nombre provisional de nuestro primer producto educativo. Estamos creando un curso gamificado de tres niveles para que diseñadores y creativos aprendan a construir herramientas con IA y publicar una aplicación. Todavía está en desarrollo.' },
        ]}
      />
      <CtaBanner />
    </>
  );
};

export default ServicesPage;
