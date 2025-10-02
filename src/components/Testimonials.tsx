import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: 'Sarah Chen',
    position: 'CEO, Tech Corp',
    content: 'Exceptional work on our website. The animations are smooth and professional.',
    rating: 5,
  },
  {
    name: 'Michael Ross',
    position: 'Creative Director',
    content: 'Premium quality design and flawless execution. Highly recommended!',
    rating: 5,
  },
  {
    name: 'Emma Davis',
    position: 'Product Manager',
    content: 'The liquid glass aesthetic brought our brand to life in ways we never imagined.',
    rating: 5,
  },
];

const Testimonials = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    if (!section || !container) return;

    const cards = container.querySelectorAll('.testimonial-card');

    cards.forEach((card, index) => {
      gsap.fromTo(
        card,
        {
          opacity: 0,
          scale: 0.7,
          rotateY: -60,
          z: -200,
        },
        {
          opacity: 1,
          scale: 1,
          rotateY: 0,
          z: 0,
          duration: 1,
          delay: index * 0.2,
          ease: 'back.out(1.5)',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      const handleMouseEnter = () => {
        gsap.to(card, {
          scale: 1.05,
          y: -10,
          rotateX: 5,
          duration: 0.4,
          ease: 'power2.out',
        });

        const quote = card.querySelector('.quote-icon');
        gsap.to(quote, {
          scale: 1.3,
          rotate: 15,
          duration: 0.5,
          ease: 'back.out(1.7)',
        });

        const stars = card.querySelectorAll('.star-rating');
        gsap.to(stars, {
          scale: 1.2,
          stagger: 0.05,
          duration: 0.3,
          ease: 'back.out(2)',
        });
      };

      const handleMouseLeave = () => {
        gsap.to(card, {
          scale: 1,
          y: 0,
          rotateX: 0,
          duration: 0.5,
          ease: 'elastic.out(1, 0.5)',
        });

        const quote = card.querySelector('.quote-icon');
        gsap.to(quote, {
          scale: 1,
          rotate: 0,
          duration: 0.5,
          ease: 'elastic.out(1, 0.5)',
        });

        const stars = card.querySelectorAll('.star-rating');
        gsap.to(stars, {
          scale: 1,
          duration: 0.4,
          ease: 'power2.out',
        });
      };

      card.addEventListener('mouseenter', handleMouseEnter);
      card.addEventListener('mouseleave', handleMouseLeave);
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative py-32 px-6 noise-overlay"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-bold mb-16 text-center">What Clients Say</h2>

        <div ref={containerRef} className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="testimonial-card glass-heavy p-8 rounded-2xl ripple transform-gpu cursor-pointer"
              style={{
                perspective: '1000px',
                transformStyle: 'preserve-3d',
              }}
            >
              <Quote className="quote-icon w-10 h-10 text-white/40 mb-6 transform-gpu" />

              <p className="text-lg text-white/80 leading-relaxed mb-6">
                {testimonial.content}
              </p>

              <div className="flex items-center gap-2 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <div key={i} className="star-rating w-4 h-4 bg-white rounded-full transform-gpu" />
                ))}
              </div>

              <div>
                <h4 className="font-semibold text-lg">{testimonial.name}</h4>
                <p className="text-sm text-white/60">{testimonial.position}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
