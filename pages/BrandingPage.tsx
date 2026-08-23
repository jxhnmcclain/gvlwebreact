import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AgencyLabPage from '../components/AgencyLabPage';
import CtaBanner from '../components/CtaBanner';

const BrandingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const goToContact = () => {
    navigate('/contacto', { state: { background: location } });
  };

  return (
    <>
      <AgencyLabPage
        eyebrow="identity / marks / private systems"
        title="Una marca no tiene que sonreir."
        subtitle="Identidades secas, precisas, con algo debajo."
        ctaLabel="marcar territorio"
        onCta={goToContact}
        ascii={`BRAND://ROOM_03
symbol lost / symbol found
██  ██  ██
░░▒▒▓▓████▓▓▒▒░░
name / mark / rule / ritual`}
        proof={[
          { label: 'entrega', value: 'marca / guia / piezas' },
          { label: 'tono', value: 'reservado / fuerte' },
          { label: 'uso', value: 'web / social / ventas' },
          { label: 'salida', value: 'sistema, no logo' },
        ]}
        offerings={[
          {
            eyebrow: 'mark',
            title: 'Un signo que aguante repeticion.',
            body: 'Logo, sistema grafico, reglas simples.',
          },
          {
            eyebrow: 'voice',
            title: 'Copy con menos perfume.',
            body: 'Decir poco. Sonar exacto.',
          },
          {
            eyebrow: 'world',
            title: 'Textura para no parecer default.',
            body: 'ASCII, dither, sombra, borde, pausa.',
          },
          {
            eyebrow: 'kit',
            title: 'Activos listos para salir.',
            body: 'Web, deck, post, firma, landing.',
          },
        ]}
        process={[
          'Nombrar el territorio.',
          'Definir lo que no se dice.',
          'Construir el sistema.',
          'Dejarlo listo para operar.',
        ]}
      />
      <CtaBanner />
    </>
  );
};

export default BrandingPage;
