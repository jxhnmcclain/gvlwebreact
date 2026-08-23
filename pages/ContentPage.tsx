import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AgencyLabPage from '../components/AgencyLabPage';
import CtaBanner from '../components/CtaBanner';

const ContentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const goToContact = () => {
    navigate('/contacto', { state: { background: location } });
  };

  return (
    <>
      <AgencyLabPage
        eyebrow="content / film / useful evidence"
        title="Imagenes que parecen encontradas. No fabricadas."
        subtitle="Video y piezas visuales para que una empresa deje rastro."
        ctaLabel="abrir brief"
        onCta={goToContact}
        ascii={`CONTENT://ROOM_02
grain  grain  grain
█▓▒░ █▓▒░ █▓▒░
camera / edit / silence / proof
signal captured at low light`}
        proof={[
          { label: 'formatos', value: 'vsl / reels / ads' },
          { label: 'ritmo', value: 'guion + rodaje + corte' },
          { label: 'uso', value: 'web / pauta / ventas' },
          { label: 'look', value: 'dither / sombra / criterio' },
        ]}
        offerings={[
          {
            eyebrow: 'video',
            title: 'Piezas que explican sin suplicar.',
            body: 'Una idea. Un corte. Un motivo para creer.',
          },
          {
            eyebrow: 'still',
            title: 'Fotografia como evidencia.',
            body: 'Producto, equipo, proceso. Lo real bien encuadrado.',
          },
          {
            eyebrow: 'ad rooms',
            title: 'Creativos para entrar frio.',
            body: 'Anuncios que no parecen plantillas de anuncios.',
          },
          {
            eyebrow: 'system',
            title: 'Contenido conectado a venta.',
            body: 'Cada pieza sabe a donde manda.',
          },
        ]}
        process={[
          'Encontrar la escena.',
          'Quitar el exceso.',
          'Dejar textura.',
          'Publicar con ruta.',
        ]}
      />
      <CtaBanner />
    </>
  );
};

export default ContentPage;
