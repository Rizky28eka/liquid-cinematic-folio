import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    period: '2023 - Present',
    position: 'Lead Motion Designer',
    company: 'Premium Studio',
    description: 'Creating cinematic web experiences with GSAP and advanced animations.',
  },
  {
    period: '2021 - 2023',
    position: 'Senior Frontend Developer',
    company: 'Digital Agency',
    description: 'Building high-performance React applications with modern UI/UX.',
  },
  {
    period: '2019 - 2021',
    position: 'UI/UX Designer',
    company: 'Creative Lab',
    description: 'Designing premium interfaces with focus on user experience.',
  },
];

const Experience = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<SVGSVGElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const timeline = timelineRef.current;
    const cards = cardsRef.current?.querySelectorAll('.experience-card');
    if (!section || !timeline || !cards) return;

    // Animate SVG path
    const path = timeline.querySelector('path');
    if (path) {
      const pathLength = path.getTotalLength();
      gsap.set(path, { strokeDasharray: pathLength, strokeDashoffset: pathLength });

      gsap.to(path, {
        strokeDashoffset: 0,
        duration: 2,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: section,
          start: 'top 60%',
          end: 'bottom 80%',
          scrub: 1,
        },
      });
    }

    // Stagger cards from left-right alternately
    cards.forEach((card, index) => {
      gsap.fromTo(
        card,
        {
          opacity: 0,
          x: index % 2 === 0 ? -100 : 100,
        },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative py-32 px-6 noise-overlay"
    >
      <div className="max-w-5xl mx-auto">
        <h2 className="text-5xl font-bold mb-16 text-center">Experience</h2>

        <div className="relative">
          <svg
            ref={timelineRef}
            className="absolute left-1/2 top-0 h-full w-1 -translate-x-1/2"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M 0.5 0 L 0.5 100%"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="2"
              fill="none"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          <div ref={cardsRef} className="space-y-16">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className={`experience-card flex items-center ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}
              >
                <div className="w-1/2 pr-12">
                  {index % 2 === 0 && (
                    <div className="glass-heavy p-8 rounded-2xl ripple">
                      <p className="text-sm text-white/60 mb-2">{exp.period}</p>
                      <h3 className="text-2xl font-semibold mb-2">{exp.position}</h3>
                      <p className="text-lg text-white/80 mb-4">{exp.company}</p>
                      <p className="text-white/60 leading-relaxed">{exp.description}</p>
                    </div>
                  )}
                </div>

                <div className="w-12 h-12 glass rounded-full border-2 border-white/30 flex items-center justify-center z-10">
                  <div className="w-3 h-3 bg-white rounded-full" />
                </div>

                <div className="w-1/2 pl-12">
                  {index % 2 !== 0 && (
                    <div className="glass-heavy p-8 rounded-2xl ripple">
                      <p className="text-sm text-white/60 mb-2">{exp.period}</p>
                      <h3 className="text-2xl font-semibold mb-2">{exp.position}</h3>
                      <p className="text-lg text-white/80 mb-4">{exp.company}</p>
                      <p className="text-white/60 leading-relaxed">{exp.description}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
