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
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl font-bold mb-20 text-center text-foreground">Experience</h2>

        <div className="relative">
          <svg
            ref={timelineRef}
            className="hidden md:block absolute left-1/2 top-0 h-full w-1 -translate-x-1/2"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M 0.5 0 L 0.5 100%"
              className="stroke-foreground/20"
              strokeWidth="2"
              fill="none"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          <div ref={cardsRef} className="space-y-12 md:space-y-16">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className="experience-card flex flex-col md:flex-row items-center gap-8 md:gap-0"
              >
                <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12 md:order-3'}`}>
                  <div className="glass-heavy p-8 rounded-2xl ripple border border-foreground/10 hover:border-foreground/20 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10">
                    <p className="text-sm text-foreground/60 mb-2 font-medium">{exp.period}</p>
                    <h3 className="text-2xl font-semibold mb-2 text-foreground">{exp.position}</h3>
                    <p className="text-lg text-primary mb-4 font-medium">{exp.company}</p>
                    <p className="text-foreground/70 leading-relaxed">{exp.description}</p>
                  </div>
                </div>

                <div className="hidden md:flex w-12 h-12 glass rounded-full border-2 border-foreground/30 items-center justify-center z-10 order-2 flex-shrink-0 shadow-lg shadow-primary/20">
                  <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
                </div>

                <div className="hidden md:block w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
