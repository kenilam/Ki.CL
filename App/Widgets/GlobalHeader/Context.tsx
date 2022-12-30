import React, { PropsWithChildren, useContext } from 'react';

// Hooks
import { useResizeObserver } from '@/Hooks';
import { useMainMenu, DEFAULT_MAIN_MENU, MAIN_MENU_PARAMS } from './Hooks';

type Props = {
  node: React.MutableRefObject<HTMLElement | null>;
  rect?: DOMRect;
};

const DEFAULT: typeof DEFAULT_MAIN_MENU & Props = {
  ...DEFAULT_MAIN_MENU,
  node: { current: null },
};

const Context = React.createContext(DEFAULT);

const GlobalHeaderProvider: React.FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const MainMenu = useMainMenu();

  const { node, rect } = useResizeObserver();

  const value = {
    ...MainMenu,
    node,
    rect,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

const useGlobalHeaderContext = () => {
  const Contexts = useContext(Context);

  return Contexts;
};

export { useGlobalHeaderContext, MAIN_MENU_PARAMS };
export default GlobalHeaderProvider;
