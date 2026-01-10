import React from "react";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";

export default function InfiniteMovingCardsDemo() {
  return (
    <section className="py-20 bg-gvl-cream border-b border-black flex flex-col items-center justify-center relative overflow-hidden">
      <div className="mb-12 text-center px-4">
        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4">
            Ellos confían en <span className="text-gvl-blue">GVL</span>
        </h2>
        <p className="text-lg text-gray-600">Marcas que han transformado su presencia digital</p>
      </div>
      
      <InfiniteMovingCards
        items={testimonials}
        direction="right"
        speed="slow"
      />
    </section>
  );
}

const testimonials = [
  {
    quote:
      "El equipo de GVL entendió nuestra vibra desde el primer día. Nuestros reels pasaron de 200 vistas a más de 50k en un mes.",
    name: "Sofía Martínez",
    title: "CMO, Urban Style",
  },
  {
    quote:
      "Necesitábamos un rebranding urgente y lo que entregaron fue oro puro. Nuestra identidad visual ahora grita profesionalismo.",
    name: "Carlos Ruiz",
    title: "Fundador, TechNova",
  },
  {
    quote: "La mejor inversión que hemos hecho en marketing este año. Su contenido es fresco, rápido y visualmente impactante.",
    name: "Ana P.",
    title: "Directora, Café Moka",
  },
  {
    quote:
      "No son solo diseñadores, son estrategas. El sitio web que crearon aumentó nuestra tasa de conversión un 40%.",
    name: "Javier L.",
    title: "CEO, StartUp One",
  },
  {
    quote:
      "Creatividad sin límites. Siempre tienen una propuesta nueva que nos saca de la zona de confort y funciona.",
    name: "Elena G.",
    title: "Marketing Lead, FitLife",
  },
];