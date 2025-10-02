import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GraduationCap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const education = [
  {
    period: '2018 - 2022',
    degree: 'Bachelor of Computer Science',
    institution: 'Premium University',
    description: 'Specialized in Interactive Media and Web Technologies',
  },
  {
    period: '2022 - 2023',
    degree: 'Advanced Motion Design',
    institution: 'Creative Academy',
    description: 'Professional certification in GSAP and cinematic animations',
  },
];

const Education = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current?.querySelectorAll('.education-card');
    if (!section || !cards) return;

    gsap.fromTo(
      cards,
      { opacity: 0, y: 80 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 60%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      id="education"
      className="relative py-32 px-6 noise-overlay"
    >
      <div className="max-w-5xl mx-auto">
        <h2 className="text-5xl font-bold mb-16 text-center">Education</h2>

        <div ref={cardsRef} className="grid md:grid-cols-2 gap-8">
          {education.map((edu, index) => (
            <div
              key={index}
              className="education-card glass-heavy p-8 rounded-2xl ripple hover:border-white/30 transition-all"
            >
              <div className="mb-6">
                <GraduationCap className="w-12 h-12 text-white/80" />
              </div>

              <p className="text-sm text-white/60 mb-3">{edu.period}</p>
              <h3 className="text-2xl font-semibold mb-2">{edu.degree}</h3>
              <p className="text-lg text-white/80 mb-4">{edu.institution}</p>
              <p className="text-white/60 leading-relaxed">{edu.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
