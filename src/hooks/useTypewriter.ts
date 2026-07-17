import { useEffect, useState } from 'react';

interface UseTypewriterOptions {
  words: string[];
  typingSpeed?: number; // ms per character while typing
  deletingSpeed?: number; // ms per character while deleting
  pauseDuration?: number; // ms to hold the full string before deleting
}

export function useTypewriter({
  words,
  typingSpeed = 45,
  deletingSpeed = 25,
  pauseDuration = 1500,
}: UseTypewriterOptions) {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState('');
  const [phase, setPhase] = useState<'typing' | 'deleting'>('typing');

  useEffect(() => {
    if (words.length === 0) return;
    const currentWord = words[wordIndex % words.length];

    if (phase === 'typing') {
      if (text.length < currentWord.length) {
        const timeout = setTimeout(() => {
          setText(currentWord.slice(0, text.length + 1));
        }, typingSpeed);
        return () => clearTimeout(timeout);
      }
      const timeout = setTimeout(() => setPhase('deleting'), pauseDuration);
      return () => clearTimeout(timeout);
    }

    if (phase === 'deleting') {
      if (text.length > 0) {
        const timeout = setTimeout(() => {
          setText(currentWord.slice(0, text.length - 1));
        }, deletingSpeed);
        return () => clearTimeout(timeout);
      }
      setWordIndex((i) => (i + 1) % words.length);
      setPhase('typing');
    }
  }, [text, phase, wordIndex, words, typingSpeed, deletingSpeed, pauseDuration]);

  return text;
}
