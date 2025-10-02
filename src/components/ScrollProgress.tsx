import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ScrollProgress = () => {
  const progressRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const progress = progressRef.current;
    const circle = circleRef.current;
    if (!progress || !circle) return;

    const radius = 20;
    const circumference = 2 * Math.PI * radius;
    circle.style.strokeDasharray = `${circumference}`;
    circle.style.strokeDashoffset = `${circumference}`;

    gsap.fromTo(
      progress,
      { opacity: 0, scale: 0 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          start: '200',
          toggleActions: 'play none none reverse',
        },
      }
    );

    ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        const scrollPercentage = self.progress;
        const offset = circumference - scrollPercentage * circumference;
        gsap.to(circle, {
          strokeDashoffset: offset,
          duration: 0.3,
          ease: 'power2.out',
        });
      },
    });

    const handleMouseEnter = () => {
      gsap.to(progress, {
        scale: 1.2,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(progress, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const handleClick = () => {
      gsap.to(window, {
        scrollTo: { y: 0 },
        duration: 1.5,
        ease: 'power3.inOut',
      });
    };

    progress.addEventListener('mouseenter', handleMouseEnter);
    progress.addEventListener('mouseleave', handleMouseLeave);
    progress.addEventListener('click', handleClick);

    return () => {
      progress.removeEventListener('mouseenter', handleMouseEnter);
      progress.removeEventListener('mouseleave', handleMouseLeave);
      progress.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <div
      ref={progressRef}
      className="fixed bottom-8 right-8 z-50 cursor-pointer glass-heavy rounded-full p-2 transform-gpu"
      style={{ width: '56px', height: '56px' }}
    >
      <svg className="w-full h-full transform -rotate-90">
        <circle
          cx="28"
          cy="28"
          r="20"
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth="3"
          fill="none"
        />
        <circle
          ref={circleRef}
          cx="28"
          cy="28"
          r="20"
          stroke="rgba(255, 255, 255, 0.9)"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-white"
        >
          <polyline points="18 15 12 9 6 15" />
        </svg>
      </div>
    </div>
  );
};

export default ScrollProgress;
