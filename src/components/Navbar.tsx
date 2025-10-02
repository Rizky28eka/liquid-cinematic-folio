import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);

      const sections = menuItems.map(item => item.toLowerCase());
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (currentSection) {
        setActiveSection(currentSection);
      }
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
        const isDark = document.documentElement.classList.contains('dark');
        gsap.to(nav, {
          height: progress > 0 ? '70px' : '80px',
          backgroundColor: progress > 0
            ? (isDark ? 'rgba(0, 0, 0, 0.85)' : 'rgba(255, 255, 255, 0.85)')
            : (isDark ? 'rgba(0, 0, 0, 0.4)' : 'rgba(255, 255, 255, 0.4)'),
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
          className="text-2xl font-bold tracking-tight cursor-pointer transform-gpu text-foreground"
        >
          r2e
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-background/20 dark:bg-white/5 backdrop-blur-md rounded-full px-2 py-2 border border-foreground/10">
            {menuItems.map((item) => {
              const isActive = activeSection === item.toLowerCase();
              return (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 transform-gpu ${
                    isActive
                      ? 'bg-foreground text-background shadow-lg scale-105'
                      : 'text-foreground/70 hover:text-foreground hover:scale-105'
                  }`}
                >
                  <span className="link-text inline-block">{item}</span>
                </a>
              );
            })}
          </div>

          <button
            onClick={toggleTheme}
            className="glass p-2 rounded-full hover:scale-110 transition-transform duration-300 border border-foreground/10"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5 text-foreground" />
            ) : (
              <Moon className="w-5 h-5 text-foreground" />
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
