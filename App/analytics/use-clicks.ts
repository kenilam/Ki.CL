import { useEffect } from 'react';

import { enqueue } from './queue';

const TRACKED = '[data-track], a, button, summary';

/** `data-track` names an element in reports; otherwise its label or text. */
function label(element: HTMLElement) {
  const name =
    element.dataset.track ||
    element.getAttribute('aria-label') ||
    element.textContent?.replace(/\s+/g, ' ').trim();

  return name?.slice(0, 80) || element.tagName.toLowerCase();
}

/** Query strings and fragments are dropped, as they can carry tokens. */
function destination({ href }: HTMLAnchorElement) {
  const url = new URL(href, window.location.href);

  return url.origin === window.location.origin
    ? url.pathname
    : `${url.origin}${url.pathname}`;
}

/** One listener for the whole document, so no component has to opt in. */
function useClicks(enabled: boolean) {
  useEffect(() => {
    if (!enabled) {
      return;
    }

    const onClick = ({ target }: MouseEvent) => {
      const element =
        target instanceof Element ? target.closest<HTMLElement>(TRACKED) : null;

      if (!element) {
        return;
      }

      enqueue({
        type: 'click',
        path: window.location.pathname,
        target: label(element),
        href:
          element instanceof HTMLAnchorElement && element.href
            ? destination(element)
            : undefined,
      });
    };

    document.addEventListener('click', onClick, { capture: true });

    return () => {
      document.removeEventListener('click', onClick, { capture: true });
    };
  }, [enabled]);
}

export { useClicks };
