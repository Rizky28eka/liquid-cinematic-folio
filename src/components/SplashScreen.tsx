import { useEffect } from 'react';
import { motion } from 'framer-motion';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const text = 'rizky28eka';

  const containerVariants = {
    initial: { opacity: 1 },
    exit: {
      opacity: 0,
      transition: {
        duration: 1,
        ease: [0.76, 0, 0.24, 1] as const,
        delay: 1.8
      },
    },
  };

  const logoVariants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
    exit: {
        transition: {
            staggerChildren: 0.05,
            staggerDirection: -1
        }
    }
  };

  const charVariants = {
    initial: {
      opacity: 0,
      y: 50,
      skewX: -30,
      scale: 1.5,
    },
    animate: {
      opacity: 1,
      y: 0,
      skewX: 0,
      scale: 1,
      transition: {
        duration: 1,
        ease: [0.76, 0, 0.24, 1] as const,
      },
    },
    exit: {
        opacity: 0,
        y: -50,
        transition: {
            duration: 0.5,
            ease: [0.76, 0, 0.24, 1] as const
        }
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => onComplete(), 3300); // Total animation time + delay
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 bg-background z-50 flex items-center justify-center"
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <motion.div
        className="relative z-10 text-foreground text-6xl md:text-8xl font-bold tracking-tighter"
        variants={logoVariants}
      >
        {text.split('').map((char, index) => (
          <motion.span
            key={index}
            className="char inline-block"
            variants={charVariants}
          >
            {char}
          </motion.span>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default SplashScreen;