import { THREE } from '@/three';

const PROFILE = [
  [0, 0],
  [0.2, 0],
  [0.25, 0.04],
  [0.26, 0.4],
  [0.25, 0.45],
  [0.22, 0.45],
  [0.21, 0.08],
  [0, 0.08],
].map(([x, y]) => {
  return new THREE.Vector2(x, y);
});

export { PROFILE };
