import { useState, useEffect } from 'react';
import { useMotionValue, animate } from 'framer-motion';

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*';

export const useScramble = (text: string, duration: number = 1) => {
  const [displayText, setDisplayText] = useState(text);
  const progress = useMotionValue(0);

  useEffect(() => {
    const animation = animate(progress, text.length, {
      duration,
      ease: 'linear',
      onUpdate: (latest) => {
        setDisplayText(
          text
            .split('')
            .map((char, index) => {
              if (index < latest) {
                return text[index];
              }
              return char === ' ' ? ' ' : chars[Math.floor(Math.random() * chars.length)];
            })
            .join('')
        );
      },
      onComplete: () => {
        setDisplayText(text);
      },
    });

    return () => animation.stop();
  }, [text, duration]);

  return displayText;
};
