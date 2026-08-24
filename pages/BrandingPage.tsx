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
        title="Diseño de marca e identidad visual en Santiago, Chile."
        subtitle="Definimos la marca y dejamos reglas claras para que tu equipo pueda aplicarla."
        ctaLabel="hablemos"
        onCta={goToContact}
        ascii={`BRAND://ROOM_03
symbol lost / symbol found
name / mark / system`}
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
            body: 'Posicionamiento, propuesta de valor y una dirección clara para la marca.',
          },
          {
            eyebrow: 'voice',
            title: 'Tono y mensaje.',
            body: 'Tono de voz y mensajes para explicar la marca a cada audiencia.',
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
        showcase={[
          {
            eyebrow: 'burgnhdorf',
            title: 'Una identidad con reglas de uso.',
            body: 'Marca, color y criterios de aplicación para mantener consistencia a medida que el proyecto crece.',
            aspectRatio: 'video',
            images: [
              '/assets/images/Marca y Diseño/Burgnhdorf/Mesa de trabajo 1 copia 2.png',
              '/assets/images/Marca y Diseño/Burgnhdorf/Logos Usage.png',
              '/assets/images/Marca y Diseño/Burgnhdorf/colors copia 3.png',
              '/assets/images/Marca y Diseño/Burgnhdorf/colors copia 4.png',
              '/assets/images/Marca y Diseño/Burgnhdorf/colors.png',
            ],
          },
          {
            eyebrow: 'papaland',
            title: 'Una marca para usar todos los días.',
            body: 'Un lenguaje visual que funciona en perfiles, contenido y aplicaciones cotidianas.',
            aspectRatio: 'square',
            images: [
              '/assets/images/Marca y Diseño/Papaland/post 1.png',
              '/assets/images/Marca y Diseño/Papaland/post 2.png',
              '/assets/images/Marca y Diseño/Papaland/FotoPerfil copia.png',
              '/assets/images/Marca y Diseño/Papaland/FotoPerfil.png',
            ],
          },
        ]}
        process={[
          'Revisión del negocio, la categoría y la competencia.',
          'Exploración de direcciones visuales.',
          'Diseño y refinamiento con el equipo.',
          'Manual final y entrega de archivos.',
        ]}
        faq={[
          { question: '¿Hacen solo logo o el proyecto completo?', answer: 'Trabajamos el sistema completo. Un logo aislado rara vez resuelve el problema real.' },
          { question: '¿Cuánto se demora un proyecto de branding?', answer: 'Entre 3 y 6 semanas, según el alcance y los ciclos de revisión.' },
          { question: '¿Incluye el diseño del sitio web?', answer: 'El sitio se cotiza aparte, pero se construye sobre el sistema de marca ya definido.' },
          { question: '¿Trabajan con empresas fuera de Santiago?', answer: 'Sí. Coordinamos el proceso de forma remota con clientes en distintas regiones de Chile.' },
        ]}
      />
      <CtaBanner />
    </>
  );
};

export default BrandingPage;
