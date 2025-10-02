import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const sublineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const headline = headlineRef.current;
    if (!hero || !headline) return;

    // Split text animation
    const text = headline.textContent || '';
    const words = text.split(' ');
    headline.innerHTML = words
      .map((word) => `<span class="inline-block overflow-hidden"><span class="inline-block">${word}</span></span>`)
      .join(' ');

    const wordElements = headline.querySelectorAll('span span');

    gsap.fromTo(
      wordElements,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.15,
        duration: 1,
        ease: 'power3.out',
        delay: 2.5,
      }
    );

    gsap.fromTo(
      sublineRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, delay: 3.5, ease: 'power2.out' }
    );

    gsap.fromTo(
      ctaRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.8, delay: 4, ease: 'back.out(1.7)' }
    );

    // Scroll-triggered scale
    ScrollTrigger.create({
      trigger: hero,
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
      onUpdate: (self) => {
        gsap.to(headline, {
          scale: 1 - self.progress * 0.1,
          opacity: 1 - self.progress * 0.5,
        });
      },
    });

    // Magnetic button effect
    const button = ctaRef.current?.querySelector('button');
    if (button) {
      const handleMouseMove = (e: MouseEvent) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(button, {
          x: x * 0.3,
          y: y * 0.3,
          duration: 0.3,
          ease: 'power2.out',
        });
      };

      const handleMouseLeave = () => {
        gsap.to(button, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: 'elastic.out(1, 0.5)',
        });
      };

      button.addEventListener('mousemove', handleMouseMove);
      button.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        button.removeEventListener('mousemove', handleMouseMove);
        button.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, []);

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center noise-overlay overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-radial" />
      
      <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="heroDistortion">
            <feTurbulence type="fractalNoise" baseFrequency="0.005" numOctaves="2" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="50" />
          </filter>
        </defs>
        <rect width="100%" height="100%" filter="url(#heroDistortion)" fill="url(#gradient)" />
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#fff', stopOpacity: 0.1 }} />
          <stop offset="100%" style={{ stopColor: '#000', stopOpacity: 0 }} />
        </linearGradient>
      </svg>

      <div className="relative z-10 text-center px-6 max-w-5xl">
        <h1
          ref={headlineRef}
          className="text-7xl md:text-9xl font-bold mb-8 tracking-tighter"
        >
          Premium Digital Experience
        </h1>
        
        <p
          ref={sublineRef}
          className="text-xl md:text-2xl text-white/60 mb-12 max-w-2xl mx-auto"
        >
          Crafting cinematic interfaces with liquid glass aesthetics and seamless interactions
        </p>
        
        <div ref={ctaRef}>
          <Button
            size="lg"
            className="glass-heavy px-8 py-6 text-lg font-medium ripple hover:scale-105 transition-transform"
          >
            Explore Our Work
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
