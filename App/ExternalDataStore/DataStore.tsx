import { useSyncExternalStore } from 'react';

type Params = Parameters<typeof useSyncExternalStore>;
type Subscribe = Params[0];

type OnStoreChange = Parameters<Subscribe>[0];

class DataStore<Config extends Record<string, unknown>> {
  private cache = new Map<keyof Config, unknown>();
  private error = new Map<keyof Config, Error | undefined>();
  private listener = new Set<OnStoreChange>();
  private loading = new Map<keyof Config, boolean>();

  subscribe: Subscribe = (onStoreChange) => {
    this.listener.add(onStoreChange);

    return () => {
      this.listener.delete(onStoreChange);
    };
  };

  getSnapshot = (key: keyof Config) => {
    return {
      data: this.cache.get(key),
      error: this.error.get(key),
      loading: this.loading.get(key) ?? false,
    };
  };

  get = async (
    key: keyof Config,
    url: Parameters<typeof window.fetch>[0],
    init: Parameters<typeof window.fetch>[1] = {}
  ) => {
    if (this.cache.has(key) || this.loading.get(key)) {
      return;
    }

    this.loading.set(key, true);
    this.error.set(key, undefined);

    this.notify();

    try {
      const response = await window.fetch(url, init);

      const json = await response.json();

      this.cache.set(key, json);
    } catch (error) {
      this.error.set(
        key,
        error instanceof Error ? error : new Error('Unknown error')
      );
    } finally {
      this.loading.set(key, false);

      this.notify();
    }
  };

  private notify = () => {
    for (const listener of this.listener) {
      listener();
    }
  };
}

export function createExternalDataStore<
  Config extends Record<string, unknown>,
>() {
  return new DataStore<Config>();
}
