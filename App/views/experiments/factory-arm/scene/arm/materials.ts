// Three
import { THREE } from '@/three';

// Helpers
import { tokenColor } from '@/helper';

/**
 * Shared by every part, so a colour change is one line and the arm's dozens of
 * meshes compile a handful of shaders rather than one each.
 */
const MATERIAL = {
  body: new THREE.MeshStandardMaterial({
    color: tokenColor('orange-400'),
    metalness: 0.15,
    roughness: 0.42,
  }),
  hose: new THREE.MeshStandardMaterial({
    color: tokenColor('black-500'),
    roughness: 0.7,
  }),
  housing: new THREE.MeshStandardMaterial({
    color: tokenColor('black-500'),
    metalness: 0.2,
    roughness: 0.5,
  }),
  metal: new THREE.MeshStandardMaterial({
    color: tokenColor('grey-500'),
    metalness: 0.25,
    roughness: 0.45,
  }),
  plate: new THREE.MeshStandardMaterial({
    color: tokenColor('black-50'),
    metalness: 0.3,
    roughness: 0.4,
  }),
};

export { MATERIAL };
