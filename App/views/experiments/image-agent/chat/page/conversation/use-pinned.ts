import { useCallback, useEffect, useRef } from 'react';

/** How close to the bottom still counts as at the bottom. */
const NEAR_PX = 160;

/** Keys that mean the person is reading back up the page. */
const UP_KEYS = new Set(['ArrowUp', 'PageUp', 'Home']);

const distanceFromBottom = () => {
  const page = document.scrollingElement ?? document.documentElement;
  return page.scrollHeight - (window.scrollY + window.innerHeight);
};

/**
 * Whether the person is at the end of the page. Scrolling up stops it, and
 * scrolling back down starts it again. Only the person's own input stops it,
 * because our smooth scroll passes through positions above the bottom and
 * would otherwise stop itself halfway.
 */
function usePinned() {
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

  const pin = useCallback(() => {
    pinned.current = true;
  }, []);

  return { pin, pinned };
}

export { usePinned };
