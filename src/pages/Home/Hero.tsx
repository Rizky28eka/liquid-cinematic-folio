import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useScramble } from '../../hooks/useScramble';

const ScrambledText = ({ text, duration }: { text: string; duration?: number }) => {
  const scrambled = useScramble(text, duration);
  return <span>{scrambled}</span>;
};

const containerVariants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  initial: { opacity: 0, y: 30 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
    },
  },
};

const lineVariants = {
    initial: { scaleX: 0 },
    animate: {
        scaleX: 1,
        transition: {
            duration: 0.8,
            ease: 'easeOut',
            delay: 0.4
        }
    }
}

const Hero = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '-50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-screen flex items-center justify-start overflow-hidden bg-background text-foreground"
    >
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(var(--foreground) 1px, transparent 1px),
              linear-gradient(90deg, var(--foreground) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px',
          }}
        />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/80 to-background" />

      {/* Content */}
      <motion.div
        style={{ y, opacity, scale }}
        className="relative z-10 px-6 sm:px-12 md:px-20 lg:px-32 py-20 max-w-7xl w-full"
      >
        <motion.div
          variants={containerVariants}
          initial="initial"
          animate="animate"
        >
          <motion.div variants={itemVariants} className="mb-6">
            <p className="text-xs sm:text-sm md:text-base text-muted-foreground uppercase tracking-[0.4em] font-light">
              <ScrambledText text="RIZKY EKA HARYADI" duration={1.5} />
            </p>
          </motion.div>

          {/* Decorative line */}
          <motion.div
            variants={lineVariants}
            className="h-px w-24 bg-foreground mb-8 origin-left"
          />

          <motion.div variants={itemVariants}>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold leading-[0.95] tracking-tighter text-foreground">
              <span className="block mb-3 hover:text-muted-foreground transition-colors duration-300">
                <ScrambledText text="MOBILE & WEB" />
              </span>
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-foreground to-muted-foreground">
                <ScrambledText text="DEVELOPER" />
              </span>
            </h1>
          </motion.div>

          {/* Additional info */}
          <motion.div
            variants={itemVariants}
            className="mt-12 flex items-center gap-8 text-sm text-muted-foreground"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-foreground rounded-full animate-pulse" />
              <span className="uppercase tracking-wider">Available for work</span>
            </div>
            <div className="h-4 w-px bg-border" />
            <span className="uppercase tracking-wider">Based in Yogyakarta</span>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;
