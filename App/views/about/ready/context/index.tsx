import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';

const WAIT = 4000;

const ReadyContext = createContext<{
  ready: boolean;
  settle: () => void;
} | null>(null);

const Provider: React.FunctionComponent<PropsWithChildren> = ({ children }) => {
  const [ready, setReady] = useState(false);

  const settle = () => {
    setReady(true);
  };

  useEffect(() => {
    const timer = window.setTimeout(settle, WAIT);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <ReadyContext.Provider value={{ ready, settle }}>
      {children}
    </ReadyContext.Provider>
  );
};

const useReady = () => {
  const ready = useContext(ReadyContext);

  if (!ready) {
    throw new Error('useReady needs a Ready provider around it.');
  }

  return ready;
};

export { Provider, useReady };
