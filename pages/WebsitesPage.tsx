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
        eyebrow="websites / landing pages / quiet conversion"
        title="Una puerta negra. Una razon para entrar."
        subtitle="Sitios pequenos para empresas que no necesitan gritar."
        ctaLabel="cotizar web"
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
          { label: 'stack', value: 'Vercel / React' },
          { label: 'ritmo', value: 'dias, no meses' },
          { label: 'uso', value: 'pauta / outreach / cierre' },
          { label: 'tono', value: 'negro, seco, propio' },
        ]}
        offerings={[
          {
            eyebrow: 'landing rooms',
            title: 'Paginas para una sola decision.',
            body: 'Oferta, objecion, contacto. Nada mas.',
          },
          {
            eyebrow: 'agency home',
            title: 'Home como firma privada.',
            body: 'Poca voz. Mucha presencia.',
          },
          {
            eyebrow: 'signal layer',
            title: 'Prueba sin teatro.',
            body: 'Proceso, alcance, criterio.',
          },
          {
            eyebrow: 'operations',
            title: 'El boton abre una secuencia.',
            body: 'UTM. n8n. CRM. Email.',
          },
        ]}
        process={[
          'Encontrar la objecion.',
          'Escribir lo minimo.',
          'Disenar el artefacto.',
          'Conectar la senal.',
        ]}
      />
      <CtaBanner />
    </>
  );
};

export default WebsitesPage;
