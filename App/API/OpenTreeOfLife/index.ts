import { useEffect, useSyncExternalStore } from 'react';
import * as client from './client';

type Store = Awaited<ReturnType<typeof client.get>> | undefined;

const cache = new Map<'store', Store>();
const listeners = new Set<() => void>();

const subscribe = (callback: () => void) => {
  listeners.add(callback);

  return () => {
    listeners.delete(callback);
  };
};

const getSnapshot = () => {
  return cache.get('store');
};

const getServerSnapshot = () => {
  return cache.get('store');
};

function notify(store: Store) {
  cache.set('store', store);

  listeners.forEach((listener) => listener());
}

async function get() {
  notify({
    data: undefined,
    error: undefined,
    loading: true,
  });

  const store = await client.get();

  notify(store);
}

const useDataStore = ({ skip = false } = {}) => {
  const store = useSyncExternalStore<Store>(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  useEffect(() => {
    if (!skip) {
      get();
    }

    return () => {
      // Clean up listeners when component unmounts
      listeners.clear();
    };
  }, []);

  return { ...store, get, notify };
};

export { client, get, useDataStore };
