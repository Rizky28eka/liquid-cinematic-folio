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

    items.forEach((item, index) => {
      gsap.fromTo(
        item,
        {
          rotateX: -60,
          rotateY: -20,
          scale: 0.8,
          opacity: 0,
          z: -200,
        },
        {
          rotateX: 0,
          rotateY: 0,
          scale: 1,
          opacity: 1,
          z: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // 3D tilt and magnetic effect
      const handleMouseMove = (e: MouseEvent) => {
        const rect = (item as HTMLElement).getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -15;
        const rotateY = ((x - centerX) / centerX) * 15;
        const translateX = ((x - centerX) / centerX) * 10;
        const translateY = ((y - centerY) / centerY) * 10;

        gsap.to(item, {
          rotateX,
          rotateY,
          x: translateX,
          y: translateY,
          duration: 0.4,
          ease: 'power2.out',
        });

        gsap.to(item.querySelector('.portfolio-image'), {
          scale: 1.05,
          duration: 0.4,
          ease: 'power2.out',
        });
      };

      const handleMouseLeave = () => {
        gsap.to(item, {
          rotateX: 0,
          rotateY: 0,
          x: 0,
          y: 0,
          duration: 0.6,
          ease: 'elastic.out(1, 0.5)',
        });

        gsap.to(item.querySelector('.portfolio-image'), {
          scale: 1,
          duration: 0.6,
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
              className="portfolio-item glass rounded-2xl overflow-hidden group cursor-pointer transform-gpu"
              style={{
                height: `${project.height}px`,
                perspective: '1000px',
                transformStyle: 'preserve-3d',
              }}
            >
              <div className="portfolio-image relative w-full h-full p-8 flex flex-col justify-end transform-gpu">
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
