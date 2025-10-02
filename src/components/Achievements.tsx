import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, Trophy, Target, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const achievements = [
  { icon: Award, title: 'Best Design Award', year: '2024' },
  { icon: Trophy, title: 'Innovation Prize', year: '2023' },
  { icon: Target, title: 'Excellence in UX', year: '2023' },
  { icon: Zap, title: 'Performance Leader', year: '2022' },
];

const Achievements = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const badges = badgesRef.current?.querySelectorAll('.achievement-badge');
    if (!section || !badges) return;

    gsap.fromTo(
      badges,
      { opacity: 0, scale: 0, rotation: -180 },
      {
        opacity: 1,
        scale: 1,
        rotation: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'back.out(2)',
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
      id="achievements"
      className="relative py-32 px-6 noise-overlay"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-bold mb-16 text-center">Achievements</h2>

        <div ref={badgesRef} className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className="achievement-badge glass-heavy p-8 rounded-2xl text-center ripple hover:scale-105 transition-transform"
            >
              <div className="w-16 h-16 mx-auto mb-4 glass rounded-full flex items-center justify-center">
                <achievement.icon className="w-8 h-8 text-white/80" />
              </div>

              <h3 className="text-lg font-semibold mb-2">{achievement.title}</h3>
              <p className="text-white/60">{achievement.year}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
