import React, { PropsWithChildren, createContext, useContext } from 'react';

// Hooks
import { useThread } from './use-thread';

const ThreadContext = createContext<ReturnType<typeof useThread> | null>(null);

const Provider: React.FunctionComponent<PropsWithChildren> = ({ children }) => {
  const value = useThread();

  return <ThreadContext.Provider value={value}>{children}</ThreadContext.Provider>;
};

const useThreadContext = () => {
  const value = useContext(ThreadContext);

  if (value === null) {
    throw new Error('useThreadContext needs a Thread context above it.');
  }

  return value;
};

export { Provider, useThreadContext };
