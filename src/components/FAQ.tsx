import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question: 'What is your design process?',
    answer: 'We follow a four-step process: Discovery, Design, Development, and Launch. Each phase includes client collaboration and iterative refinement.',
  },
  {
    question: 'How long does a typical project take?',
    answer: 'Project timelines vary based on scope, but most premium websites take 4-8 weeks from initial consultation to launch.',
  },
  {
    question: 'Do you offer ongoing support?',
    answer: 'Yes, we provide maintenance packages and ongoing support to ensure your website stays optimized and up-to-date.',
  },
  {
    question: 'Can you work with existing brands?',
    answer: 'Absolutely! We excel at integrating premium design elements while respecting and enhancing your existing brand identity.',
  },
];

const FAQ = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const items = itemsRef.current?.querySelectorAll('.faq-item');
    if (!section || !items) return;

    gsap.fromTo(
      items,
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 60%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, []);

  const toggleFAQ = (index: number) => {
    const answer = document.querySelector(`#faq-answer-${index}`) as HTMLElement;
    const arrow = document.querySelector(`#faq-arrow-${index}`) as HTMLElement;

    if (openIndex === index) {
      gsap.to(answer, {
        height: 0,
        opacity: 0,
        duration: 0.4,
        ease: 'power2.inOut',
      });
      gsap.to(arrow, {
        rotation: 0,
        duration: 0.3,
      });
      setOpenIndex(null);
    } else {
      if (openIndex !== null) {
        const prevAnswer = document.querySelector(`#faq-answer-${openIndex}`) as HTMLElement;
        const prevArrow = document.querySelector(`#faq-arrow-${openIndex}`) as HTMLElement;
        gsap.to(prevAnswer, {
          height: 0,
          opacity: 0,
          duration: 0.4,
          ease: 'power2.inOut',
        });
        gsap.to(prevArrow, {
          rotation: 0,
          duration: 0.3,
        });
      }

      gsap.set(answer, { height: 'auto', opacity: 1 });
      const height = answer.scrollHeight;
      gsap.fromTo(
        answer,
        { height: 0, opacity: 0 },
        {
          height,
          opacity: 1,
          duration: 0.4,
          ease: 'power2.inOut',
        }
      );
      gsap.to(arrow, {
        rotation: 180,
        duration: 0.3,
      });
      setOpenIndex(index);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="relative py-32 px-6 noise-overlay"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-5xl font-bold mb-16 text-center">Frequently Asked Questions</h2>

        <div ref={itemsRef} className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="faq-item glass-heavy rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full p-6 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
              >
                <h3 className="text-xl font-semibold pr-4">{faq.question}</h3>
                <ChevronDown
                  id={`faq-arrow-${index}`}
                  className="w-6 h-6 flex-shrink-0"
                />
              </button>

              <div
                id={`faq-answer-${index}`}
                className="overflow-hidden"
                style={{ height: 0, opacity: 0 }}
              >
                <p className="px-6 pb-6 text-white/70 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
