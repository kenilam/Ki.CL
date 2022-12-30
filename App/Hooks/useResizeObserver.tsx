import { useEffect, useRef, useState } from 'react';

function useResizeObserver<Node extends HTMLElement>() {
  const node = useRef<Node>(null);

  const [rect, setRect] = useState<DOMRect | undefined>(
    node.current?.getBoundingClientRect()
  );

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const newRect = entry.target.getBoundingClientRect();

        const equal = Object.keys(newRect.toJSON()).every(
          (key) => newRect[key] === rect?.[key]
        );

        if (equal) {
          return;
        }

        setRect(newRect);
      }
    });

    if (node.current) {
      resizeObserver.observe(node.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  });

  return { node, rect };
}

export default useResizeObserver;
