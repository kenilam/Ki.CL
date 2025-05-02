import { useEffect, useRef, useState } from 'react';

const DEFAULT_RECT_VALUES = {
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  x: 0,
  y: 0,
  width: 0,
  height: 0,
};

const DEFAULT_RECT: DOMRect = {
  ...DEFAULT_RECT_VALUES,
  toJSON() {
    return DEFAULT_RECT_VALUES;
  },
};

function useScrollEvent<Node extends HTMLElement>() {
  const node = useRef<Node>(null);

  const [scrollX, setScrollX] = useState<(typeof window)['scrollX']>();
  const [scrollY, setScrollY] = useState<(typeof window)['scrollY']>();

  useEffect(() => {
    const scrollListener: globalThis.EventListener = () => {
      if (scrollX !== window.scrollX) {
        setScrollX(window.scrollX);
      }

      if (scrollY !== window.scrollY) {
        setScrollY(window.scrollY);
      }
    };

    window.addEventListener('scroll', scrollListener);

    return () => {
      window.removeEventListener('scroll', scrollListener);
    };
  });

  const { top, left, right, bottom, x, y, width, height } =
    node.current?.getBoundingClientRect() || DEFAULT_RECT;

  const actualOffset = {
    x: 1 - (right - window.innerWidth) / height,
    y: 1 - (bottom - window.innerHeight) / height,
  };

  const roundedOffset = {
    x: Math.round(actualOffset.x * 100) / 100,
    y: Math.round(actualOffset.y * 100) / 100,
  };

  const intersectionRatio = {
    x: Math.min(1, Math.max(0, roundedOffset.x)),
    y: Math.min(1, Math.max(0, roundedOffset.y)),
  };

  return {
    bottom,
    height,
    left,
    node,
    scrollX,
    scrollY,
    right,
    top,
    width,
    x,
    y,
    intersectionRatio,
  };
}

export default useScrollEvent;
