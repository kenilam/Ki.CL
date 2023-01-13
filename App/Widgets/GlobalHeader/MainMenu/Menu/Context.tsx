import React, { PropsWithChildren, useContext, useRef } from 'react';

// Hooks
import { useMenu, DEFAULT_MENU } from './Hooks';

const DEFAULT: typeof DEFAULT_MENU = {
  ...DEFAULT_MENU,
};

const Context = React.createContext(DEFAULT);

const MenuProvider: React.FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const node = useRef();

  const Menu = useMenu();

  const value = {
    ...Menu,
    node,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

const useMenuContext = () => {
  const Contexts = useContext(Context);

  return Contexts;
};

export { useMenuContext, DEFAULT };
export default MenuProvider;
