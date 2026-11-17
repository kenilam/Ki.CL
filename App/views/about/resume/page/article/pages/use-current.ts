import { useEffect, useState } from 'react';

/**
 * The section the middle of the window is in. Sections are of any height, so
 * this watches a line across the window rather than the scroll position.
 */
const useCurrent = (anchors: readonly string[]) => {
  const [current, setCurrent] = useState<string>();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCurrent(entry.target.id);
          }
        });
      },
      { rootMargin: '-50% 0px -50% 0px' }
    );

    anchors.forEach((anchor) => {
      const section = document.getElementById(anchor);

      if (section) {
        observer.observe(section);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [anchors]);

  return current;
};

export { useCurrent };
