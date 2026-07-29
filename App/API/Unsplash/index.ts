import { useEffect, useSyncExternalStore } from 'react';
import * as client from './client';

type Store = Awaited<ReturnType<typeof client.getPhotos>> | undefined;

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

async function getPhotos(...props: Parameters<typeof client.getPhotos>) {
  notify({
    data: undefined,
    error: undefined,
    loading: true,
  });

  const store = await client.getPhotos(...props);

  notify(store);
}

type Props = [
  Parameters<typeof client.getPhotos>[0] & { skip: boolean },
  Parameters<typeof client.getPhotos>[1]?,
];

const useDataStore = (...props: Props) => {
  const { skip } = (props[0] = { ...props[0], skip: false });

  const store = useSyncExternalStore<Store>(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  useEffect(() => {
    if (!skip) {
      getPhotos(...props);
    }

    return () => {
      // Clean up listeners when component unmounts
      listeners.clear();
    };
  }, []);

  return { ...store, getPhotos, notify };
};

export { client, getPhotos, useDataStore };
