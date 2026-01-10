import React, { useEffect, useRef } from 'react';

export const BubbleBackground = ({
  interactive = true,
  className = "",
}: {
  interactive?: boolean;
  className?: string;
}) => {
  const interactiveRef = useRef<HTMLDivElement>(null);
  
  // Use refs instead of state for animation values to avoid re-renders on every frame
  const positionRef = useRef({
    curX: 0,
    curY: 0,
    tgX: 0,
    tgY: 0
  });

  useEffect(() => {
    if (!interactive) return;

    let animationFrameId: number;

    const move = () => {
      const pos = positionRef.current;
      
      // Lerp logic (Linear Interpolation)
      pos.curX += (pos.tgX - pos.curX) / 20;
      pos.curY += (pos.tgY - pos.curY) / 20;

      if (interactiveRef.current) {
        interactiveRef.current.style.transform = `translate(${Math.round(pos.curX)}px, ${Math.round(pos.curY)}px)`;
      }
      
      animationFrameId = requestAnimationFrame(move);
    };

    // Start the loop
    move();

    const handleMouseMove = (event: MouseEvent) => {
      if (interactiveRef.current) {
        const rect = interactiveRef.current.getBoundingClientRect();
        // Update target values in ref without triggering re-render
        positionRef.current.tgX = event.clientX - rect.left;
        positionRef.current.tgY = event.clientY - rect.top;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [interactive]); // Only re-run if interactive prop changes, not on every frame

  return (
    <div className={`absolute inset-0 overflow-hidden bg-white ${className}`}>
      <div className="svg-blur hidden">
        <svg>
          <defs>
            <filter id="bb-blur">
              <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
                result="bb-blur"
              />
              <feBlend in="SourceGraphic" in2="bb-blur" />
            </filter>
          </defs>
        </svg>
      </div>
      <div className="gradients-container h-full w-full [filter:url(#bb-blur)_blur(60px)] opacity-100">
        {/* GVL Blue - Strong */}
        <div 
            className="absolute top-[10%] left-[10%] h-[400px] w-[400px] rounded-full bg-[#1E90FF] mix-blend-multiply opacity-70 animate-blob"
            style={{ animationDelay: '0s' }}
        ></div>
        {/* GVL Yellow - Strong */}
        <div 
            className="absolute top-[20%] right-[10%] h-[350px] w-[350px] rounded-full bg-[#DFFF00] mix-blend-multiply opacity-60 animate-blob"
            style={{ animationDelay: '2s' }}
        ></div>
        {/* GVL Green - Strong */}
        <div 
            className="absolute bottom-[10%] left-[30%] h-[400px] w-[400px] rounded-full bg-[#32CD32] mix-blend-multiply opacity-60 animate-blob"
            style={{ animationDelay: '4s' }}
        ></div>
         {/* Secondary Blue */}
        <div 
            className="absolute bottom-[20%] right-[20%] h-[300px] w-[300px] rounded-full bg-blue-300 mix-blend-multiply opacity-80 animate-blob"
            style={{ animationDelay: '6s' }}
        ></div>
        
        {/* Interactive Bubble */}
        <div
          ref={interactiveRef}
          className="absolute -top-[150px] -left-[150px] h-[300px] w-[300px] rounded-full bg-[#1E90FF] mix-blend-multiply opacity-90 blur-xl"
        ></div>
      </div>
      
      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 10s infinite;
        }
      `}</style>
    </div>
  );
};