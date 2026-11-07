import { useSyncExternalStore } from 'react';

/*
 * Plates being drawn for taxa the visitor opened, kept outside the tree so the
 * notifications at the root can say when one is ready. Plates are shared, so
 * the API keeps no list of who asked for them, and this lasts one page load.
 */
let plates: Array<{
  name: string;
  nodeId: string;
  ottId: number;
  ready: boolean;
}> = [];

const listeners = new Set<() => void>();

function publish(next: typeof plates) {
  plates = next;
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
}

function watch(plate: Omit<(typeof plates)[number], 'ready'>) {
  if (plates.some(({ ottId }) => ottId === plate.ottId)) {
    return;
  }

  publish([...plates, { ...plate, ready: false }]);
}

function settle(ottId: number) {
  publish(
    plates.map((plate) =>
      plate.ottId === ottId ? { ...plate, ready: true } : plate
    )
  );
}

function forget(ottId: number) {
  publish(plates.filter((plate) => plate.ottId !== ottId));
}

const usePlates = () => useSyncExternalStore(subscribe, () => plates);

export { forget, settle, usePlates, watch };
