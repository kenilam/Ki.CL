import { useEffect, useRef } from 'react';

const usePointer = () => {
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const move = ({ clientX, clientY }: PointerEvent) => {
      pointer.current = {
        x: (clientX / window.innerWidth) * 2 - 1,
        y: (clientY / window.innerHeight) * 2 - 1,
      };
    };

    window.addEventListener('pointermove', move, { passive: true });

    return () => {
      window.removeEventListener('pointermove', move);
    };
  }, []);

  return pointer;
};

export { usePointer };
