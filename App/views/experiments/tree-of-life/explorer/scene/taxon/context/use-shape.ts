import { useEffect, useMemo } from 'react';

import { THREE } from '@/three';

// Constants
import { ROOT_NODE_ID } from '@/views/experiments/tree-of-life/constants';

// Geometry
import { createBody, formForRank, FORM_SCALE } from './body';
import { createBranch } from './branch';

// Palette
import { inherit } from './palette';

// Position
import { tipFor } from './position';

// Spec
import type * as Spec from '@/views/experiments/tree-of-life/explorer/scene/taxon/spec';
import type { TaxonNode } from '@/views/experiments/tree-of-life/spec';

type Props = Pick<TaxonNode, 'nodeId' | 'rank'> & {
  growth: Spec.Growth;
};

/** Where the taxon's tip lands, its colour, and the branch and body drawn to it. */
const useShape = ({ growth, nodeId, rank }: Props) => {
  const { endWidth, size, start, startColor, startWidth } = growth;

  /*
   * The origin of life has nothing above it, so there is no branch to arrive
   * on, and everything growing out of it leaves the centre of the globe.
   */
  const isRoot = nodeId === ROOT_NODE_ID;

  const color = useMemo(
    () => inherit(startColor, nodeId),
    [startColor, nodeId]
  );

  const tip = useMemo(
    () =>
      isRoot
        ? new THREE.Vector3(...start)
        : tipFor({ start: new THREE.Vector3(...start), nodeId, size }),
    [isRoot, start, nodeId, size]
  );

  const branch = useMemo(
    () =>
      isRoot
        ? null
        : createBranch({
            start: new THREE.Vector3(...start),
            tip,
            startWidth,
            endWidth,
            startColor,
            endColor: color,
            nodeId,
          }),
    [isRoot, start, tip, startWidth, endWidth, startColor, color, nodeId]
  );

  /*
   * Memoised, because descendants take it as their `start`: a fresh array each
   * render rebuilt every branch in the tree, 7,710 sweeps for 300 taxa.
   */
  const anchor = useMemo(() => tip.toArray(), [tip]);

  const form = useMemo(() => formForRank(rank), [rank]);
  const body = useMemo(() => createBody(nodeId, form), [nodeId, form]);

  useEffect(() => () => branch?.geometry.dispose(), [branch]);
  useEffect(() => () => body.dispose(), [body]);

  const bodyRadius = (size / 2) * FORM_SCALE[form];

  return { anchor, body, bodyRadius, branch, color, form, isRoot, tip };
};

export { useShape };
