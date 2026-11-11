import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react';

// Spec
import type * as Spec from '@/views/experiments/tree-of-life/spec';

const AnimateContext = createContext<Pick<
  Spec.Context,
  'animate' | 'setAnimate'
> | null>(null);

const Provider: React.FunctionComponent<PropsWithChildren> = ({ children }) => {
  /*
   * On by default. Growth leaving the focused taxon and travelling outward is
   * the thing this view is about, and it was turned off back when the control
   * did nothing visible - the tree arrived on its own schedule whatever the
   * setting said. Now that it plays out a level at a time, arriving to it is
   * the point rather than something to wait through, and the control is there
   * to land the tree at once when that is what you want.
   */
  const [animate, setAnimate] = useState(true);

  const value = useMemo(() => {
    return { animate, setAnimate };
  }, [animate]);

  return (
    <AnimateContext.Provider value={value}>{children}</AnimateContext.Provider>
  );
};

const useAnimateContext = () => {
  const animate = useContext(AnimateContext);

  if (!animate) {
    throw new Error(
      'useAnimateContext needs the tree of life route around it.'
    );
  }

  return animate;
};

export { Provider, useAnimateContext };
