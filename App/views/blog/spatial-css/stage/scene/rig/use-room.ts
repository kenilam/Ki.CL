import { useEffect, useRef } from 'react';

// Constants
import { CLASS_NAME } from '@/views/blog/spatial-css/constants';

const useRoom = () => {
  const room = useRef({ end: 0, start: 0 });

  useEffect(() => {
    const measure = () => {
      const section = document.querySelector(`.${CLASS_NAME} section`);

      if (!section) {
        return;
      }

      const { left, right } = section.getBoundingClientRect();
      const ltr = getComputedStyle(section).direction === 'ltr';
      const width = window.innerWidth;

      room.current = ltr
        ? { end: right, start: left }
        : { end: width - left, start: width - right };
    };

    measure();
    window.addEventListener('resize', measure);

    return () => {
      window.removeEventListener('resize', measure);
    };
  }, []);

  return room;
};

export { useRoom };
