import React, { PropsWithChildren, createContext, useContext } from 'react';

// Constants
import { EXPERIMENTS, type Experiment } from '@/views/routes';
import { SCREENS } from '@/views/experiments/home/stage/screens';

type Value = {
  experiment: Experiment;
  /** Position in the stage, from the top. Sets the scroll ranges. */
  index: number;
  number: number;
};

type Props = PropsWithChildren<
  Pick<(typeof SCREENS)[number]['experiment'], 'plate'>
>;

const ScreenContext = createContext<Value>({
  experiment: EXPERIMENTS[0],
  index: 0,
  number: 0,
});

const Provider: React.FunctionComponent<Props> = ({ children, plate }) => {
  const index = SCREENS.findIndex((screen) => {
    return screen.experiment.plate === plate;
  });

  if (index < 0) {
    return null;
  }

  const { experiment, number } = SCREENS[index];

  return (
    <ScreenContext.Provider value={{ experiment, index, number }}>
      {children}
    </ScreenContext.Provider>
  );
};

const useScreenContext = () => {
  return useContext(ScreenContext);
};

export { Provider, useScreenContext };
