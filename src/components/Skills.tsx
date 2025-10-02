import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { name: 'GSAP Animation', level: 95 },
  { name: 'React/TypeScript', level: 92 },
  { name: 'UI/UX Design', level: 88 },
  { name: 'WebGL/Three.js', level: 85 },
  { name: 'Motion Design', level: 90 },
  { name: 'Performance Optimization', level: 87 },
];

const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const skillElements = skillsRef.current?.querySelectorAll('.skill-item');
    if (!section || !skillElements) return;

    skillElements.forEach((skill, index) => {
      const progressBar = skill.querySelector('.progress-bar') as HTMLElement;
      const progressGlow = skill.querySelector('.progress-glow') as HTMLElement;
      const percentage = progressBar.dataset.percentage || '0';

      gsap.fromTo(
        skill,
        {
          opacity: 0,
          x: -100,
          rotateY: -30,
        },
        {
          opacity: 1,
          x: 0,
          rotateY: 0,
          duration: 0.8,
          delay: index * 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: skill,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        progressBar,
        { width: '0%', scaleX: 0.95 },
        {
          width: `${percentage}%`,
          scaleX: 1,
          duration: 2,
          ease: 'elastic.out(1, 0.5)',
          scrollTrigger: {
            trigger: skill,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        progressGlow,
        { x: '-100%' },
        {
          x: '100%',
          duration: 1.5,
          repeat: -1,
          ease: 'none',
        }
      );

      const counter = skill.querySelector('.skill-counter') as HTMLElement;
      gsap.fromTo(
        counter,
        { textContent: '0' },
        {
          textContent: percentage,
          duration: 2,
          ease: 'power2.out',
          snap: { textContent: 1 },
          scrollTrigger: {
            trigger: skill,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      const handleMouseEnter = () => {
        gsap.to(progressBar, {
          scaleY: 1.3,
          duration: 0.4,
          ease: 'power2.out',
        });
        gsap.to(skill, {
          scale: 1.02,
          duration: 0.4,
          ease: 'power2.out',
        });
      };

      const handleMouseLeave = () => {
        gsap.to(progressBar, {
          scaleY: 1,
          duration: 0.4,
          ease: 'power2.out',
        });
        gsap.to(skill, {
          scale: 1,
          duration: 0.4,
          ease: 'power2.out',
        });
      };

      skill.addEventListener('mouseenter', handleMouseEnter);
      skill.addEventListener('mouseleave', handleMouseLeave);
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative py-32 px-6 noise-overlay"
    >
      <div className="max-w-5xl mx-auto">
        <h2 className="text-5xl font-bold mb-16 text-center">Technical Skills</h2>

        <div ref={skillsRef} className="space-y-8">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="skill-item glass p-6 rounded-2xl transform-gpu cursor-pointer"
              style={{ perspective: '1000px' }}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-medium">{skill.name}</h3>
                <span className="text-2xl font-bold">
                  <span className="skill-counter">0</span>%
                </span>
              </div>

              <div className="relative h-3 bg-white/5 rounded-full overflow-hidden">
                <div
                  className="progress-bar absolute inset-y-0 left-0 bg-gradient-to-r from-white to-white/60 rounded-full transform-gpu"
                  data-percentage={skill.level}
                  style={{ width: '0%' }}
                >
                  <div className="progress-glow absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
                  <div className="absolute inset-0 bg-white/10 animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
