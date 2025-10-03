import { useLayoutEffect, RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollAnimationOptions {
  trigger?: RefObject<HTMLElement> | string;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  markers?: boolean;
  toggleActions?: string;
  animation?: 'fadeIn' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scale' | 'custom';
  customAnimation?: (element: HTMLElement) => gsap.core.Timeline | gsap.core.Tween;
}

export const useGSAPScrollTrigger = (
  ref: RefObject<HTMLElement>,
  options: ScrollAnimationOptions = {}
) => {
  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;

    const {
      start = 'top 80%',
      end = 'bottom 20%',
      scrub = false,
      markers = false,
      toggleActions = 'play none none reverse',
      animation = 'fadeIn',
      customAnimation,
    } = options;

    const ctx = gsap.context(() => {
      let tween: gsap.core.Timeline | gsap.core.Tween;

      if (customAnimation) {
        tween = customAnimation(element);
      } else {
        switch (animation) {
          case 'fadeIn':
            tween = gsap.fromTo(
              element,
              { opacity: 0, y: 50 },
              {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: 'power3.out',
              }
            );
            break;
          case 'slideUp':
            tween = gsap.fromTo(
              element,
              { opacity: 0, y: 100 },
              {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: 'power3.out',
              }
            );
            break;
          case 'slideLeft':
            tween = gsap.fromTo(
              element,
              { opacity: 0, x: 100 },
              {
                opacity: 1,
                x: 0,
                duration: 1,
                ease: 'power3.out',
              }
            );
            break;
          case 'slideRight':
            tween = gsap.fromTo(
              element,
              { opacity: 0, x: -100 },
              {
                opacity: 1,
                x: 0,
                duration: 1,
                ease: 'power3.out',
              }
            );
            break;
          case 'scale':
            tween = gsap.fromTo(
              element,
              { opacity: 0, scale: 0.8 },
              {
                opacity: 1,
                scale: 1,
                duration: 1,
                ease: 'back.out(1.7)',
              }
            );
            break;
          default:
            tween = gsap.fromTo(
              element,
              { opacity: 0 },
              {
                opacity: 1,
                duration: 1,
                ease: 'power3.out',
              }
            );
        }
      }

      ScrollTrigger.create({
        trigger: element,
        start,
        end,
        scrub,
        markers,
        toggleActions,
        animation: tween,
      });
    }, ref);

    return () => ctx.revert();
  }, [ref, options]);
};
