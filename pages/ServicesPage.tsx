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
        eyebrow="services / private index"
        title="No vendemos ruido. Instalamos senal."
        subtitle="Cuatro habitaciones. Una misma sombra."
        ctaLabel="abrir conversacion"
        onCta={goToContact}
        ascii={`SERVICES://INDEX
web      █████░░
content  ███░░░░
brand    ██████░
systems  ██░░░░░
select / build / connect`}
        proof={[
          { label: 'web', value: 'landing rooms' },
          { label: 'marca', value: 'signos secos' },
          { label: 'contenido', value: 'prueba visual' },
          { label: 'sistema', value: 'follow-up oculto' },
        ]}
        offerings={[
          {
            eyebrow: '01 / websites',
            title: 'Puertas negras para ofertas claras.',
            body: 'Sitios, landings, formularios, SEO base.',
          },
          {
            eyebrow: '02 / branding',
            title: 'Identidad con menos sonrisa.',
            body: 'Nombre, marca, tono, piezas.',
          },
          {
            eyebrow: '03 / content',
            title: 'Imagenes como evidencia.',
            body: 'Video, stills, VSL, ads.',
          },
          {
            eyebrow: '04 / systems',
            title: 'La senal no se pierde.',
            body: 'UTM, n8n, CRM, email.',
          },
        ]}
        process={[
          'Elegir la habitacion.',
          'Reducir el mensaje.',
          'Construir el artefacto.',
          'Conectar la salida.',
        ]}
      />
      <CtaBanner />
    </>
  );
};

export default ServicesPage;
