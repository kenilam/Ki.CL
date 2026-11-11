import React, { PropsWithChildren, createContext, useContext } from 'react';

// Hooks
import { useChat } from './use-chat';

const SenderContext = createContext<ReturnType<typeof useChat> | null>(null);

const Provider: React.FunctionComponent<PropsWithChildren> = ({ children }) => {
  const value = useChat();

  return <SenderContext.Provider value={value}>{children}</SenderContext.Provider>;
};

const useSenderContext = () => {
  const value = useContext(SenderContext);

  if (value === null) {
    throw new Error('useSenderContext needs a Sender context above it.');
  }

  return value;
};

export { Provider, useSenderContext };
