import { useEffect } from 'react';

// Utilities
import { isArrow, toNearestToward } from './toward';

// Constants
import { PLACES, toSlug, type Place } from './constants';

/** Where the arrow keys already mean something: a field, the list of places, a dialog. */
const TAKEN = 'input, textarea, select, [contenteditable], [popover], dialog';

/** With the list of places open, focus can still be on its button. */
const OPEN = ':popover-open, dialog[open]';

/**
 * The arrow keys turn the globe to the next place that way. The canvas is
 * hidden from assistive tech and cannot take focus, so the keys are heard on
 * the page, and left alone wherever they already do something.
 */
export function useArrows(onArrow: (place: Place) => void) {
  useEffect(() => {
    const listen = (event: KeyboardEvent) => {
      const held =
        event.altKey || event.ctrlKey || event.metaKey || event.shiftKey;
      const taken =
        document.querySelector(OPEN) ||
        (event.target instanceof Element && event.target.closest(TAKEN));

      if (held || taken || event.defaultPrevented || !isArrow(event.key)) {
        return;
      }

      /*
       * The place open is read from the address, which changes as soon as a
       * key is pressed. The page can be a moment behind, and a second press
       * would start from the place before.
       */
      const from = PLACES.find((place) =>
        window.location.pathname.endsWith(`/${toSlug(place)}`)
      );
      const place = from && toNearestToward(from, event.key);

      if (place) {
        /* Or the page scrolls as the globe turns. */
        event.preventDefault();
        onArrow(place);
      }
    };

    window.addEventListener('keydown', listen);

    return () => window.removeEventListener('keydown', listen);
  }, [onArrow]);
}
