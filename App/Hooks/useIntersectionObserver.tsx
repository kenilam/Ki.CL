// Libraries
import { useEffect, useRef, useState } from 'react';

const OPTIONS: globalThis.IntersectionObserverInit = {
  rootMargin: '0px',
  threshold: 1.0,
};

function useIntersectionObserver<Node extends HTMLElement>(
  options: globalThis.IntersectionObserverInit = OPTIONS
) {
  const node = useRef<Node>(null);

  const [intersectionRatio, setIntersectionRatio] =
    useState<IntersectionObserverEntry['intersectionRatio']>(0);

  useEffect(() => {
    let observer: globalThis.IntersectionObserver;

    if (node.current) {
      const callback: globalThis.IntersectionObserverCallback = (entries) => {
        entries.forEach((entry) => {
          setIntersectionRatio(entry.intersectionRatio);
        });
      };

      observer = new IntersectionObserver(callback, options);

      observer.observe(node.current);
    }

    return () => {
      observer?.disconnect();
    };
  });

  return { node, intersectionRatio };
}

export default useIntersectionObserver;
