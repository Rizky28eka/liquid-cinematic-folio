import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Lightbulb, Pencil, Code, Rocket } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    icon: Lightbulb,
    title: 'Discovery',
    description: 'Understanding your vision and project requirements',
  },
  {
    icon: Pencil,
    title: 'Design',
    description: 'Creating premium interfaces with liquid glass aesthetics',
  },
  {
    icon: Code,
    title: 'Development',
    description: 'Building with GSAP animations and modern technologies',
  },
  {
    icon: Rocket,
    title: 'Launch',
    description: 'Deploying optimized, production-ready experiences',
  },
];

const Process = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const stepCards = stepsRef.current?.querySelectorAll('.process-step');
    if (!section || !stepCards) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 60%',
        toggleActions: 'play none none reverse',
      },
    });

    stepCards.forEach((card, index) => {
      tl.fromTo(
        card,
        { opacity: 0, x: -100 },
        { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' },
        index * 0.2
      );
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="process"
      className="relative py-32 px-6 noise-overlay"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-bold mb-16 text-center">Our Process</h2>

        <div ref={stepsRef} className="grid md:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="process-step glass-heavy p-8 rounded-2xl text-center ripple hover:border-white/30 transition-all relative"
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 glass rounded-full flex items-center justify-center border-2 border-white/30">
                <span className="text-sm font-bold">{index + 1}</span>
              </div>

              <div className="w-16 h-16 mx-auto mb-6 mt-4 glass rounded-full flex items-center justify-center">
                <step.icon className="w-8 h-8 text-white/80" />
              </div>

              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-white/60 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
