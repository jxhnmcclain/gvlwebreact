import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const AnimatedWord = ({ word, fontClass, onComplete }: {
    word: string;
    fontClass: string;
    onComplete: () => void;
}) => {
    const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);

    useEffect(() => {
        const tl = gsap.timeline({
            onComplete: () => {
                // Short pause before signaling the next word to avoid rapid-fire glitches
                gsap.delayedCall(0.1, onComplete);
            }
        });

        // Initial state: hidden below
        gsap.set(lettersRef.current, { y: 60, opacity: 0 });

        // Entrance: Rapid stagger from below
        tl.to(lettersRef.current, {
            y: 0,
            opacity: 1,
            duration: 0.3,
            stagger: 0.02,
            ease: "back.out(1.5)"
        });

        // Pause for a beat
        tl.to({}, { duration: 0.5 });

        // Exit: Upwards clipping
        tl.to(lettersRef.current, {
            y: -60,
            opacity: 0,
            duration: 0.3,
            stagger: 0.02,
            ease: "power2.in"
        });

        return () => {
            tl.kill();
        };
    }, [word, onComplete]);

    return (
        <div className={`absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none ${fontClass}`}>
            <div className="flex whitespace-nowrap">
                {word.split('').map((char, i) => (
                    <span
                        key={i}
                        ref={el => lettersRef.current[i] = el}
                        className="inline-block"
                    >
                        {char === ' ' ? '\u00A0' : char}
                    </span>
                ))}
            </div>
        </div>
    );
};

const Logo = () => {
    const logoRef = useRef<HTMLDivElement>(null);
    const normalViewRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [currentWordIndex, setCurrentWordIndex] = useState(0);

    // Increased the height and font sizes to accommodate the "large" look
    const words = [
        { text: "GROWTH", font: "text-[3rem] font-[800] font-sans uppercase text-black" },
        { text: "video", font: "text-[3.5rem] font-pixel lowercase text-black" },
        { text: "LAB", font: "text-[3.5rem] font-[300] font-sans uppercase text-black" }
    ];

    const timelineIdle = useRef<gsap.core.Timeline | null>(null);

    useEffect(() => {
        timelineIdle.current = gsap.timeline({ repeat: -1, yoyo: true })
            .to(logoRef.current, {
                y: -3,
                duration: 2,
                ease: "power1.inOut"
            });

        return () => {
            timelineIdle.current?.kill();
        };
    }, []);

    const handleMouseEnter = () => {
        setIsHovered(true);
        setCurrentWordIndex(0); // Start from GROWTH
        gsap.to(normalViewRef.current, {
            opacity: 0,
            y: -10,
            duration: 0.2,
            ease: "power2.in"
        });
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        gsap.to(normalViewRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.2,
            ease: "power2.out"
        });
    };

    const nextWord = () => {
        if (isHovered) {
            setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }
    };

    return (
        <div
            ref={logoRef}
            className="relative w-[240px] h-[80px] cursor-pointer select-none flex items-center justify-center overflow-visible"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Normal View */}
            <div
                ref={normalViewRef}
                className="flex flex-col leading-none items-center"
            >
                <span className="text-[2.1rem] font-[600] tracking-[-0.05em] uppercase font-sans">
                    GROWTH
                </span>
                <div className="flex items-baseline -mt-2">
                    <span className="text-[2.2rem] font-pixel lowercase mr-1">
                        video
                    </span>
                    <span className="text-[2.2rem] font-[300] uppercase font-sans tracking-tight">
                        LAB
                    </span>
                </div>
            </div>

            {/* Hover Sequence View */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {isHovered && words.map((word, index) => (
                    index === currentWordIndex && (
                        <AnimatedWord
                            key={`${index}-${word.text}`} // Force re-mount for animation
                            word={word.text}
                            fontClass={word.font}
                            onComplete={nextWord}
                        />
                    )
                ))}
            </div>
        </div>
    );
};

export default Logo;
