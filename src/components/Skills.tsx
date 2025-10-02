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

    skillElements.forEach((skill) => {
      const progressBar = skill.querySelector('.progress-bar') as HTMLElement;
      const percentage = progressBar.dataset.percentage || '0';

      gsap.fromTo(
        progressBar,
        { width: '0%' },
        {
          width: `${percentage}%`,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: skill,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Counter animation
      const counter = skill.querySelector('.skill-counter') as HTMLElement;
      gsap.fromTo(
        counter,
        { textContent: '0' },
        {
          textContent: percentage,
          duration: 1.5,
          ease: 'power3.out',
          snap: { textContent: 1 },
          scrollTrigger: {
            trigger: skill,
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
      id="skills"
      className="relative py-32 px-6 noise-overlay"
    >
      <div className="max-w-5xl mx-auto">
        <h2 className="text-5xl font-bold mb-16 text-center">Technical Skills</h2>

        <div ref={skillsRef} className="space-y-8">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="skill-item glass p-6 rounded-2xl"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-medium">{skill.name}</h3>
                <span className="text-2xl font-bold">
                  <span className="skill-counter">0</span>%
                </span>
              </div>

              <div className="relative h-3 bg-white/5 rounded-full overflow-hidden">
                <div
                  className="progress-bar absolute inset-y-0 left-0 bg-gradient-to-r from-white/80 to-white/40 rounded-full"
                  data-percentage={skill.level}
                  style={{ width: '0%' }}
                >
                  <div className="absolute inset-0 bg-white/20 animate-pulse" />
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
