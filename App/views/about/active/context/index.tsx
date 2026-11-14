import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useRef,
} from 'react';

import { OPENING, type Moment } from '@/views/about/constants';

type Active = {
  mark: (moment: Moment) => void;
  read: () => Moment;
};

const ActiveContext = createContext<Active | null>(null);

const Provider: React.FunctionComponent<PropsWithChildren> = ({ children }) => {
  const moment = useRef<Moment>(OPENING);

  const active = useMemo(() => {
    return {
      mark: (next: Moment) => {
        moment.current = next;
      },
      read: () => {
        return moment.current;
      },
    };
  }, []);

  return (
    <ActiveContext.Provider value={active}>{children}</ActiveContext.Provider>
  );
};

const useActive = () => {
  const active = useContext(ActiveContext);

  if (!active) {
    throw new Error('useActive needs an About provider around it.');
  }

  return active;
};

export { Provider, useActive };
