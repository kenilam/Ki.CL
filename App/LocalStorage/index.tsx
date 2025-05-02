import React, {
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';

type LocalStorage = Omit<
  Storage,
  'getItem' | 'setItem' | 'clear' | 'length' | 'key'
>;

type Value = LocalStorage | null | undefined;

type Props = Pick<Storage, 'clear' | 'length' | 'key'> & {
  localStorage: Omit<
    Storage,
    'getItem' | 'setItem' | 'clear' | 'length' | 'key'
  >;
  getItem<Item extends Value>(key: string): Item;
  removeItem: Storage['removeItem'];
  setItem(key: string, value: Value): void;
};

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

const EVENT = 'storageChange';

const getItem: Props['getItem'] = (key) => {
  const value = window.localStorage.getItem(key);

  if (!value) {
    return value;
  }

  try {
    return JSON.parse(String(value));
  } catch (error) {
    console.error(error);

    return value;
  }
};

const removeItem: Props['removeItem'] = (key) => {
  window.localStorage.removeItem(key);

  window.setTimeout(() => {
    const event = new CustomEvent(EVENT);

    document.dispatchEvent(event);
  }, 300);
};

const setItem: Props['setItem'] = (key, _value) => {
  let value = '';

  try {
    if (typeof _value !== 'string') {
      value = JSON.stringify(_value);
    }
  } catch (error) {
    console.error(error);
  }

  window.localStorage.setItem(key, String(value));

  window.setTimeout(() => {
    const event = new CustomEvent(EVENT);

    document.dispatchEvent(event);
  }, 300);
};

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

const { localStorage } = window;

export { localStorage, getItem, removeItem, setItem, useLocalStorageContext };
export default LocalStorageProvider;
