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
      {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
        scale: 1.3,
        rotate: -5,
      },
      {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        scale: 1,
        rotate: 0,
        duration: 1.5,
        ease: 'power4.inOut',
      }
    );

    const textLines = text.querySelectorAll('p, h2');
    textLines.forEach((line, index) => {
      const chars = line.textContent?.split('') || [];
      line.innerHTML = chars
        .map((char) =>
          char === ' '
            ? '<span class="inline-block" style="width: 0.3em"></span>'
            : `<span class="inline-block" style="display: inline-block">${char}</span>`
        )
        .join('');

      const charElements = line.querySelectorAll('span');
      tl.fromTo(
        charElements,
        { opacity: 0, y: 20, rotateX: -90 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          stagger: 0.01,
          duration: 0.6,
          ease: 'power2.out',
        },
        index === 0 ? '-=1.2' : '-=0.5'
      );
    });

    // Parallax on scroll
    ScrollTrigger.create({
      trigger: section,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1,
      onUpdate: (self) => {
        gsap.to(image, {
          y: -self.progress * 50,
        });
      },
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-32 px-6 noise-overlay"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div ref={imageRef} className="relative h-[600px] glass rounded-3xl overflow-hidden transform-gpu">
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
