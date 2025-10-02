import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, Clock } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const posts = [
  {
    title: 'Mastering GSAP Animations',
    excerpt: 'Learn advanced techniques for creating cinematic web animations',
    date: 'Jan 15, 2025',
    readTime: '5 min',
  },
  {
    title: 'Liquid Glass Design Trends',
    excerpt: 'Exploring the future of premium web aesthetics',
    date: 'Jan 10, 2025',
    readTime: '4 min',
  },
  {
    title: 'Performance Optimization',
    excerpt: 'Best practices for smooth animations and fast load times',
    date: 'Jan 5, 2025',
    readTime: '6 min',
  },
];

const Blog = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current?.querySelectorAll('.blog-card');
    if (!section || !cards) return;

    gsap.fromTo(
      cards,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.15,
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

  return (
    <section
      ref={sectionRef}
      id="blog"
      className="relative py-32 px-6 noise-overlay"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-bold mb-16 text-center">Latest Articles</h2>

        <div ref={cardsRef} className="grid md:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <div
              key={index}
              className="blog-card glass-heavy p-8 rounded-2xl ripple hover:border-white/30 transition-all cursor-pointer group"
            >
              <div className="h-48 glass rounded-xl mb-6 flex items-center justify-center overflow-hidden">
                <div className="text-6xl font-bold text-white/10 group-hover:scale-110 transition-transform duration-500">
                  R2E
                </div>
              </div>

              <h3 className="text-2xl font-semibold mb-3 group-hover:text-white/90 transition-colors">
                {post.title}
              </h3>

              <p className="text-white/60 leading-relaxed mb-6">
                {post.excerpt}
              </p>

              <div className="flex items-center gap-4 text-sm text-white/50">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{post.readTime}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
