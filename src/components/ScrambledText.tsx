import { useScramble } from '@/hooks/useScramble';

interface ScrambledTextProps {
  text: string;
  duration?: number;
  className?: string;
}

export const ScrambledText = ({ text, duration, className }: ScrambledTextProps) => {
  const scrambledText = useScrambleText(text, duration);

  return <span className={className}>{scrambledText}</span>;
};
