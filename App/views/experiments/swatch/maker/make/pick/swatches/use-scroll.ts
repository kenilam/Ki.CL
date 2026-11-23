import { useEffect, useRef } from 'react';

// API
import { Kicl_SwatchListDocument, useQuery } from 'api/client';

// Routes
import { useParams } from 'design/router';

// Hooks
import { useResponsive } from 'design/hooks';

// Constants
import { PARAM } from '@/views/experiments/swatch/constants';
import { FIELD } from '@/views/experiments/swatch/maker/make/pick/constants';

// Keeps the swatch on the page in view as the color moves. One that has
// scrolled under the stuck color field is brought up from below it.
const useScroll = () => {
  const ref = useRef<HTMLUListElement>(null);
  const { [PARAM]: current } = useParams();
  const { data } = useQuery(Kicl_SwatchListDocument);
  const { prefersReducedMotion } = useResponsive();

  useEffect(() => {
    const list = ref.current;
    const item = list?.querySelector('[aria-current="page"]')?.closest('li');
    const field = list?.parentElement?.querySelector(`.${FIELD}`);

    if (!item || !field) {
      return;
    }

    const under =
      item.getBoundingClientRect().top < field.getBoundingClientRect().bottom;

    item.scrollIntoView({
      behavior: prefersReducedMotion ? 'instant' : 'smooth',
      block: under ? 'end' : 'nearest',
    });
  }, [current, data, prefersReducedMotion]);

  return ref;
};

export { useScroll };
