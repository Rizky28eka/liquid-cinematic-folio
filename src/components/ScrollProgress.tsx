import { useEffect, useRef, useState } from 'react';
import { ChevronUp } from 'lucide-react';

const ScrollProgress = () => {
  const progressRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<SVGCircleElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const rafRef = useRef<number>();
  const targetProgressRef = useRef(0);

  useEffect(() => {
    const circle = circleRef.current;
    if (!circle) return;

    const radius = 20;
    const circumference = 2 * Math.PI * radius;
    circle.style.strokeDasharray = `${circumference}`;
    circle.style.strokeDashoffset = `${circumference}`;

    let ticking = false;

    // Smooth scroll progress animation
    const animateProgress = () => {
      const current = scrollProgress;
      const target = targetProgressRef.current;
      const diff = target - current;
      
      if (Math.abs(diff) > 0.001) {
        const newProgress = current + diff * 0.15;
        setScrollProgress(newProgress);
        
        const offset = circumference - newProgress * circumference;
        circle.style.strokeDashoffset = `${offset}`;
        
        rafRef.current = requestAnimationFrame(animateProgress);
      } else {
        setScrollProgress(target);
        const offset = circumference - target * circumference;
        circle.style.strokeDashoffset = `${offset}`;
      }
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
          const progress = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
          
          targetProgressRef.current = progress;
          setIsVisible(scrollTop > 200);
          
          // Start animation
          if (rafRef.current) cancelAnimationFrame(rafRef.current);
          rafRef.current = requestAnimationFrame(animateProgress);
          
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [scrollProgress]);

  // Handle visibility animation
  useEffect(() => {
    const progress = progressRef.current;
    if (!progress) return;

    if (isVisible) {
      progress.style.opacity = '0';
      progress.style.transform = 'scale(0) rotate(-180deg)';
      progress.style.transition = 'opacity 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
      
      requestAnimationFrame(() => {
        progress.style.opacity = '1';
        progress.style.transform = 'scale(1) rotate(0deg)';
      });
    } else {
      progress.style.opacity = '0';
      progress.style.transform = 'scale(0) rotate(180deg)';
    }
  }, [isVisible]);

  const handleMouseEnter = () => {
    const progress = progressRef.current;
    const icon = iconRef.current;
    if (!progress || !icon) return;

    progress.style.transform = 'scale(1.15) rotate(0deg)';
    progress.style.transition = 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
    
    icon.style.transform = 'translateY(-2px) scale(1.1)';
    icon.style.transition = 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
  };

  const handleMouseLeave = () => {
    const progress = progressRef.current;
    const icon = iconRef.current;
    if (!progress || !icon) return;

    progress.style.transform = 'scale(1) rotate(0deg)';
    progress.style.transition = 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
    
    icon.style.transform = 'translateY(0) scale(1)';
    icon.style.transition = 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
  };

  const handleClick = () => {
    const progress = progressRef.current;
    const icon = iconRef.current;
    
    // Click animation
    if (progress) {
      progress.style.transform = 'scale(0.9) rotate(0deg)';
      setTimeout(() => {
        progress.style.transform = 'scale(1.05) rotate(0deg)';
      }, 100);
      setTimeout(() => {
        progress.style.transform = 'scale(1) rotate(0deg)';
      }, 200);
    }

    // Icon bounce animation
    if (icon) {
      icon.style.transform = 'translateY(-8px) scale(1.2)';
      icon.style.transition = 'transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1)';
      setTimeout(() => {
        icon.style.transform = 'translateY(0) scale(1)';
        icon.style.transition = 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
      }, 150);
    }

    // Smooth scroll to top
    const startPosition = window.pageYOffset;
    const startTime = performance.now();
    const duration = 1200;

    const easeInOutCubic = (t: number): number => {
      return t < 0.5 
        ? 4 * t * t * t 
        : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    const scroll = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = easeInOutCubic(progress);
      
      window.scrollTo(0, startPosition * (1 - easeProgress));
      
      if (progress < 1) {
        requestAnimationFrame(scroll);
      }
    };

    requestAnimationFrame(scroll);
  };

  return (
    <div
      ref={progressRef}
      className="fixed bottom-8 right-8 md:right-24 z-50 cursor-pointer backdrop-blur-xl rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300"
      style={{ 
        width: '56px', 
        height: '56px',
        background: 'var(--background)',
        opacity: 0,
        transform: 'scale(0) rotate(-180deg)',
        willChange: 'transform, opacity'
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      role="button"
      aria-label="Scroll to top"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      {/* Background glow effect */}
      <div 
        className="absolute inset-0 rounded-full opacity-20 blur-xl"
        style={{
          background: `conic-gradient(from ${scrollProgress * 360}deg, var(--foreground), transparent, var(--foreground))`,
          animation: 'pulse 3s ease-in-out infinite'
        }}
      />

      {/* SVG Progress Circle */}
      <svg 
        className="w-full h-full transform -rotate-90 relative z-10"
        style={{ filter: 'drop-shadow(0 0 2px rgba(0,0,0,0.1))' }}
      >
        {/* Background circle */}
        <circle
          cx="28"
          cy="28"
          r="20"
          stroke="var(--foreground)"
          strokeWidth="2.5"
          fill="none"
          opacity="0.1"
        />
        
        {/* Progress circle */}
        <circle
          ref={circleRef}
          cx="28"
          cy="28"
          r="20"
          stroke="var(--foreground)"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          style={{
            filter: 'drop-shadow(0 0 3px var(--foreground))',
            transition: 'stroke-dashoffset 0.1s linear'
          }}
        />
      </svg>

      {/* Icon */}
      <div 
        ref={iconRef}
        className="absolute inset-0 flex items-center justify-center z-20"
        style={{ willChange: 'transform' }}
      >
        <ChevronUp 
          className="w-5 h-5 text-foreground" 
          strokeWidth={2.5}
          style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.1))' }}
        />
      </div>

      {/* Ripple effect on click */}
      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 0.2;
          }
          50% {
            opacity: 0.3;
          }
        }
      `}</style>
    </div>
  );
};

export default ScrollProgress;