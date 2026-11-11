import { THREE } from '@/three';

// Constants
import { RESOLUTION } from './constants';

// Helpers
import { tokenColor } from '@/helper';

/**
 * Soft falloff, painted once into a texture and shared by every aura. A ring
 * built from geometry has hard edges and reads as an outline, and the painted
 * blur survives being scaled up as the ripple travels. White, so the mesh's
 * colour tints it, and built lazily so importing this costs nothing.
 */
function paint(stops: readonly (readonly [number, number])[]): THREE.Texture {
  const canvas = document.createElement('canvas');

  canvas.width = RESOLUTION;
  canvas.height = RESOLUTION;

  const context = canvas.getContext('2d');

  if (context) {
    const middle = RESOLUTION / 2;
    const gradient = context.createRadialGradient(
      middle,
      middle,
      0,
      middle,
      middle,
      middle
    );

    stops.forEach(([at, alpha]) => {
      gradient.addColorStop(at, tokenColor('white-pure', alpha));
    });

    context.fillStyle = gradient;
    context.fillRect(0, 0, RESOLUTION, RESOLUTION);
  }

  const texture = new THREE.CanvasTexture(canvas);

  texture.colorSpace = THREE.SRGBColorSpace;

  return texture;
}

let ringTexture: THREE.Texture | null = null;
let haloTexture: THREE.Texture | null = null;

/** A band that fades out on both sides - a ripple, not an outline. */
function ring(): THREE.Texture {
  ringTexture ??= paint([
    [0, 0],
    [0.52, 0],
    [0.78, 1],
    [0.93, 0.35],
    [1, 0],
  ]);

  return ringTexture;
}

/** A disc brightest at its centre - the origin's steady glow. */
function halo(): THREE.Texture {
  haloTexture ??= paint([
    [0, 1],
    [0.35, 0.6],
    [0.7, 0.18],
    [1, 0],
  ]);

  return haloTexture;
}

export { halo, ring };
