import React, { useRef, useLayoutEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { useNavigate, useLocation } from 'react-router-dom';

const CtaBanner = () => {
  const container = useRef<HTMLDivElement>(null);
  const blackPanel = useRef<HTMLDivElement>(null);
  const yellowPanel = useRef<HTMLDivElement>(null);
  const follower = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // We use matchMedia to only enable this fancy hover effect on Desktop
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        // Setup QuickTo for high-performance mouse tracking
        const xTo = gsap.quickTo(follower.current, "x", { duration: 0.5, ease: "power3" });
        const yTo = gsap.quickTo(follower.current, "y", { duration: 0.5, ease: "power3" });

        // Calculate center for initial position
        const setInitialCenter = () => {
            if(container.current && follower.current) {
                const rect = container.current.getBoundingClientRect();
                xTo(rect.width / 2);
                yTo(rect.height / 2);
            }
        };
        setInitialCenter();

        // Main Animation Timeline (Paused initially)
        const tl = gsap.timeline({ paused: true });

        // 1. Expand Black Panel to 100%
        tl.to(blackPanel.current, { 
            width: "100%", 
            duration: 0.6, 
            ease: "expo.inOut" 
        }, 0);
        
        // 2. Hide Static Content (fade out quickly)
        tl.to(".static-content", { 
            opacity: 0, 
            duration: 0.2, 
            stagger: 0.05 
        }, 0);

        // 3. Reveal Follower (Scale up and fade in)
        tl.fromTo(follower.current, 
            { scale: 0, opacity: 0 }, 
            { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.7)" }, 
            0.1
        );

        // Event Handlers
        const onEnter = () => tl.play();
        const onLeave = () => tl.reverse();
        const onMove = (e: MouseEvent) => {
          if (!container.current) return;
          const rect = container.current.getBoundingClientRect();
          // Offset by the container's position
          xTo(e.clientX - rect.left);
          yTo(e.clientY - rect.top);
        };

        const el = container.current;
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
        el.addEventListener("mousemove", onMove);

        // Cleanup listeners
        return () => {
          el.removeEventListener("mouseenter", onEnter);
          el.removeEventListener("mouseleave", onLeave);
          el.removeEventListener("mousemove", onMove);
        };
      });
    }, container);

    return () => ctx.revert();
  }, []);

  const handleContactClick = () => {
      navigate('/contacto', { state: { background: location } });
  };

  return (
    <section 
      ref={container} 
      onClick={handleContactClick}
      className="relative w-full h-auto md:h-[280px] flex flex-col md:block border-y border-black overflow-hidden cursor-pointer md:cursor-none bg-gvl-yellow"
    >
      
      {/* 
        FOLLOWER ELEMENT (Desktop Only) 
        Centered via transforms initially, then moved by GSAP 
      */}
      <div 
        ref={follower}
        className="hidden md:flex absolute top-0 left-0 z-50 pointer-events-none items-center gap-4 -translate-x-1/2 -translate-y-1/2 mix-blend-difference text-gvl-yellow"
      >
        <span className="text-6xl font-black uppercase tracking-tighter whitespace-nowrap">
            escríbenos
        </span>
        <ArrowUpRight className="w-16 h-16" />
      </div>

      {/* 
        BLACK PANEL (Left side on desktop, Top on mobile)
        Z-Index 20 to sit on top of yellow when expanded
      */}
      <div 
        ref={blackPanel}
        className="w-full md:w-5/12 h-[150px] md:h-full bg-black text-white md:absolute md:left-0 md:top-0 md:z-20 flex items-center justify-center md:border-r border-black"
      >
        <div className="static-content flex items-center gap-4 group md:cursor-none">
            <span className="text-2xl md:text-3xl font-light">escríbenos</span>
            <ArrowUpRight className="w-8 h-8 md:w-10 md:h-10 text-white group-hover:rotate-45 transition-transform" />
        </div>
      </div>

      {/* 
        YELLOW PANEL (Right side on desktop, Bottom on mobile)
        Z-Index 10
      */}
      <div 
        ref={yellowPanel}
        className="w-full md:w-7/12 h-[150px] md:h-full bg-gvl-yellow text-black md:absolute md:right-0 md:top-0 md:z-10 flex items-center justify-center"
      >
        <div className="static-content md:cursor-none">
            <span className="text-2xl md:text-3xl font-medium text-center">hablemos sobre tu proyecto</span>
        </div>
      </div>

    </section>
  );
};

export default CtaBanner;