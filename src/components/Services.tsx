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

  // Apply the scroll-triggered animation to the grid container
  useScrollAnimation(gridRef, {
    from: { opacity: 0, y: 100 },
    to: { stagger: 0.1, duration: 0.8 },
  });

  // Handle the 3D tilt effect separately
  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll('.service-card');
    if (!cards) return;

    cards.forEach((card) => {
      const handleMouseMove = (e: MouseEvent) => {
        const rect = (card as HTMLElement).getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;

        gsap.to(card, {
          rotateX,
          rotateY,
          duration: 0.3,
          ease: 'power2.out',
        });
      };

      const handleMouseLeave = () => {
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.5,
          ease: 'power2.out',
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
              className="service-card glass p-8 rounded-2xl ripple hover:border-white/30 transition-all duration-300 group"
              style={{ perspective: '1000px' }}
            >
              <div className="mb-6">
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
