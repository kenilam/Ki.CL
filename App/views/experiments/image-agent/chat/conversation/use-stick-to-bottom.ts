import { useEffect, useRef, useState } from 'react';

/** How close to the bottom still counts as at the bottom. */
const NEAR_PX = 160;

/** Keys that mean the person is reading back up the page. */
const UP_KEYS = new Set(['ArrowUp', 'PageUp', 'Home']);

const distanceFromBottom = () => {
  const page = document.scrollingElement ?? document.documentElement;
  return page.scrollHeight - (window.scrollY + window.innerHeight);
};

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
 * means the bottom of the page. Scrolling up stops it, and scrolling back down
 * or sending starts it again. Only the person's own input stops it, because our
 * smooth scroll passes through positions above the bottom and would otherwise
 * stop itself halfway.
 */
function useStickToBottom<Node extends HTMLElement>(
  /** Changes when the person sends, which always brings the end into view. */
  sent: unknown
) {
  /* State rather than a ref: the list mounts after loading, and the watcher has to start then. */
  const [node, setNode] = useState<Node | null>(null);
  const pinned = useRef(true);

  useEffect(() => {
    const leave = () => {
      pinned.current = false;
    };
    const onWheel = (event: WheelEvent) => {
      if (event.deltaY < 0) {
        leave();
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (UP_KEYS.has(event.key)) {
        leave();
      }
    };
    const onScroll = () => {
      if (distanceFromBottom() <= NEAR_PX) {
        pinned.current = true;
      }
    };

    window.addEventListener('wheel', onWheel, { passive: true });
    window.addEventListener('touchmove', leave, { passive: true });
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchmove', leave);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

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
  }, [node]);

  useEffect(() => {
    if (sent) {
      pinned.current = true;
      toBottom(node, 'smooth');
    }
  }, [node, sent]);

  return setNode;
}

export { useStickToBottom };
