import { useEffect } from 'react';

// Constants
import { CLASS_NAME as HOME } from '@/views/experiments/kinetic-light/home/constants';

const WORDS = ':is(header > *, form, details):not(dialog *)';

const useCloseOnCover = (sheet: HTMLElement | null) => {
  useEffect(() => {
    const home = sheet?.closest(`.${HOME}`);

    if (!(sheet instanceof HTMLDialogElement) || !home) {
      return undefined;
    }

    let observer: IntersectionObserver | null = null;

    const close = () => {
      if (sheet.open) {
        sheet.close();
        return;
      }

      sheet.hidePopover();
    };

    const watch = (closeIfCovering: boolean) => {
      observer?.disconnect();

      const { clientHeight, clientWidth } = document.documentElement;
      const { offsetHeight, offsetLeft, offsetTop, offsetWidth } = sheet;
      let first = true;

      observer = new IntersectionObserver(
        (entries) => {
          const covering = entries.some(({ isIntersecting }) => {
            return isIntersecting;
          });
          const skipped = first && !closeIfCovering;

          first = false;

          if (covering && !skipped) {
            close();
          }
        },
        {
          rootMargin: [
            -offsetTop,
            offsetLeft + offsetWidth - clientWidth,
            offsetTop + offsetHeight - clientHeight,
            -offsetLeft,
          ]
            .map((margin) => `${margin}px`)
            .join(' '),
        }
      );

      home.querySelectorAll(WORDS).forEach((element) => {
        observer?.observe(element);
      });
    };

    const toggle = (event: Event) => {
      if ((event as ToggleEvent).newState === 'closed') {
        observer?.disconnect();
        observer = null;
        return;
      }

      if (!observer) {
        watch(false);
      }
    };

    const resize = () => {
      if (observer) {
        watch(true);
      }
    };

    if (sheet.matches(':popover-open, [open]')) {
      watch(true);
    }

    sheet.addEventListener('toggle', toggle);
    window.addEventListener('resize', resize);

    return () => {
      observer?.disconnect();
      sheet.removeEventListener('toggle', toggle);
      window.removeEventListener('resize', resize);
    };
  }, [sheet]);
};

export { useCloseOnCover };
