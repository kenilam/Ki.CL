import { THREE } from '@/three';

import { random } from './seed';

/**
 * Body silhouettes. Rank drives the form: high ranks are larger, softer and
 * more complex; low ranks are compact and tighter; an unknown rank gets a
 * soft-cornered cube, so "no rank" is never drawn as a plain sphere.
 */
export type Form = 'bloom' | 'lobed' | 'compact' | 'blob';

export function formForRank(rank?: string | null): Form {
  const value = (rank ?? '').trim().toLowerCase().replace(/[_-]+/g, ' ');

  if (!value || value.startsWith('no rank') || value === 'clade') {
    return 'blob';
  }

  if (/(^|\s)(domain|superkingdom|kingdom)(\s|$)/.test(value)) {
    return 'bloom';
  }

  if (
    /(^|\s)(phylum|division|class|subclass|superclass|order|suborder|infraorder|superorder|family|subfamily|tribe|superfamily)(\s|$)/.test(
      value
    )
  ) {
    return 'lobed';
  }

  return 'compact';
}

/** Relative body size by form - higher ranks read larger. */
export const FORM_SCALE: Record<Form, number> = {
  bloom: 1.15,
  lobed: 1,
  compact: 0.82,
  blob: 0.92,
};

/**
 * Tessellation is capped at 2 because no body is ever drawn larger than about
 * sixteen pixels.
 *
 * The camera frames a taxon at a distance derived from its own branch length,
 * and that framing is the closest the rig will go - so a body's size on screen
 * is fixed by construction rather than by where it sits in the tree. Measured
 * across the range: the focus 10.9px, its fan 8.5px, a distant ancestor 7px.
 *
 * At that size an icosahedron at detail 2 is 320 faces over ~10px, already far
 * below one triangle per pixel. Detail 4 was 5,120 faces - 15,360 vertices,
 * each put through the wobble loop below - to render the same dot. What
 * separates the forms is the wobble and its frequency, not the tessellation
 * they are applied to, so capping costs nothing in silhouette.
 */
const MAX_DETAIL = 2;

const FORM_SURFACE: Record<
  Form,
  { detail: number; wobble: number; frequency: number }
> = {
  bloom: { detail: MAX_DETAIL, wobble: 0.2, frequency: 2.1 },
  lobed: { detail: MAX_DETAIL, wobble: 0.15, frequency: 2.8 },
  compact: { detail: MAX_DETAIL, wobble: 0.09, frequency: 3.6 },
  blob: { detail: MAX_DETAIL, wobble: 0.12, frequency: 2.4 },
};

/** Segments per side for the cube `blob` starts from, on the same reasoning. */
const BLOB_SEGMENTS = 3;

/**
 * Smooth pseudo-noise from summed sinusoids - cheap, seeded, and continuous
 * over the surface, which is all the wobble needs to avoid looking machined.
 */
function wobbleAt(
  x: number,
  y: number,
  z: number,
  frequency: number,
  phase: readonly number[]
): number {
  return (
    (Math.sin(x * frequency + (phase[0] ?? 0)) *
      Math.cos(y * frequency * 0.9 + (phase[1] ?? 0)) +
      Math.sin(y * frequency * 1.3 + (phase[2] ?? 0)) *
        Math.cos(z * frequency * 1.1 + (phase[3] ?? 0)) +
      Math.sin(z * frequency * 0.8 + (phase[4] ?? 0)) *
        Math.cos(x * frequency * 1.2 + (phase[5] ?? 0))) /
    3
  );
}

/** A unit-radius organic body, deterministic per `nodeId`. */
export function createBody(nodeId: string, form: Form): THREE.BufferGeometry {
  const surface = FORM_SURFACE[form];
  const next = random(`${nodeId}:body`);
  const phase = Array.from({ length: 6 }, () => next() * Math.PI * 2);

  const geometry: THREE.BufferGeometry =
    form === 'blob'
      ? new THREE.BoxGeometry(
          1.35,
          1.35,
          1.35,
          BLOB_SEGMENTS,
          BLOB_SEGMENTS,
          BLOB_SEGMENTS
        )
      : new THREE.IcosahedronGeometry(1, surface.detail);

  const position = geometry.getAttribute('position') as THREE.BufferAttribute;
  const vertex = new THREE.Vector3();

  for (let i = 0; i < position.count; i += 1) {
    vertex.fromBufferAttribute(position, i);

    if (form === 'blob') {
      // Round the cube off, keeping a hint of its corners.
      const length = vertex.length();

      vertex.normalize().multiplyScalar(0.72 + length * 0.2);
    } else {
      vertex.normalize();
    }

    vertex.multiplyScalar(
      1 +
        wobbleAt(vertex.x, vertex.y, vertex.z, surface.frequency, phase) *
          surface.wobble
    );

    position.setXYZ(i, vertex.x, vertex.y, vertex.z);
  }

  position.needsUpdate = true;
  geometry.computeVertexNormals();

  return geometry;
}
