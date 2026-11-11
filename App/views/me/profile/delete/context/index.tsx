import React, { PropsWithChildren, createContext, useContext } from 'react';

// Hooks
import { useDelete } from '@/views/me/profile/delete/use-delete';

const DeleteContext = createContext<ReturnType<typeof useDelete> | null>(null);

const Provider: React.FunctionComponent<PropsWithChildren> = ({ children }) => {
  const deletion = useDelete();

  return (
    <DeleteContext.Provider value={deletion}>{children}</DeleteContext.Provider>
  );
};

function useDeleteContext() {
  const value = useContext(DeleteContext);

  if (!value) {
    throw new Error('useDeleteContext needs a DeleteContext above it');
  }

  return value;
}

export { Provider, useDeleteContext };
