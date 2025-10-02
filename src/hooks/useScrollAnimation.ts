import { useLayoutEffect } from 'react';
import { gsap } from 'gsap';

interface AnimationOptions {
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
}

export const useScrollAnimation = (
  ref: React.RefObject<HTMLElement>,
  options: AnimationOptions = {}
) => {
  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Merge provided options with defaults
    const fromVars = { opacity: 0, y: 50, ...options.from };
    const toVars = {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power3.out',
      stagger: 0.2,
      ...options.to,
    };

    const ctx = gsap.context(() => {
      gsap.fromTo(element.children, fromVars, {
        ...toVars,
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
      });
    }, ref);

    return () => ctx.revert();
  }, [ref, options]);
};
