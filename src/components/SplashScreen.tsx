import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setTimeout(onComplete, 500);
      },
    });

    tl.fromTo(
      logoRef.current,
      {
        scale: 0.7,
        opacity: 0,
      },
      {
        scale: 1.2,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
      }
    )
      .to(logoRef.current, {
        scale: 1,
        duration: 0.4,
        ease: 'power2.inOut',
      })
      .to(
        containerRef.current,
        {
          clipPath: 'circle(0% at 50% 50%)',
          duration: 1.2,
          ease: 'power4.inOut',
        },
        '+=0.5'
      );
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-black z-50 flex items-center justify-center noise-overlay"
      style={{ clipPath: 'circle(150% at 50% 50%)' }}
    >
      <div className="absolute inset-0 bg-gradient-radial" />
      
      <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="rippleFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.01" numOctaves="3">
              <animate
                attributeName="baseFrequency"
                from="0.01"
                to="0.03"
                dur="4s"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" scale="20" />
          </filter>
        </defs>
        <rect width="100%" height="100%" filter="url(#rippleFilter)" />
      </svg>

      <div
        ref={logoRef}
        className="relative z-10 text-white text-8xl font-bold tracking-tighter"
      >
        r2e
      </div>
    </div>
  );
};

export default SplashScreen;
