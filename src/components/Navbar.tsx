import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const nav = navRef.current;
    const logo = logoRef.current;
    if (!nav || !logo) return;

    gsap.fromTo(
      nav,
      { y: -100, skewY: 3, opacity: 0 },
      { y: 0, skewY: 0, opacity: 1, duration: 1.2, ease: 'power4.out', delay: 2 }
    );

    ScrollTrigger.create({
      start: 'top -80',
      end: 'max',
      onUpdate: (self) => {
        const progress = self.progress;
        gsap.to(nav, {
          height: progress > 0 ? '60px' : '80px',
          backgroundColor: progress > 0 ? 'rgba(0, 0, 0, 0.9)' : 'rgba(0, 0, 0, 0.4)',
          backdropFilter: progress > 0 ? 'blur(20px)' : 'blur(10px)',
          duration: 0.4,
          ease: 'power2.out',
        });
        gsap.to(logo, {
          scale: progress > 0 ? 0.9 : 1,
          duration: 0.4,
        });
      },
    });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = logo.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const distance = Math.sqrt(x * x + y * y);

      if (distance < 100) {
        gsap.to(logo, {
          x: x * 0.3,
          y: y * 0.3,
          scale: 1.1,
          duration: 0.3,
          ease: 'power2.out',
        });
      }
    };

    const handleMouseLeave = () => {
      gsap.to(logo, {
        x: 0,
        y: 0,
        scale: scrolled ? 0.9 : 1,
        duration: 0.6,
        ease: 'elastic.out(1, 0.5)',
      });
    };

    logo.addEventListener('mousemove', handleMouseMove);
    logo.addEventListener('mouseleave', handleMouseLeave);

    const links = nav.querySelectorAll('a');
    links.forEach((link) => {
      const underline = link.querySelector('.underline-anim') as HTMLElement;
      const text = link.querySelector('.link-text') as HTMLElement;
      if (!underline || !text) return;

      link.addEventListener('mouseenter', () => {
        gsap.to(underline, {
          scaleX: 1,
          transformOrigin: 'left',
          duration: 0.5,
          ease: 'power3.out',
        });
        gsap.to(text, {
          y: -2,
          duration: 0.3,
          ease: 'power2.out',
        });
      });

      link.addEventListener('mouseleave', () => {
        gsap.to(underline, {
          scaleX: 0,
          transformOrigin: 'right',
          duration: 0.5,
          ease: 'power3.out',
        });
        gsap.to(text, {
          y: 0,
          duration: 0.3,
          ease: 'power2.out',
        });
      });
    });

    return () => {
      logo.removeEventListener('mousemove', handleMouseMove);
      logo.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [scrolled]);

  const menuItems = ['Home', 'About', 'Services', 'Skills', 'Portfolio', 'Experience', 'Contact'];

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-40 glass transition-all duration-300"
      style={{ height: '80px' }}
    >
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        <div
          ref={logoRef}
          className="text-2xl font-bold tracking-tight cursor-pointer transform-gpu"
        >
          r2e
        </div>
        
        <ul className="flex gap-8">
          {menuItems.map((item) => (
            <li key={item}>
              <a
                href={`#${item.toLowerCase()}`}
                className="relative text-sm font-medium text-white/80 hover:text-white transition-colors"
              >
                <span className="link-text inline-block">{item}</span>
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
