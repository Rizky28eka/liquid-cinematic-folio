import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Sparkles, Layout, Code, Palette } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const services = [
  {
    icon: Sparkles,
    title: 'GSAP Animations',
    description: 'Cinematic transitions, scroll-triggered effects, and smooth timeline animations.',
  },
  {
    icon: Layout,
    title: 'Liquid Glass UI',
    description: 'Premium glass morphism with blur effects, transparency, and subtle ripples.',
  },
  {
    icon: Code,
    title: 'Interactive Development',
    description: 'Magnetic interactions, custom cursors, and parallax scrolling experiences.',
  },
  {
    icon: Palette,
    title: 'Monochrome Design',
    description: 'Sophisticated black, white, and grey palettes with premium aesthetics.',
  },
];

const Services = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = gridRef.current?.querySelectorAll('.service-card');
    if (!section || !cards) return;

    cards.forEach((card, index) => {
      gsap.fromTo(
        card,
        {
          opacity: 0,
          y: 100,
          rotateX: -45,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });
  }, []);

  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll('.service-card');
    if (!cards) return;

    cards.forEach((card) => {
      const icon = card.querySelector('.service-icon');

      const handleMouseMove = (e: MouseEvent) => {
        const rect = (card as HTMLElement).getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -15;
        const rotateY = ((x - centerX) / centerX) * 15;

        gsap.to(card, {
          rotateX,
          rotateY,
          scale: 1.05,
          duration: 0.4,
          ease: 'power2.out',
        });

        gsap.to(icon, {
          scale: 1.2,
          rotate: 360,
          duration: 0.6,
          ease: 'back.out(1.7)',
        });
      };

      const handleMouseLeave = () => {
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          scale: 1,
          duration: 0.6,
          ease: 'elastic.out(1, 0.5)',
        });

        gsap.to(icon, {
          scale: 1,
          rotate: 0,
          duration: 0.6,
          ease: 'elastic.out(1, 0.5)',
        });
      };

      card.addEventListener('mousemove', handleMouseMove as EventListener);
      card.addEventListener('mouseleave', handleMouseLeave);

      // Cleanup function
      return () => {
        card.removeEventListener('mousemove', handleMouseMove as EventListener);
        card.removeEventListener('mouseleave', handleMouseLeave);
      };
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative py-32 px-6 noise-overlay"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-bold mb-16 text-center">Our Services</h2>
        
        <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="service-card glass p-8 rounded-2xl ripple hover:border-white/30 transition-all duration-300 group transform-gpu"
              style={{
                perspective: '1000px',
                transformStyle: 'preserve-3d',
              }}
            >
              <div className="mb-6 service-icon transform-gpu">
                <service.icon className="w-12 h-12 text-white/80 group-hover:text-white transition-colors" />
              </div>
              
              <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
              
              <p className="text-white/60 leading-relaxed">
                {service.description}
              </p>
              
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
