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
      description: 'Web, marca, contenido y sistemas de prospeccion para empresas que quieren una presencia mas seria y menos ruidosa.',
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
        title="Agencia de growth marketing en Santiago."
        subtitle="Trabajamos como equipo extendido, integrado a tu operación."
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
            body: 'Optimización semana a semana, basada en datos reales.',
          },
          {
            eyebrow: '02 / contenido',
            title: 'Piezas para redes y campañas.',
            body: 'Producción constante para probar, medir y ajustar.',
          },
          {
            eyebrow: '03 / CRO',
            title: 'Cada paso entre el clic y la conversión.',
            body: 'Auditoría y optimización del embudo completo.',
          },
          {
            eyebrow: '04 / marca',
            title: 'Identidad lista para cualquier canal.',
            body: 'Sistema visual y verbal para que la marca opere con consistencia.',
          },
        ]}
        process={[
          'Definir el objetivo de crecimiento.',
          'Elegir las disciplinas necesarias.',
          'Probar, medir e iterar.',
          'Escalar lo que funciona.',
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
