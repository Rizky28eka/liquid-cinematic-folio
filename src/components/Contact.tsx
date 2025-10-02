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
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 60%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // Input focus ripple effect
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach((input) => {
      const handleFocus = () => {
        gsap.to(input, {
          borderColor: 'rgba(255, 255, 255, 0.5)',
          boxShadow: '0 0 20px rgba(255, 255, 255, 0.1)',
          duration: 0.3,
        });
      };

      const handleBlur = () => {
        gsap.to(input, {
          borderColor: 'rgba(255, 255, 255, 0.1)',
          boxShadow: '0 0 0 rgba(255, 255, 255, 0)',
          duration: 0.3,
        });
      };

      input.addEventListener('focus', handleFocus);
      input.addEventListener('blur', handleBlur);
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-32 px-6 noise-overlay"
    >
      <div className="max-w-3xl mx-auto">
        <h2 className="text-5xl font-bold mb-16 text-center">Get In Touch</h2>
        
        <form ref={formRef} className="glass-heavy p-10 rounded-3xl space-y-6">
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
