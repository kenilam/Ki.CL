import { THREE } from '@/three';

const SHADE = [
  [0.06, 0],
  [0.12, -0.02],
  [0.36, -0.34],
  [0.38, -0.42],
  [0.34, -0.44],
  [0.32, -0.4],
  [0.1, -0.08],
  [0.05, -0.06],
].map(([x, y]) => {
  return new THREE.Vector2(x, y);
});

const BASE = [
  [0, 0],
  [0.22, 0],
  [0.25, 0.03],
  [0.24, 0.08],
  [0.18, 0.11],
  [0.05, 0.12],
  [0, 0.12],
].map(([x, y]) => {
  return new THREE.Vector2(x, y);
});

export { BASE, SHADE };
