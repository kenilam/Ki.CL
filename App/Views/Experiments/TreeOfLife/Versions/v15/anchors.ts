import type { Vector3Tuple } from 'three';

/**
 * Where each taxon ended up, keyed by node id.
 *
 * A taxon derives its own tip — the caller supplies a start and nothing more
 * — so it is the only thing that knows where it is. Anything that needs to
 * point at a taxon rather than draw one, the camera above all, reads it back
 * from here.
 *
 * Deliberately outside React: a position is settled once and then only read,
 * so putting it in state would re-render the whole tree to tell the camera
 * something it could have looked up.
 */
const anchors = new Map<string, Vector3Tuple>();

export function setAnchor(nodeId: string, position: Vector3Tuple): () => void {
  anchors.set(nodeId, position);

  return () => {
    if (anchors.get(nodeId) === position) {
      anchors.delete(nodeId);
    }
  };
}

/** How many taxa are currently placed. Stops changing once the tree is whole. */
export function anchorCount(): number {
  return anchors.size;
}

/**
 * How far the furthest placed taxon sits from the origin.
 *
 * Everything grows outward from the centre, so the largest distance is the
 * tree's current extent — which is what the cage around it is sized from.
 * Compared squared and rooted once, so the per-frame cost is a walk over a few
 * hundred numbers and a single `sqrt`.
 */
export function reach(): number {
  return spread(0, 0, 0);
}

/**
 * How far the furthest placed taxon sits from an arbitrary point.
 *
 * The camera orbits the focused taxon rather than the origin, so bounding the
 * scene for it means measuring from where it is actually looking. Taking the
 * origin's radius and adding the target's distance would also enclose
 * everything, but far too generously — the tree is rarely spread evenly around
 * the focus, and the slack shows up as a zoom limit that stops in empty space.
 */
export function spread(x0: number, y0: number, z0: number): number {
  let furthest = 0;

  anchors.forEach(([x, y, z]) => {
    const dx = x - x0;
    const dy = y - y0;
    const dz = z - z0;
    const distance = dx * dx + dy * dy + dz * dz;

    if (distance > furthest) {
      furthest = distance;
    }
  });

  return Math.sqrt(furthest);
}

/** `null` when the taxon is not on screen — it may not be rendered at all. */
export function getAnchor(nodeId: string | undefined): Vector3Tuple | null {
  return (nodeId && anchors.get(nodeId)) || null;
}
