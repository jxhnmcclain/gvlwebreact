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
        subtitle="Un flujo constante de variantes para redes y campañas, no una pieza perfecta cada mes."
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
            body: 'Reels, shorts, UGC y anuncios en video para múltiples variantes.',
          },
          {
            eyebrow: 'still',
            title: 'Fotografía y piezas de pauta.',
            body: 'Producto, carruseles y estáticos construidos para cada canal.',
          },
          {
            eyebrow: 'ad rooms',
            title: 'Contenido educativo y de autoridad.',
            body: 'Para posicionar la marca o a sus fundadores.',
          },
          {
            eyebrow: 'system',
            title: 'Testing e iteración.',
            body: 'Mismo mensaje, distintos formatos, con decisiones basadas en performance real.',
          },
        ]}
        showcase={[
          {
            eyebrow: 'feed systems',
            title: 'Identidad que sobrevive al calendario.',
            body: 'Carruseles, campañas y piezas editoriales construidas para sentirse nativas del canal sin perder la marca.',
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
            title: 'Variantes para aprender más rápido.',
            body: 'Stories, campañas estacionales y piezas de respuesta directa: una misma dirección con suficientes formatos para probar.',
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
          'Producción en lotes para mantener velocidad.',
          'Testing de variantes por canal.',
          'Iteración basada en performance real.',
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
