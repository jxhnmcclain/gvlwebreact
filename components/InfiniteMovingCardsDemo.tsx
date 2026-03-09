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
    quote: "John nos hizo la web en una semana. Limpia, rápida y ya nos ha llegado gente por Google. Sin vueltas, entregó lo que prometió.",
    name: "Rodrigo Soto",
    title: "Gerente, Servicios Integrales El Monte",
  },
  {
    quote: "Antes dependíamos 100% de referidos. Con la web nueva empezamos a recibir cotizaciones por correo sin tener que salir a buscarlas.",
    name: "Carla Fuentes",
    title: "Dueña, Limpieza Profesional Las Condes",
  },
  {
    quote: "Le pedí que fuera directo y sin floro — y eso fue exactamente lo que entregó. Resultado limpio en tiempo récord.",
    name: "Sebastián Pino",
    title: "Director, GradoClima",
  },
  {
    quote: "Muy ordenado, cumplió los plazos y nos explicó todo sin hablar en inglés. Se nota que entiende el mercado chileno.",
    name: "Juan Ignacio Vera",
    title: "Socio, Constructora Vera & Torres",
  },
  {
    quote: "La web que teníamos antes asustaba a los clientes. Ahora la mandamos con orgullo en cada cotización.",
    name: "Patricia Lagos",
    title: "Directora Comercial, AdminPro",
  },
];