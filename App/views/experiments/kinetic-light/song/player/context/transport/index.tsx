import React, { PropsWithChildren, createContext, useContext } from 'react';

// Hooks
import { useTransport, type Transport } from './use-transport';

const TransportContext = createContext<Transport | null>(null);

const Provider: React.FunctionComponent<PropsWithChildren> = ({ children }) => {
  const value = useTransport();

  return (
    <TransportContext.Provider value={value}>
      {children}
    </TransportContext.Provider>
  );
};

const useTransportContext = () => {
  const value = useContext(TransportContext);

  if (!value) {
    throw new Error('useTransportContext needs a Transport context above it.');
  }

  return value;
};

export { Provider, useTransportContext };
