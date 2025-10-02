import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const sublineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const hero = heroRef.current;
    const headline = headlineRef.current;
    const parallax = parallaxRef.current;
    if (!hero || !headline || !parallax) return;

    // Parallax background
    gsap.to(parallax, {
      x: mousePosition.x * 30,
      y: mousePosition.y * 30,
      duration: 1,
      ease: 'power2.out',
    });
  }, [mousePosition]);

  useEffect(() => {
    const hero = heroRef.current;
    const headline = headlineRef.current;
    if (!hero || !headline) return;

    // Split text animation with chars
    const text = headline.textContent || '';
    const chars = text.split('');
    headline.innerHTML = chars
      .map((char) =>
        char === ' '
          ? '<span class="inline-block" style="width: 0.3em"></span>'
          : `<span class="inline-block overflow-hidden"><span class="inline-block">${char}</span></span>`
      )
      .join('');

    const charElements = headline.querySelectorAll('span span');

    gsap.fromTo(
      charElements,
      { y: 120, rotationX: -90, opacity: 0 },
      {
        y: 0,
        rotationX: 0,
        opacity: 1,
        stagger: 0.03,
        duration: 1.2,
        ease: 'power4.out',
        delay: 2.5,
      }
    );

    gsap.fromTo(
      sublineRef.current,
      { opacity: 0, y: 30, filter: 'blur(10px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, delay: 3.8, ease: 'power3.out' }
    );

    gsap.fromTo(
      ctaRef.current,
      { opacity: 0, scale: 0.5, rotateY: -180 },
      { opacity: 1, scale: 1, rotateY: 0, duration: 1, delay: 4.5, ease: 'back.out(1.4)' }
    );

    // Scroll-triggered parallax
    ScrollTrigger.create({
      trigger: hero,
      start: 'top top',
      end: 'bottom top',
      scrub: 1.5,
      onUpdate: (self) => {
        const progress = self.progress;
        gsap.to(headline, {
          scale: 1 - progress * 0.15,
          opacity: 1 - progress * 0.7,
          y: progress * 100,
        });
        gsap.to(sublineRef.current, {
          opacity: 1 - progress * 0.9,
          y: progress * 150,
        });
        gsap.to(ctaRef.current, {
          opacity: 1 - progress * 1,
          y: progress * 200,
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
      <div ref={parallaxRef} className="absolute inset-0 bg-gradient-radial" />
      
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
          className="text-7xl md:text-9xl font-bold mb-8 tracking-tighter text-foreground"
        >
          Premium Digital Experience
        </h1>

        <p
          ref={sublineRef}
          className="text-xl md:text-2xl text-foreground/60 mb-12 max-w-2xl mx-auto"
        >
          Crafting cinematic interfaces with liquid glass aesthetics and seamless interactions
        </p>
        
        <div ref={ctaRef} className="flex gap-4 justify-center flex-wrap">
          <Button
            size="lg"
            className="glass-heavy px-8 py-6 text-lg font-medium ripple hover:scale-105 transition-transform group bg-primary text-primary-foreground shadow-lg shadow-primary/30 hover:shadow-primary/50"
          >
            Explore Our Work
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="glass px-8 py-6 text-lg font-medium border-foreground/20 hover:border-foreground/40 hover:scale-105 transition-all text-foreground"
          >
            View Projects
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
