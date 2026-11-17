import { useEffect, useState } from 'react';

const HEADER = '--kicl--widgets--global-header--block-size';

const SNAP = {
  true: 'kicl-scroll-snap-align-header',
  false: 'kicl-scroll-snap-align-center',
};

/**
 * Where a row stops: centred, or with its top under the header when it is
 * too tall to centre without its beginning going behind the header. CSS can't
 * compare an element's height with the window's, so this measures.
 */
const useSnap = (row: React.RefObject<HTMLElement | null>) => {
  const [tall, setTall] = useState(false);

  useEffect(() => {
    const element = row.current;

    if (!element) {
      return;
    }

    const measure = () => {
      const header = parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue(HEADER)
      );

      setTall(element.offsetHeight > window.innerHeight - header * 2);
    };

    const observer = new ResizeObserver(measure);

    observer.observe(element);
    window.addEventListener('resize', measure);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [row]);

  return SNAP[String(tall)];
};

export { useSnap };
