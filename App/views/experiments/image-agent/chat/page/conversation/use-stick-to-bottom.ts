import { useEffect, useState } from 'react';

// Hooks
import { usePinned } from './use-pinned';

/**
 * Only a conversation taller than the window needs following. A shorter one
 * already shows in full, and the page is at least a window tall anyway, so
 * scrolling it would only push the start of the conversation out of view.
 */
const toBottom = (node: HTMLElement | null, behavior: ScrollBehavior) => {
  if (!node || node.getBoundingClientRect().height <= window.innerHeight) {
    return;
  }

  const page = document.scrollingElement ?? document.documentElement;
  window.scrollTo({ behavior, top: page.scrollHeight });
};

/**
 * Keeps the window at the end of the conversation while the person is there. It
 * follows any growth (a new message, a picture loading, text animating in,
 * choices appearing) because it watches the list's size, not the data. The page
 * scrolls, not the list, and the composer is pinned to the bottom, so the end
 * means the bottom of the page. Sending always brings the end back into view.
 */
function useStickToBottom<Node extends HTMLElement>(
  /** Changes when the person sends, which always brings the end into view. */
  sent: unknown
) {
  /* State rather than a ref: the list mounts after loading, and the watcher has to start then. */
  const [node, setNode] = useState<Node | null>(null);
  const { pin, pinned } = usePinned();

  useEffect(() => {
    if (!node) {
      return undefined;
    }

    const observer = new ResizeObserver(() => {
      if (pinned.current) {
        toBottom(node, 'smooth');
      }
    });
    observer.observe(node);

    return () => observer.disconnect();
  }, [node, pinned]);

  useEffect(() => {
    if (sent) {
      pin();
      toBottom(node, 'smooth');
    }
  }, [node, pin, sent]);

  return setNode;
}

export { useStickToBottom };
