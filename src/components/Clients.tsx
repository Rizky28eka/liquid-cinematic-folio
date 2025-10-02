import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const clients = [
  'TechCorp', 'DesignLab', 'Premium Co', 'Creative Studio',
  'Digital Agency', 'Innovation Inc', 'Future Labs', 'Elite Brand',
];

const Clients = () => {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    const logos = marquee.querySelectorAll('.client-logo');

    // Infinite marquee
    gsap.to(logos, {
      x: '-100%',
      duration: 20,
      ease: 'none',
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x) => parseFloat(x) % 100),
      },
    });

    // Hover scale effect
    logos.forEach((logo) => {
      logo.addEventListener('mouseenter', () => {
        gsap.to(logo, {
          scale: 1.1,
          duration: 0.3,
          ease: 'back.out(1.5)',
        });
      });

      logo.addEventListener('mouseleave', () => {
        gsap.to(logo, {
          scale: 1,
          duration: 0.3,
        });
      });
    });
  }, []);

  return (
    <section
      id="clients"
      className="relative py-32 px-6 noise-overlay overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-bold mb-16 text-center">Trusted By</h2>

        <div className="relative overflow-hidden">
          <div
            ref={marqueeRef}
            className="flex gap-16"
          >
            {[...clients, ...clients, ...clients].map((client, index) => (
              <div
                key={index}
                className="client-logo glass-heavy px-12 py-8 rounded-2xl flex items-center justify-center whitespace-nowrap cursor-pointer"
                style={{ minWidth: '200px' }}
              >
                <span className="text-2xl font-bold text-white/80">{client}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Clients;
