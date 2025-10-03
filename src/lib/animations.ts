import { Variants } from 'framer-motion';

// Easing functions
export const easings = {
  easeOut: [0.76, 0, 0.24, 1],
  easeInOut: [0.76, 0, 0.24, 1],
  backOut: [0.34, 1.56, 0.64, 1],
  power3Out: [0.215, 0.61, 0.355, 1],
  power4Out: [0.23, 1, 0.32, 1],
} as const;

// Global Framer Motion variants
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: easings.easeOut,
    },
  },
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: easings.easeOut,
    },
  },
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: easings.easeOut,
    },
  },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: easings.easeOut,
    },
  },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: easings.easeOut,
    },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: easings.backOut,
    },
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easings.easeOut,
    },
  },
};

// Micro interactions
export const hoverScale = {
  scale: 1.05,
  transition: { duration: 0.3, ease: easings.easeOut },
};

export const tapScale = {
  scale: 0.95,
  transition: { duration: 0.15, ease: easings.easeOut },
};

export const hoverGlow = {
  boxShadow: '0 0 30px rgba(255, 255, 255, 0.3)',
  transition: { duration: 0.3, ease: easings.easeOut },
};
