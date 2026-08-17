import type { Vector3Tuple } from 'three';
import type { Kicl_TreeOfLifeSubtreeQuery } from 'api/provider';

/**
 * One taxon as the query returns it. `TreeOfLifeSubtree` is nullable - the
 * query resolves to nothing on a hard miss - but a rendered taxon always has
 * a node, so the null is stripped here rather than guarded at every use.
 */
export type Taxon = NonNullable<
  Kicl_TreeOfLifeSubtreeQuery['TreeOfLifeSubtree']
>;

/** What a taxon reports once it has finished arriving or leaving. */
export type Settled = {
  position: Vector3Tuple;
  color: string;
};

export type Props = Pick<Taxon, 'nodeId'> & {
  /** Where the branch leaves whatever it grows out of. */
  start: Vector3Tuple;
  /** Colour at `start`; the taxon's own colour is derived from it. */
  startColor: string;
  /** Branch width at `start` - the thicker, inward end. */
  startWidth: number;
  /** Branch width at the tip, so a branch tapers as it runs outward. */
  endWidth: number;
  /** Diameter of the body at the tip. Also sets how far the branch reaches. */
  size: number;
  /**
   * Which way to run. `enter` grows the branch out to its tip, `exit`
   * retracts it back into `start`, and switching between them reverses from
   * wherever the taxon currently is rather than restarting.
   *
   * Undefined runs nothing: the taxon holds where it is - ungrown, and
   * invisible, until it is first given a direction - so a caller can mount a
   * whole tree and release it a level at a time.
   */
  play?: 'enter' | 'exit';
  /**
   * Whether this taxon sits below the one in the route.
   *
   * Only that subtree plays out. Everywhere else - the lineage climbing back
   * to the origin, and the context fanned around it - is scenery for the taxon
   * being looked at, and watching it redraw itself says nothing about where
   * you are.
   */
  withinFocus?: boolean;
  /** Fully grown: reports the tip it reached and the colour it settled on. */
  onEntered?: (settled: Settled) => void;
  /** Fully retracted: reports the start it collapsed into, and that colour. */
  onExited?: (settled: Settled) => void;
};
