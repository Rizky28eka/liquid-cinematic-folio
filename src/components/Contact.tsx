import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const form = formRef.current;
    if (!section || !form) return;

    gsap.fromTo(
      form,
      {
        opacity: 0,
        y: 100,
        rotateX: -30,
        scale: 0.95,
      },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        scale: 1,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    const inputs = form.querySelectorAll('input, textarea');
    const labels = form.querySelectorAll('label');

    inputs.forEach((input, index) => {
      gsap.fromTo(
        input,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          delay: 0.8 + index * 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    labels.forEach((label, index) => {
      gsap.fromTo(
        label,
        { opacity: 0, y: -10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          delay: 0.9 + index * 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    inputs.forEach((input) => {
      const handleFocus = () => {
        gsap.to(input, {
          borderColor: 'rgba(255, 255, 255, 0.6)',
          boxShadow: '0 0 30px rgba(255, 255, 255, 0.15)',
          scale: 1.02,
          duration: 0.4,
          ease: 'power2.out',
        });

        gsap.to(input.previousElementSibling, {
          color: 'rgba(255, 255, 255, 1)',
          scale: 1.05,
          duration: 0.3,
        });
      };

      const handleBlur = () => {
        gsap.to(input, {
          borderColor: 'rgba(255, 255, 255, 0.1)',
          boxShadow: '0 0 0 rgba(255, 255, 255, 0)',
          scale: 1,
          duration: 0.4,
          ease: 'power2.out',
        });

        gsap.to(input.previousElementSibling, {
          color: 'rgba(255, 255, 255, 0.7)',
          scale: 1,
          duration: 0.3,
        });
      };

      const handleInput = () => {
        gsap.to(input, {
          keyframes: [
            { scale: 1.01, duration: 0.1 },
            { scale: 1.02, duration: 0.1 },
          ],
        });
      };

      input.addEventListener('focus', handleFocus);
      input.addEventListener('blur', handleBlur);
      input.addEventListener('input', handleInput);
    });

    const button = form.querySelector('button');
    if (button) {
      const handleMouseEnter = () => {
        gsap.to(button, {
          scale: 1.05,
          boxShadow: '0 10px 40px rgba(255, 255, 255, 0.2)',
          duration: 0.3,
          ease: 'power2.out',
        });
      };

      const handleMouseLeave = () => {
        gsap.to(button, {
          scale: 1,
          boxShadow: '0 0 0 rgba(255, 255, 255, 0)',
          duration: 0.3,
          ease: 'power2.out',
        });
      };

      button.addEventListener('mouseenter', handleMouseEnter);
      button.addEventListener('mouseleave', handleMouseLeave);
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-32 px-6 noise-overlay"
    >
      <div className="max-w-3xl mx-auto">
        <h2 className="text-5xl font-bold mb-16 text-center">Get In Touch</h2>
        
        <form
          ref={formRef}
          className="glass-heavy p-10 rounded-3xl space-y-6 transform-gpu"
          style={{ perspective: '1000px' }}
        >
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-white/70">Name</label>
              <Input
                className="glass border-white/10 focus:border-white/50 transition-all"
                placeholder="Your name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2 text-white/70">Email</label>
              <Input
                type="email"
                className="glass border-white/10 focus:border-white/50 transition-all"
                placeholder="your@email.com"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2 text-white/70">Subject</label>
            <Input
              className="glass border-white/10 focus:border-white/50 transition-all"
              placeholder="Project inquiry"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2 text-white/70">Message</label>
            <Textarea
              className="glass border-white/10 focus:border-white/50 transition-all min-h-[150px]"
              placeholder="Tell us about your project..."
            />
          </div>
          
          <Button
            type="submit"
            size="lg"
            className="w-full glass-heavy ripple hover:scale-[1.02] transition-transform"
          >
            Send Message
          </Button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
