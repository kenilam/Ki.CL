import React, { PropsWithChildren, useContext } from 'react';

// Constants
import {
  EXPERIMENTS,
  type Experiment,
} from '@/views/experiments/home/constants';

type Value = {
  experiment: Experiment;
  number: number;
};

const Context = React.createContext<Value>({
  experiment: EXPERIMENTS[0],
  number: 0,
});

const ScreenProvider: React.FunctionComponent<PropsWithChildren<Value>> = ({
  children,
  ...value
}) => <Context.Provider value={value}>{children}</Context.Provider>;

const useScreenContext = () => useContext(Context);

export { ScreenProvider, useScreenContext };
