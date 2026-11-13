import { useEffect, useRef, useState } from 'react';

import { useResponsive } from 'design/hooks';

const useEntered = () => {
  const { prefersReducedMotion } = useResponsive();
  const [entered, setEntered] = useState(false);
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const element = ref.current;

    if (entered || !element) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return;
        }

        setEntered(true);
      },
      { rootMargin: '0px 0px -35% 0px' }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [entered]);

  return { entered: entered || prefersReducedMotion, ref };
};

export { useEntered };
