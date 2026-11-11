import React, {
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';

// Storage
import {
  EVENT,
  getItem,
  removeItem,
  setItem,
  type Props,
} from '@/local-storage/storage';

const DEFAULT: Props = {
  clear: window.localStorage.clear,
  getItem<Record>(_) {
    return {} as Record;
  },
  key: window.localStorage.key,
  localStorage: window.localStorage,
  length: window.localStorage.length,
  removeItem(_) {
    return null;
  },
  setItem(_, __) {
    return null;
  },
};

const Context = React.createContext(DEFAULT);

const LocalStorageProvider: React.FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const [localStorage, refreshLocalStorage] = useState({
    ...window.localStorage,
  });

  useEffect(() => {
    const storageHandler = () => {
      refreshLocalStorage({ ...window.localStorage });
    };

    window.addEventListener('storage', storageHandler);
    document.addEventListener(EVENT, storageHandler, false);

    return () => {
      window.removeEventListener('storage', storageHandler);
      document.removeEventListener(EVENT, storageHandler, false);
    };
  });

  const { clear, key, length } = window.localStorage;

  const value = {
    clear,
    getItem,
    length,
    localStorage,
    removeItem,
    setItem,
    key,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

const useLocalStorageContext = () => {
  const Contexts = useContext(Context);

  return Contexts;
};

export { LocalStorageProvider, useLocalStorageContext };
