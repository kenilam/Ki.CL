import { useLayoutEffect, useState, type RefObject } from 'react';

type Size = { height: number; left: number; top: number; width: number };

const useSize = (canvas: RefObject<HTMLCanvasElement | null>) => {
  const [size, setSize] = useState<Size | null>(null);

  useLayoutEffect(() => {
    const parent = canvas.current?.parentElement;

    if (!parent) {
      return undefined;
    }

    const measure = () => {
      const { left, top } = parent.getBoundingClientRect();

      setSize({
        height: parent.clientHeight,
        left,
        top,
        width: parent.clientWidth,
      });
    };

    const observer = new ResizeObserver(measure);

    observer.observe(parent);
    measure();

    return () => observer.disconnect();
  }, [canvas]);

  return size;
};

export { useSize };
