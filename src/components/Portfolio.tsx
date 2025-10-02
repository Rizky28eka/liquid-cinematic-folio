import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { id: 1, title: 'Project Alpha', category: 'Web Design', height: 400 },
  { id: 2, title: 'Project Beta', category: 'Animation', height: 500 },
  { id: 3, title: 'Project Gamma', category: 'Branding', height: 450 },
  { id: 4, title: 'Project Delta', category: 'Interface', height: 380 },
  { id: 5, title: 'Project Epsilon', category: 'Motion', height: 520 },
  { id: 6, title: 'Project Zeta', category: 'Experience', height: 420 },
];

const Portfolio = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const items = gridRef.current?.querySelectorAll('.portfolio-item');
    if (!section || !items) return;

    items.forEach((item) => {
      gsap.fromTo(
        item,
        {
          clipPath: 'inset(100% 0 0 0)',
          opacity: 0,
        },
        {
          clipPath: 'inset(0% 0 0 0)',
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Magnetic image follow cursor
      const handleMouseMove = (e: MouseEvent) => {
        const rect = (item as HTMLElement).getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(item.querySelector('.portfolio-image'), {
          x: x * 0.1,
          y: y * 0.1,
          duration: 0.3,
          ease: 'power2.out',
        });
      };

      const handleMouseLeave = () => {
        gsap.to(item.querySelector('.portfolio-image'), {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: 'elastic.out(1, 0.5)',
        });
      };

      item.addEventListener('mousemove', handleMouseMove as EventListener);
      item.addEventListener('mouseleave', handleMouseLeave);
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      className="relative py-32 px-6 noise-overlay"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-bold mb-16 text-center">Featured Work</h2>
        
        <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="portfolio-item glass rounded-2xl overflow-hidden group cursor-pointer"
              style={{ height: `${project.height}px` }}
            >
              <div className="portfolio-image relative w-full h-full p-8 flex flex-col justify-end">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <svg className="absolute inset-0 w-full h-full opacity-10 group-hover:opacity-20 transition-opacity" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <filter id={`portfolioRipple${project.id}`}>
                      <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="2" />
                      <feDisplacementMap in="SourceGraphic" scale="20" />
                    </filter>
                  </defs>
                  <rect width="100%" height="100%" filter={`url(#portfolioRipple${project.id})`} />
                </svg>
                
                <div className="relative z-10">
                  <p className="text-sm text-white/60 mb-2">{project.category}</p>
                  <h3 className="text-2xl font-semibold">{project.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
