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
      title: 'Servicios reservados para empresas B2B | Growth Video Lab',
      description: 'Web, marca, contenido y sistemas de prospección para empresas que quieren conseguir más oportunidades comerciales.',
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
        eyebrow="growth marketing / santiago, chile"
        title="Marketing para conseguir más oportunidades comerciales."
        subtitle="Trabajamos con tu equipo en web, contenido, campañas y procesos comerciales."
        ctaLabel="hablemos"
        onCta={goToContact}
        ascii={`SERVICES://INDEX
web      █████░░
content  ███░░░░
brand    ██████░
systems  ██░░░░░
select / build / connect`}
        proof={[
          { label: '01 / paid', value: 'Meta y Google' },
          { label: '02 / contenido', value: 'producción constante' },
          { label: '03 / CRO', value: 'conversión medida' },
          { label: '04 / marca', value: 'sistema de identidad' },
        ]}
        offerings={[
          {
            eyebrow: '01 / paid',
            title: 'Adquisición de clientes en Meta y Google.',
            body: 'Campañas en Meta y Google revisadas y ajustadas cada semana.',
          },
          {
            eyebrow: '02 / contenido',
            title: 'Piezas para redes y campañas.',
            body: 'Contenido para redes y campañas con un calendario de producción claro.',
          },
          {
            eyebrow: '03 / CRO',
            title: 'Mejoras entre el clic y el contacto.',
            body: 'Revisamos las páginas, formularios y pasos que afectan la conversión.',
          },
          {
            eyebrow: '04 / marca',
            title: 'Una marca que el equipo puede usar.',
            body: 'Identidad visual y mensajes para aplicar en cada canal.',
          },
        ]}
        process={[
          'Definir el objetivo comercial.',
          'Elegir las acciones y canales necesarios.',
          'Ejecutar y revisar resultados.',
          'Ajustar el siguiente ciclo de trabajo.',
        ]}
        faq={[
          { question: '¿Qué disciplinas necesitan para empezar?', answer: 'Partimos del objetivo y definimos si hace falta Paid, contenido, CRO, marca o una combinación.' },
          { question: '¿Trabajan como proveedor o equipo extendido?', answer: 'Las dos. Podemos resolver un proyecto puntual o integrarnos a la operación para iterar con continuidad.' },
        ]}
      />
      <CtaBanner />
    </>
  );
};

export default ServicesPage;
