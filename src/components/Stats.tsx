import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 150, suffix: '+', label: 'Projects Completed' },
  { value: 98, suffix: '%', label: 'Client Satisfaction' },
  { value: 50, suffix: '+', label: 'Awards Won' },
  { value: 5, suffix: 'Y', label: 'Years Experience' },
];

const Stats = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const statElements = statsRef.current?.querySelectorAll('.stat-item');
    if (!section || !statElements) return;

    statElements.forEach((stat) => {
      const counter = stat.querySelector('.stat-counter') as HTMLElement;
      const targetValue = parseInt(counter.dataset.value || '0');

      const obj = { value: 0 };
      gsap.to(obj, {
        value: targetValue,
        duration: 2,
        ease: 'power2.out',
        onUpdate: function () {
          counter.textContent = Math.floor(obj.value).toString();
        },
        scrollTrigger: {
          trigger: stat,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });

      gsap.fromTo(
        stat,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'back.out(1.5)',
          scrollTrigger: {
            trigger: stat,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    // Grain animation
    const grainEl = section.querySelector('.grain-anim');
    if (grainEl) {
      gsap.to(grainEl, {
        backgroundPosition: '100% 100%',
        duration: 3,
        ease: 'none',
        repeat: -1,
        yoyo: true,
      });
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      id="stats"
      className="relative py-32 px-6 noise-overlay"
    >
      <div className="absolute inset-0 grain-anim opacity-5" style={{
        backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'3\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' /%3E%3C/svg%3E")',
        backgroundSize: '200px 200px',
      }} />

      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className="text-5xl font-bold mb-16 text-center">By The Numbers</h2>

        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="stat-item glass-heavy p-8 rounded-2xl text-center"
            >
              <div className="text-5xl font-bold mb-3">
                <span className="stat-counter" data-value={stat.value}>0</span>
                <span>{stat.suffix}</span>
              </div>
              <p className="text-white/60">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
