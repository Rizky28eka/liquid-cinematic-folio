import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    gsap.fromTo(
      nav,
      { y: -100, skewY: 3, opacity: 0 },
      { y: 0, skewY: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 2 }
    );

    ScrollTrigger.create({
      start: 'top -80',
      end: 'max',
      onUpdate: (self) => {
        const progress = self.progress;
        gsap.to(nav, {
          height: progress > 0 ? '50px' : '80px',
          backgroundColor: progress > 0 ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.3)',
          duration: 0.3,
        });
      },
    });

    const links = nav.querySelectorAll('a');
    links.forEach((link) => {
      const underline = link.querySelector('.underline-anim') as HTMLElement;
      if (!underline) return;

      link.addEventListener('mouseenter', () => {
        gsap.to(underline, {
          scaleX: 1,
          transformOrigin: 'left',
          duration: 0.4,
          ease: 'power2.out',
        });
      });

      link.addEventListener('mouseleave', () => {
        gsap.to(underline, {
          scaleX: 0,
          transformOrigin: 'right',
          duration: 0.4,
          ease: 'power2.out',
        });
      });
    });
  }, []);

  const menuItems = ['Home', 'About', 'Services', 'Portfolio', 'Contact'];

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-40 glass transition-all duration-300"
      style={{ height: '80px' }}
    >
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        <div className="text-2xl font-bold tracking-tight">r2e</div>
        
        <ul className="flex gap-8">
          {menuItems.map((item) => (
            <li key={item}>
              <a
                href={`#${item.toLowerCase()}`}
                className="relative text-sm font-medium text-white/80 hover:text-white transition-colors"
              >
                {item}
                <span className="underline-anim absolute bottom-0 left-0 w-full h-0.5 bg-white scale-x-0" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
