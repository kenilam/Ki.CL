import * as THREE from 'three';

/**
 * Organic node bodies. Rank drives the silhouette: high ranks are larger,
 * softer and more complex; low ranks are compact and tighter; unknown rank
 * gets a soft-cornered cube rather than a sphere, so "no rank" is never
 * rendered as a plain circle.
 *
 * Every form is displaced by a deterministic low-frequency wobble, so no two
 * nodes share an outline and none of them read as a UI marker.
 */

export type NodeForm = 'bloom' | 'lobed' | 'compact' | 'blob';

function hashString(input: string): number {
  let hash = 2166136261;
  for (let i = 0; i < input.length; i += 1) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function mulberry32(seed: number): () => number {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function normalizeRank(rank?: string | null): string {
  return (rank ?? '').trim().toLowerCase().replace(/[_-]+/g, ' ');
}

/** Map a taxonomic rank onto a body form. Unknown rank never gets a sphere. */
export function formForRank(rank?: string | null): NodeForm {
  const value = normalizeRank(rank);

  if (!value || value.startsWith('no rank') || value === 'clade') {
    return 'blob';
  }
  if (/(^|\s)(domain|superkingdom|kingdom)(\s|$)/.test(value)) {
    return 'bloom';
  }
  if (/(^|\s)(phylum|division|class|subclass|superclass)(\s|$)/.test(value)) {
    return 'lobed';
  }
  if (
    /(^|\s)(order|suborder|infraorder|superorder|family|subfamily|tribe|superfamily)(\s|$)/.test(
      value
    )
  ) {
    return 'lobed';
  }
  return 'compact';
}

/** Relative body size by form — higher ranks read larger. */
export const FORM_SCALE: Record<NodeForm, number> = {
  bloom: 1.15,
  lobed: 1,
  compact: 0.82,
  blob: 0.92,
};

type FormSpec = {
  /** Subdivision detail — higher ranks carry more surface complexity. */
  detail: number;
  /** Displacement strength as a fraction of radius. */
  wobble: number;
  /** Spatial frequency of the wobble; low = broad lobes, high = knobbly. */
  frequency: number;
};

const FORM_SPEC: Record<NodeForm, FormSpec> = {
  bloom: { detail: 4, wobble: 0.2, frequency: 2.1 },
  lobed: { detail: 3, wobble: 0.15, frequency: 2.8 },
  compact: { detail: 2, wobble: 0.09, frequency: 3.6 },
  blob: { detail: 3, wobble: 0.12, frequency: 2.4 },
};

/**
 * Smooth pseudo-noise from summed sinusoids — cheap, seeded, and continuous
 * over the sphere, which is all the wobble needs.
 */
function wobbleAt(
  x: number,
  y: number,
  z: number,
  frequency: number,
  phase: readonly number[]
): number {
  return (
    (Math.sin(x * frequency + phase[0]!) *
      Math.cos(y * frequency * 0.9 + phase[1]!) +
      Math.sin(y * frequency * 1.3 + phase[2]!) *
        Math.cos(z * frequency * 1.1 + phase[3]!) +
      Math.sin(z * frequency * 0.8 + phase[4]!) *
        Math.cos(x * frequency * 1.2 + phase[5]!)) /
    3
  );
}

/**
 * Build a unit-radius organic body for one node. Deterministic per nodeId, so
 * a node keeps its silhouette across sessions just like its position/colour.
 */
export function createNodeGeometry(
  nodeId: string,
  form: NodeForm
): THREE.BufferGeometry {
  const spec = FORM_SPEC[form];
  const rand = mulberry32(hashString(nodeId));
  const phase = Array.from({ length: 6 }, () => rand() * Math.PI * 2);

  const geometry: THREE.BufferGeometry =
    form === 'blob'
      ? // Soft-cornered cube: a subdivided box relaxed toward a sphere.
        new THREE.BoxGeometry(1.35, 1.35, 1.35, 6, 6, 6)
      : new THREE.IcosahedronGeometry(1, spec.detail);

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

    const displacement =
      1 +
      wobbleAt(vertex.x, vertex.y, vertex.z, spec.frequency, phase) *
        spec.wobble;
    vertex.multiplyScalar(displacement);

    position.setXYZ(i, vertex.x, vertex.y, vertex.z);
  }

  position.needsUpdate = true;
  geometry.computeVertexNormals();

  return geometry;
}
