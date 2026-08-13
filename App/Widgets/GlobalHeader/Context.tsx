import React, { PropsWithChildren, useContext, useState } from 'react';

// Hooks
import { useResizeObserver } from '@/Hooks';

// Spec
import * as Spec from './Spec';

const DEFAULT: Spec.Context &
  Spec.Props &
  ReturnType<typeof useResizeObserver> = {
  node: { current: null },
  rect: undefined,
  show: true,
  showHeader(show) {
    return show;
  },
};

const Context = React.createContext(DEFAULT);

const GlobalHeaderProvider: React.FunctionComponent<
  PropsWithChildren<Spec.Props>
> = ({ children, show: _show = true }) => {
  const { node, rect } = useResizeObserver();

  const [show, showHeader] = useState(_show);

  const value = {
    node,
    rect,
    show,
    showHeader,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

const useGlobalHeaderContext = () => {
  const Contexts = useContext(Context);

  return Contexts;
};

export { useGlobalHeaderContext };
export default GlobalHeaderProvider;
