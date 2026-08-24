import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AgencyLabPage from '../components/AgencyLabPage';
import CtaBanner from '../components/CtaBanner';

const WebsitesPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const goToContact = () => {
    navigate('/contacto', { state: { background: location } });
  };

  return (
    <>
      <AgencyLabPage
        eyebrow="diseño y desarrollo web / santiago, chile"
        title="Diseño y desarrollo web en Santiago, Chile."
        subtitle="Cada proyecto parte de un objetivo de negocio concreto: captar leads, vender online o dar soporte a una campaña."
        ctaLabel="hablemos"
        onCta={goToContact}
        ascii={`WEB://ROOM_01
┌───────────────┐
│ trust before  │
│ traffic       │
└──────┬────────┘
       │
lead path / locked room / signal
00000000000000000000000000000000`}
        proof={[
          { label: 'plataformas', value: 'WordPress / Shopify / Webflow / React' },
          { label: 'integraciones', value: 'CRM / email / analítica' },
          { label: 'base', value: 'SEO técnico y performance' },
          { label: 'proceso', value: 'diagnóstico a iteración' },
        ]}
        offerings={[
          {
            eyebrow: 'landing rooms',
            title: 'La plataforma sigue al objetivo.',
            body: 'Elegimos el stack que sirve al negocio, no al que nos resulta más cómodo.',
          },
          {
            eyebrow: 'agency home',
            title: 'Integraciones que completan la ruta.',
            body: 'HubSpot, Twenty CRM, GA4, Meta Pixel, Webpay, Mercado Pago, Stripe, n8n o Zapier.',
          },
          {
            eyebrow: 'signal layer',
            title: 'SEO técnico y performance.',
            body: 'Core Web Vitals, carga optimizada, datos estructurados y diseño mobile-first.',
          },
          {
            eyebrow: 'operations',
            title: 'Iteración post-lanzamiento.',
            body: 'Medimos el uso real y ajustamos desde los datos.',
          },
        ]}
        process={[
          'Diagnóstico y arquitectura de la información.',
          'Diseño UI/UX.',
          'Desarrollo, QA y performance.',
          'Lanzamiento, analítica e iteración.',
        ]}
        faq={[
          { question: '¿Cuánto se demora un sitio web?', answer: 'Depende del alcance: una landing puede estar en 2–3 semanas; un sitio con integraciones suele tomar entre 4 y 8.' },
          { question: '¿Trabajan solo con WordPress?', answer: 'No. Elegimos WordPress, Shopify, Webflow o desarrollo a medida según el objetivo del sitio.' },
          { question: '¿El sitio incluye SEO?', answer: 'Incluye la base técnica: velocidad, estructura, datos estructurados y diseño mobile-first. El contenido SEO se trabaja aparte.' },
          { question: '¿Hacen mantención después del lanzamiento?', answer: 'Sí. Puede ser un servicio aparte o parte de un plan de iteración.' },
        ]}
      />
      <CtaBanner />
    </>
  );
};

export default WebsitesPage;
