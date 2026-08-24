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
        eyebrow="producción de contenido / santiago, chile"
        title="Producción de contenido para redes sociales en Santiago, Chile."
        subtitle="Planificamos y producimos contenido mensual para redes y campañas."
        ctaLabel="hablemos"
        onCta={goToContact}
        ascii={`CONTENT://ROOM_02
grain  grain  grain
█▓▒░ █▓▒░ █▓▒░
camera / edit / silence / proof
signal captured at low light`}
        proof={[
          { label: 'video', value: 'reels, shorts y UGC' },
          { label: 'pauta', value: 'estáticos, carruseles y ads' },
          { label: 'autoridad', value: 'contenido educativo' },
          { label: 'canales', value: 'Instagram, TikTok, LinkedIn, YouTube' },
        ]}
        offerings={[
          {
            eyebrow: 'video',
            title: 'Video para redes y campañas.',
            body: 'Reels, shorts, UGC y anuncios en video para redes y campañas.',
          },
          {
            eyebrow: 'still',
            title: 'Fotografía y piezas de pauta.',
            body: 'Fotos de producto, carruseles y piezas estáticas para cada canal.',
          },
          {
            eyebrow: 'ad rooms',
            title: 'Contenido educativo y de autoridad.',
            body: 'Piezas que explican lo que hace la marca y cómo trabaja.',
          },
          {
            eyebrow: 'system',
            title: 'Testing e iteración.',
            body: 'Probamos formatos y mensajes para decidir qué conviene repetir.',
          },
        ]}
        showcase={[
          {
            eyebrow: 'feed systems',
            title: 'Contenido consistente durante el mes.',
            body: 'Carruseles, campañas y piezas editoriales que mantienen la marca reconocible en cada canal.',
            aspectRatio: 'square',
            images: [
              '/assets/images/Social Media/carrusel/CARRUSEL_FINAL_1.png',
              '/assets/images/Social Media/carrusel/CARRUSEL_FINAL_N_2.png',
              '/assets/images/Social Media/carrusel/CarlosMoraga_Carrusel1.png',
              '/assets/images/Social Media/carrusel/GloriaConcha_Carrusel1.png',
              '/assets/images/Social Media/carrusel/XimenaC_Carrusel1.png',
            ],
          },
          {
            eyebrow: 'campaign cuts',
            title: 'Formatos para campañas y redes.',
            body: 'Stories, campañas estacionales y piezas de respuesta directa para probar mensajes en distintos formatos.',
            aspectRatio: 'portrait',
            images: [
              '/assets/images/Social Media/carrusel 2/Post - Weedmaps.png',
              '/assets/images/Social Media/carrusel 2/sept-26.png',
              '/assets/images/Social Media/carrusel 2/oct-9.png',
              '/assets/images/Social Media/Halloween 1.png',
              '/assets/images/Social Media/carrusel/XimenaC_Story1.png',
            ],
          },
        ]}
        process={[
          'Calendario editorial mensual.',
          'Producción en bloques para tener material del mes.',
          'Pruebas de formato y mensaje por canal.',
          'Revisión de resultados y ajustes para el próximo ciclo.',
        ]}
        faq={[
          { question: '¿Cuánto contenido producen al mes?', answer: 'Depende del plan; los proyectos activos suelen partir en 8–12 piezas mensuales.' },
          { question: '¿Incluye pauta o solo producción?', answer: 'La producción y la pauta se pueden contratar juntas o por separado.' },
          { question: '¿Graban en oficinas o en estudio?', answer: 'Ambas opciones son posibles, según el tipo de pieza y la historia que haya que contar.' },
          { question: '¿Producen contenido fuera de Santiago?', answer: 'Sí. Coordinamos producción remota o en terreno según la ubicación del cliente.' },
        ]}
      />
      <CtaBanner />
    </>
  );
};

export default ContentPage;
