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
