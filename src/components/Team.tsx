import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, Linkedin, Twitter } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const team = [
  {
    name: 'Alex Rivera',
    role: 'Lead Designer',
    socials: [
      { icon: Github, url: '#' },
      { icon: Linkedin, url: '#' },
      { icon: Twitter, url: '#' },
    ],
  },
  {
    name: 'Jordan Smith',
    role: 'Senior Developer',
    socials: [
      { icon: Github, url: '#' },
      { icon: Linkedin, url: '#' },
    ],
  },
  {
    name: 'Casey Park',
    role: 'Motion Designer',
    socials: [
      { icon: Twitter, url: '#' },
      { icon: Linkedin, url: '#' },
    ],
  },
];

const Team = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current?.querySelectorAll('.team-card');
    if (!section || !cards) return;

    gsap.fromTo(
      cards,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 60%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // Grayscale to color hover
    cards.forEach((card) => {
      const image = card.querySelector('.team-image') as HTMLElement;

      card.addEventListener('mouseenter', () => {
        gsap.to(image, {
          filter: 'grayscale(0)',
          duration: 0.5,
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(image, {
          filter: 'grayscale(1)',
          duration: 0.5,
        });
      });
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="team"
      className="relative py-32 px-6 noise-overlay"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-bold mb-16 text-center">Meet The Team</h2>

        <div ref={cardsRef} className="grid md:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <div
              key={index}
              className="team-card glass-heavy p-8 rounded-2xl text-center ripple hover:border-white/30 transition-all"
            >
              <div className="team-image w-32 h-32 mx-auto mb-6 glass rounded-full flex items-center justify-center text-4xl font-bold text-white/20 overflow-hidden"
                   style={{ filter: 'grayscale(1)' }}>
                {member.name.split(' ').map(n => n[0]).join('')}
              </div>

              <h3 className="text-2xl font-semibold mb-2">{member.name}</h3>
              <p className="text-white/60 mb-6">{member.role}</p>

              <div className="flex justify-center gap-3">
                {member.socials.map((social, i) => (
                  <a
                    key={i}
                    href={social.url}
                    className="w-10 h-10 glass rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
                    aria-label={`${member.name} social link`}
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
