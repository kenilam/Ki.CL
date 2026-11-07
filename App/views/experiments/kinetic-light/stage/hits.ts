// Three
import type { THREE } from '@/three';

type Hit = { color: THREE.Color; velocity: number; x: number };

type Hits = {
  emit: (hit: Hit) => void;
  on: (listener: (hit: Hit) => void) => () => void;
};

const createHits = (): Hits => {
  const listeners = new Set<(hit: Hit) => void>();

  return {
    emit: (hit) => listeners.forEach((listener) => listener(hit)),
    on: (listener) => {
      listeners.add(listener);

      return () => {
        listeners.delete(listener);
      };
    },
  };
};

export { createHits, type Hit, type Hits };
