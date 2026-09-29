// Three
import { THREE } from '@/three';

/** Shared by every part, so the arm's dozens of meshes compile a handful of shaders. */
const MATERIAL = {
  body: new THREE.MeshStandardMaterial({
    color: '#f07a12',
    metalness: 0.15,
    roughness: 0.42,
  }),
  hose: new THREE.MeshStandardMaterial({ color: '#141414', roughness: 0.7 }),
  housing: new THREE.MeshStandardMaterial({
    color: '#1b1b1b',
    metalness: 0.2,
    roughness: 0.5,
  }),
  metal: new THREE.MeshStandardMaterial({
    color: '#b3b7bb',
    metalness: 0.25,
    roughness: 0.45,
  }),
  plate: new THREE.MeshStandardMaterial({
    color: '#e4e4e2',
    metalness: 0.3,
    roughness: 0.4,
  }),
};

export { MATERIAL };
