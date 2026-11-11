import React, { PropsWithChildren, createContext, useContext } from 'react';

// Hooks
import { useConfirm } from '@/views/me/password/confirm/use-confirm';

const ConfirmContext = createContext<ReturnType<typeof useConfirm> | null>(
  null
);

const Provider: React.FunctionComponent<PropsWithChildren> = ({ children }) => {
  const confirm = useConfirm();

  return (
    <ConfirmContext.Provider value={confirm}>
      {children}
    </ConfirmContext.Provider>
  );
};

function useConfirmContext() {
  const confirm = useContext(ConfirmContext);

  if (!confirm) {
    throw new Error('useConfirmContext needs a ConfirmContext above it');
  }

  return confirm;
}

export { Provider, useConfirmContext };
