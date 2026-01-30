import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface CarouselProps {
  images: string[];
  aspectRatio?: 'video' | 'square' | 'portrait' | 'auto';
  className?: string;
  autoPlay?: boolean;
}

export function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

const Carousel: React.FC<CarouselProps> = ({ images, aspectRatio = 'video', className, autoPlay = false }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) nextIndex = images.length - 1;
      if (nextIndex >= images.length) nextIndex = 0;
      return nextIndex;
    });
  };

  const ratioClasses = {
    'video': 'aspect-video',
    'square': 'aspect-square',
    'portrait': 'aspect-[9/16]',
    'auto': ''
  };

  if (!images || images.length === 0) {
    return <div className="p-8 text-center border-2 border-dashed border-gray-300 rounded-xl">No images to display</div>;
  }

  return (
    <div className={cn("relative w-full overflow-hidden group rounded-xl bg-black/5", ratioClasses[aspectRatio], className)}>
      <AnimatePresence initial={false} custom={direction}>
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);

            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
          className="absolute inset-0 w-full h-full object-cover"
          alt={`Slide ${currentIndex + 1}`}
        />
      </AnimatePresence>

      {/* Navigation Buttons */}
      <div className="absolute inset-0 flex items-center justify-between p-4 pointer-events-none z-20">
        <button
          className="p-2 rounded-full bg-white/80 text-black hover:bg-white transition-colors pointer-events-auto shadow-lg backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => paginate(-1)}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          className="p-2 rounded-full bg-white/80 text-black hover:bg-white transition-colors pointer-events-auto shadow-lg backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => paginate(1)}
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 pointer-events-none z-10">
        {images.map((_, idx) => (
          <div
            key={idx}
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-300 shadow-md",
              idx === currentIndex ? "bg-white w-6" : "bg-white/50"
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
