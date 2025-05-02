// Libraries
import { useEffect, useRef } from 'react';

const OPTIONS: globalThis.MutationObserverInit = {
  attributeOldValue: true,
  childList: false, // observe direct children
  subtree: false, // and lower descendants too
  characterDataOldValue: true, // pass old data to callback
};

function useMutationObserver<Node extends HTMLElement>(
  callback: globalThis.MutationCallback,
  options: globalThis.MutationObserverInit = OPTIONS
) {
  const node = useRef<Node>(null);

  useEffect(() => {
    let observer: globalThis.MutationObserver;

    if (node.current) {
      observer = new MutationObserver(callback);

      observer.observe(node.current, options);
    }

    return () => {
      observer?.disconnect();
    };
  });

  return { node };
}

export { OPTIONS };
export default useMutationObserver;
