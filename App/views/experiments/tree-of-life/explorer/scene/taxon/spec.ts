import type { Vector3Tuple } from 'three';
import type { Kicl_TreeOfLifeSubtreeQuery } from 'api/provider';

/**
 * One taxon as the query returns it. `TreeOfLifeSubtree` is nullable - the
 * query resolves to nothing on a hard miss - but a rendered taxon always has
 * a node, so the null is stripped here rather than guarded at every use.
 */
export type Taxon = NonNullable<
  Kicl_TreeOfLifeSubtreeQuery['treeOfLifeSubtree']
>;

export type Growth = {
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
   * wherever the taxon currently is. Undefined holds it ungrown, so a whole
   * tree can mount and be released a level at a time.
   */
  play?: 'enter' | 'exit';
  /** Whether this taxon sits below the one in the route. Only that subtree plays out. */
  withinFocus?: boolean;
};
