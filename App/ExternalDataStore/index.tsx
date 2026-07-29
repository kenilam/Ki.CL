import {
  FunctionComponent,
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useRef,
  useSyncExternalStore,
} from 'react';

// DataStore
import { createExternalDataStore } from './DataStore';

export function createExternalDataStoreContext<
  Config extends Record<string, unknown>,
>() {
  type Context = ReturnType<typeof createExternalDataStore<Config>>;

  const Store = createContext<Context | undefined>(undefined);

  const Provider: FunctionComponent<PropsWithChildren> = ({ children }) => {
    const ref = useRef<Context>(createExternalDataStore<Config>());

    return <Store.Provider value={ref.current}>{children}</Store.Provider>;
  };

  function useExternalDataContext<Key extends keyof Config>(
    key: Key,
    url: Parameters<typeof window.fetch>[0],
    init: Parameters<typeof window.fetch>[1] = {}
  ) {
    const context = useContext(Store);

    if (!context) {
      throw new Error(
        'useExternalDataContext must be used within ExternalDataStoreProvider'
      );
    }

    const { subscribe, getSnapshot, get } = context;

    useEffect(() => {
      get(key, url, init);
    }, [key, url]);

    return useSyncExternalStore(
      subscribe,
      () => getSnapshot(key),
      () => getSnapshot(key)
    );
  }

  return {
    Provider,
    useExternalDataContext,
  };
}
