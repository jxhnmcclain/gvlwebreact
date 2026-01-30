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
    quote: "He's skilled for my requirements. He's been very prompt with his response. We had to go back and forth with the revisions but he was extremely patient with me. I'm satisfied with the work he has done.",
    name: "Emily Watson",
    title: "Project Manager, Nexus",
  },
  {
    quote: "Pleased to continue to have John's professionalism and creativity. For your position I will continue to count on it for future projects",
    name: "Mark Stevens",
    title: "Founder, Peak Horizon",
  },
  {
    quote: "He did a great job on the logos. I will certainly rehire him soon",
    name: "Sophia Rossi",
    title: "Design Director, Studio S",
  },
  {
    quote: "He did a great job on the logos. I will certainly rehire him soon",
    name: "Julian Brooks",
    title: "Marketing Lead, Visionary",
  },
];