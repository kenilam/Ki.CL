import { useEffect, useRef, useState } from 'react';

import { Three } from '@/three';

// Context
import { useAnimateContext } from '@/views/experiments/tree-of-life/animate-context';

// Constants
import { SPRING } from '@/views/experiments/tree-of-life/explorer/scene/taxon/constants';

// Spec
import type * as Spec from '@/views/experiments/tree-of-life/explorer/scene/taxon/spec';

type Props = Pick<Spec.Growth, 'play' | 'withinFocus'>;

/**
 * Runs the spring `play` asks for, and says which way it has finished. `state`
 * is undefined until it has settled either way, so it reads as "not arrived
 * yet", not "retracted".
 */
const useGrowth = ({ play, withinFocus = false }: Props) => {
  const { animate } = useAnimateContext();

  // A taxon that never arrived has nothing to leave.
  const entered = useRef(false);

  const [state, setState] = useState<Spec.Growth['play']>(undefined);

  const [{ grown }, spring] = Three.useSpring(() => ({
    grown: 0,
    config: SPRING,
  }));

  /*
   * Started from an effect, once per change of direction. As declared props
   * the spring re-applied on every render and kept resetting to 0.
   */
  useEffect(() => {
    if (!play) {
      return;
    }

    spring.start({
      grown: play === 'enter' ? 1 : 0,
      // Only below the routed taxon; everything else snaps into place.
      immediate: !(animate && withinFocus),
      onRest: (result: { value: { grown: number } }) => {
        if (result.value.grown > 0.99) {
          entered.current = true;
          setState('enter');

          return;
        }

        if (entered.current) {
          entered.current = false;
          setState('exit');
        }
      },
    });
  }, [play, animate, withinFocus, spring]);

  return { grown, state };
};

export { useGrowth };
