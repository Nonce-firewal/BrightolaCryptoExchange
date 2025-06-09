import { useEffect, useRef, useState } from 'react';

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  delay?: number;
}

export const useScrollAnimation = (options: UseScrollAnimationOptions = {}) => {
  const { threshold = 0.1, rootMargin = '0px 0px -50px 0px', triggerOnce = true, delay = 0 } = options;
  const [isVisible, setIsVisible] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggered) {
          setTimeout(() => {
            setIsVisible(true);
            if (triggerOnce) {
              setHasTriggered(true);
            }
          }, delay);
          
          if (triggerOnce && ref.current) {
            observer.unobserve(ref.current);
          }
        } else if (!triggerOnce && !entry.isIntersecting) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold, rootMargin, triggerOnce, delay, hasTriggered]);

  return { ref, isVisible };
};

// Staggered animation hook for lists
export const useStaggeredAnimation = (itemCount: number, staggerDelay: number = 100) => {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const { ref, isVisible } = useScrollAnimation();

  useEffect(() => {
    if (isVisible) {
      const timeouts: NodeJS.Timeout[] = [];
      
      for (let i = 0; i < itemCount; i++) {
        const timeout = setTimeout(() => {
          setVisibleItems(prev => [...prev, i]);
        }, i * staggerDelay);
        timeouts.push(timeout);
      }

      return () => {
        timeouts.forEach(clearTimeout);
      };
    }
  }, [isVisible, itemCount, staggerDelay]);

  return { ref, visibleItems, isVisible };
};