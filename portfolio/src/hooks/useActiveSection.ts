import { useState, useEffect } from 'react';

export function useActiveSection(sections: string[]) {
  const [active, setActive] = useState<string>(sections[0] ?? '');

  useEffect(() => {
    const observers = sections.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { threshold: 0.3, rootMargin: '-80px 0px -40% 0px' }
      );
      observer.observe(el);
      return observer;
    });

    return () => {
      observers.forEach((obs) => obs?.disconnect());
    };
  }, [sections]);

  return active;
}
