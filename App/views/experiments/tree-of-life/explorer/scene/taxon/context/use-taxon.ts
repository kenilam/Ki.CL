import { useMemo } from 'react';

// Context
import { useLineageContext } from '@/views/experiments/tree-of-life/lineage-context';
import { useSubtreeContext } from '@/views/experiments/tree-of-life/subtree-context';

// Constants
import {
  MIN_SIZE,
  MIN_WIDTH,
  SIZE_TAPER,
  WIDTH_TAPER,
} from '@/views/experiments/tree-of-life/explorer/constants';
import { decay } from '@/views/experiments/tree-of-life/explorer/scene/taxon/constants';

// Hooks
import { useDraw } from './use-draw';
import { useGrowth } from './use-growth';
import { usePublish } from './use-publish';
import { useShape } from './use-shape';

// Spec
import type * as Spec from '@/views/experiments/tree-of-life/explorer/scene/taxon/spec';

const useTaxon = (nodeId: string, growth: Spec.Growth) => {
  const { find } = useSubtreeContext();
  const { focus } = useLineageContext();

  const taxon = useMemo(() => {
    return find(nodeId);
  }, [find, nodeId])!;
  const { anchor, body, bodyRadius, branch, color, isRoot, tip } = useShape({
    growth,
    nodeId,
    rank: taxon.rank,
  });

  usePublish({ color, isRoot, nodeId, radius: bodyRadius, taxon, tip });

  const { grown, state } = useGrowth(growth);
  const refs = useDraw({
    bodyRadius,
    branch,
    endWidth: growth.endWidth,
    grown,
    tip,
  });

  const { endWidth, size, withinFocus = false } = growth;

  /*
   * Each descendant starts at this tip, in this colour, at this width, and
   * is given a direction only once this taxon has arrived, so the tree
   * unfurls a level at a time.
   */
  const offer = useMemo((): Spec.Growth => {
    return {
      start: anchor,
      startColor: color,
      startWidth: endWidth,
      endWidth: decay(endWidth, WIDTH_TAPER, MIN_WIDTH),
      size: decay(size, SIZE_TAPER, MIN_SIZE),
      play: state,
      withinFocus: withinFocus || nodeId === focus,
    };
  }, [anchor, color, endWidth, focus, nodeId, size, state, withinFocus]);

  return useMemo(() => {
    return {
      body,
      bodyRadius,
      branch,
      color,
      grown,
      isRoot,
      nodeId,
      offer,
      refs,
      state,
      taxon,
      withinFocus,
    };
  }, [
    body,
    bodyRadius,
    branch,
    color,
    grown,
    isRoot,
    nodeId,
    offer,
    refs,
    state,
    taxon,
    withinFocus,
  ]);
};

export { useTaxon };
