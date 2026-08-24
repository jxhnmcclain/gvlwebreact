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
        eyebrow="diseño de marca / santiago, chile"
        title="Identidad visual y verbal lista para cualquier canal."
        subtitle="Un sistema completo que tu equipo puede aplicar sin depender de un diseñador para cada pieza nueva."
        ctaLabel="hablemos"
        onCta={goToContact}
        ascii={`BRAND://ROOM_03
symbol lost / symbol found
██  ██  ██
░░▒▒▓▓████▓▓▒▒░░
name / mark / rule / ritual`}
        proof={[
          { label: 'estrategia', value: 'posición y propuesta de valor' },
          { label: 'identidad', value: 'logo, paleta y tipografía' },
          { label: 'mensaje', value: 'voz y mensajes clave' },
          { label: 'manual', value: 'referencia para operar' },
        ]}
        offerings={[
          {
            eyebrow: 'mark',
            title: 'Estrategia de marca.',
            body: 'Posicionamiento, propuesta de valor, arquetipo y territorio de marca.',
          },
          {
            eyebrow: 'voice',
            title: 'Tono y mensaje.',
            body: 'Voz de marca, taglines y mensajes clave por audiencia.',
          },
          {
            eyebrow: 'world',
            title: 'Identidad visual.',
            body: 'Logo, paleta de color, tipografía y sistema gráfico.',
          },
          {
            eyebrow: 'kit',
            title: 'Aplicaciones listas para usar.',
            body: 'Redes sociales, presentaciones, plantillas de pauta y empaque cuando aplica.',
          },
        ]}
        process={[
          'Discovery del negocio, categoría y competencia.',
          'Exploración de territorios visuales.',
          'Diseño y refinamiento con el equipo.',
          'Manual final y entrega de archivos.',
        ]}
      />
      <CtaBanner />
    </>
  );
};

export default BrandingPage;
