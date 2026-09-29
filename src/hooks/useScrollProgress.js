import { useEffect, useState } from 'react';

/** Fraction (0 to 1) of the page the visitor has scrolled through. */
export function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const scrollable = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (scrollable === 0) return;
      setProgress(totalScroll / scrollable);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return progress;
}
