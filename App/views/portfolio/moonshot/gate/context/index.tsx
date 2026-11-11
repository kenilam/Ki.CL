import React, { createContext, useContext } from 'react';

// Components
import { Spinner } from 'design/components';

// Hooks
import { useAccess } from './use-access';

type Access = Omit<ReturnType<typeof useAccess>, 'loading'>;

const AccessContext = createContext<Access | null>(null);

const Provider: React.FunctionComponent<React.PropsWithChildren> = ({
  children,
}) => {
  const { allowed, loading, signedIn } = useAccess();

  if (loading) {
    return <Spinner />;
  }

  return (
    <AccessContext.Provider value={{ allowed, signedIn }}>
      {children}
    </AccessContext.Provider>
  );
};

const useAccessContext = () => {
  const access = useContext(AccessContext);

  if (!access) {
    throw new Error('useAccessContext needs an AccessContext above it');
  }

  return access;
};

export { Provider, useAccessContext };
