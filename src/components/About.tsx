import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const text = textRef.current;
    if (!section || !image || !text) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 60%',
        end: 'bottom 80%',
        toggleActions: 'play none none reverse',
      },
    });

    tl.fromTo(
      image,
      { clipPath: 'circle(0% at 50% 50%)' },
      { clipPath: 'circle(100% at 50% 50%)', duration: 1.2, ease: 'power3.inOut' }
    );

    const textLines = text.querySelectorAll('p, h2');
    tl.fromTo(
      textLines,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, stagger: 0.2, duration: 0.8, ease: 'power2.out' },
      '-=0.6'
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-32 px-6 noise-overlay"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div ref={imageRef} className="relative h-[600px] glass rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center text-6xl font-bold text-white/20">
              R2E
            </div>
            
            <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <filter id="aboutRipple">
                  <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="2">
                    <animate
                      attributeName="baseFrequency"
                      from="0.02"
                      to="0.04"
                      dur="6s"
                      repeatCount="indefinite"
                    />
                  </feTurbulence>
                  <feDisplacementMap in="SourceGraphic" scale="15" />
                </filter>
              </defs>
              <rect width="100%" height="100%" filter="url(#aboutRipple)" />
            </svg>
          </div>

          <div ref={textRef} className="space-y-6">
            <h2 className="text-5xl font-bold mb-8">
              Liquid Glass<br />Premium Design
            </h2>
            
            <p className="text-lg text-white/70 leading-relaxed">
              We specialize in creating premium digital experiences that blend cutting-edge technology
              with artistic vision. Our approach combines cinematic animations, glass morphism aesthetics,
              and seamless interactions.
            </p>
            
            <p className="text-lg text-white/70 leading-relaxed">
              Every project is crafted with meticulous attention to detail, ensuring smooth transitions,
              professional-grade animations, and a cohesive monochrome palette that exudes sophistication.
            </p>
            
            <p className="text-lg text-white/70 leading-relaxed">
              From concept to execution, we deliver experiences that are not just functional,
              but truly memorable.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
