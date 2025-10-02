import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

gsap.registerPlugin(ScrollTrigger);

const Newsletter = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const form = formRef.current;
    if (!section || !form) return;

    gsap.fromTo(
      form,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    const input = form.querySelector('input');
    const button = form.querySelector('button');

    if (input) {
      input.addEventListener('focus', () => {
        gsap.to(input, {
          boxShadow: '0 0 30px rgba(255, 255, 255, 0.15)',
          duration: 0.3,
        });
      });

      input.addEventListener('blur', () => {
        gsap.to(input, {
          boxShadow: '0 0 0 rgba(255, 255, 255, 0)',
          duration: 0.3,
        });
      });
    }

    if (button) {
      button.addEventListener('mouseenter', () => {
        gsap.to(button, {
          scale: 1.05,
          duration: 0.3,
          ease: 'back.out(1.5)',
        });
      });

      button.addEventListener('mouseleave', () => {
        gsap.to(button, {
          scale: 1,
          duration: 0.3,
        });
      });
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      id="newsletter"
      className="relative py-32 px-6 noise-overlay"
    >
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-5xl font-bold mb-6">Stay Updated</h2>
        <p className="text-xl text-white/70 mb-12">
          Subscribe to our newsletter for the latest insights on premium design and animation
        </p>

        <div ref={formRef} className="glass-heavy p-8 rounded-3xl">
          <div className="flex gap-4 flex-col sm:flex-row">
            <Input
              type="email"
              placeholder="your@email.com"
              className="glass border-white/10 focus:border-white/30 flex-1"
            />
            <Button
              size="lg"
              className="glass-heavy ripple whitespace-nowrap"
            >
              Subscribe Now
            </Button>
          </div>

          <p className="text-sm text-white/50 mt-6">
            No spam, unsubscribe anytime. We respect your privacy.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
