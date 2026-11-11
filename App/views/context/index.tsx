import React, { createContext, useContext } from 'react';

// Hooks
import { usePasswordChange } from './use-password-change';

const PasswordChangeContext = createContext<ReturnType<
  typeof usePasswordChange
> | null>(null);

/** At the root, so the wait for the emailed link carries on after the page is left. */
const PasswordChangeProvider: React.FunctionComponent<
  React.PropsWithChildren
> = ({ children }) => {
  const passwordChange = usePasswordChange();

  return (
    <PasswordChangeContext.Provider value={passwordChange}>
      {children}
    </PasswordChangeContext.Provider>
  );
};

function usePasswordChangeContext() {
  const passwordChange = useContext(PasswordChangeContext);

  if (!passwordChange) {
    throw new Error(
      'usePasswordChangeContext needs a PasswordChangeProvider above it'
    );
  }

  return passwordChange;
}

export { PasswordChangeProvider, usePasswordChangeContext };
