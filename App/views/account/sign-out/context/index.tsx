import React, { createContext, useContext } from 'react';

// Hooks
import { useConfirm } from './use-confirm';

const SignOutContext = createContext<ReturnType<typeof useConfirm> | null>(
  null
);

const Provider: React.FunctionComponent<React.PropsWithChildren> = ({
  children,
}) => {
  const value = useConfirm();

  return (
    <SignOutContext.Provider value={value}>{children}</SignOutContext.Provider>
  );
};

const useSignOutContext = () => {
  const value = useContext(SignOutContext);

  if (!value) {
    throw new Error('useSignOutContext needs a SignOutProvider above it');
  }

  return value;
};

export { Provider, useSignOutContext };
