import React, { type PropsWithChildren, useContext } from 'react';

// Hooks
import { useResizeObserver } from '@/Hooks';
import {
  useGlobalHeader,
  DEFAULT_GLOBAL_HEADER,
  GLOBAL_HEADER_PARAMS,
} from './Hooks';

// Type
import * as Spec from './spec';

type Props = Omit<Spec.Props, 'in'>;

const DEFAULT: Props &
  typeof DEFAULT_GLOBAL_HEADER &
  ReturnType<typeof useResizeObserver<HTMLMenuElement>> = {
  ...DEFAULT_GLOBAL_HEADER,
  minimal: false,
  node: { current: null },
  rect: undefined,
};

const Context = React.createContext(DEFAULT);

const GlobalHeaderProvider: React.FunctionComponent<
  PropsWithChildren<Props>
> = ({ children, minimal }) => {
  const GlobalHeader = useGlobalHeader();

  const { node, rect } = useResizeObserver<HTMLMenuElement>();

  const value = {
    ...GlobalHeader,
    minimal,
    node,
    rect,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

const useGlobalHeaderContext = () => {
  const Contexts = useContext(Context);

  return Contexts;
};

export { useGlobalHeaderContext, GLOBAL_HEADER_PARAMS };
export default GlobalHeaderProvider;
