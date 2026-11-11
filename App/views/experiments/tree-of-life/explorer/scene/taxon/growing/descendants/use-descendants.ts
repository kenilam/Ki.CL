import { useEffect, useMemo, useState, useSyncExternalStore } from 'react';

// Context
import { useAnimateContext } from '@/views/experiments/tree-of-life/animate-context';
import { useLineageContext } from '@/views/experiments/tree-of-life/lineage-context';
import { useTaxonContext } from '@/views/experiments/tree-of-life/explorer/scene/taxon/context';

// Zoom
import {
  getSettled,
  subscribeSettled,
} from '@/views/experiments/tree-of-life/explorer/scene/zoom';

// Constants
import {
  CONTEXT_DESCENDANTS,
  MOUNT_FRACTION,
  MOUNT_MINIMUM,
} from '@/views/experiments/tree-of-life/explorer/scene/taxon/constants';

// Spec
import type { TaxonNode } from '@/views/experiments/tree-of-life/spec';

/** The descendants to draw, let through a slice per frame. */
const useDescendants = () => {
  const { state, taxon, withinFocus } = useTaxonContext();
  const { animate } = useAnimateContext();
  const { chains, focus } = useLineageContext();
  const { nodeId } = taxon;

  // Whether the camera has arrived. Flips twice per navigation, not per frame.
  const settled = useSyncExternalStore(
    subscribeSettled,
    getSettled,
    getSettled
  );

  // The next taxon toward the focus, which sampling must never cut.
  const previous = useMemo(() => {
    const index = chains.indexOf(nodeId);

    return index > 0 ? chains[index - 1] : null;
  }, [chains, nodeId]);

  /*
   * The focused taxon shows its whole clade once the camera has stopped;
   * landing 153 descendants mid-flight costs a 383ms frame. Everything else
   * shows an even sample by stride, since the server's order means nothing.
   */
  const descendants = useMemo(() => {
    const all = (taxon.descendants ?? []).filter((child): child is TaxonNode =>
      Boolean(child?.nodeId)
    );

    if ((nodeId === focus && settled) || all.length <= CONTEXT_DESCENDANTS) {
      return all;
    }

    const stride = all.length / CONTEXT_DESCENDANTS;
    const sampled = Array.from(
      { length: CONTEXT_DESCENDANTS },
      (_, index) => all[Math.floor(index * stride)]
    ).filter((child): child is TaxonNode => Boolean(child));

    const onward = previous
      ? all.find((child) => child.nodeId === previous)
      : undefined;

    if (!onward || sampled.some((child) => child.nodeId === onward.nodeId)) {
      return sampled;
    }

    return [onward, ...sampled.slice(0, CONTEXT_DESCENDANTS - 1)];
  }, [taxon.descendants, previous, nodeId, focus, settled]);

  // Reset when the list changes, so a new taxon starts the reveal again.
  const [revealed, setRevealed] = useState(0);

  useEffect(() => {
    setRevealed(Math.min(descendants.length, MOUNT_MINIMUM));
  }, [descendants]);

  useEffect(() => {
    if (revealed >= descendants.length) {
      return undefined;
    }

    // Playing out waits for this taxon's own branch to arrive first.
    if (animate && withinFocus && state !== 'enter') {
      return undefined;
    }

    const slice = Math.max(
      MOUNT_MINIMUM,
      Math.ceil(descendants.length * MOUNT_FRACTION)
    );
    const frame = requestAnimationFrame(() =>
      setRevealed((current) => Math.min(descendants.length, current + slice))
    );

    return () => cancelAnimationFrame(frame);
  }, [revealed, descendants.length, animate, withinFocus, state]);

  return useMemo(() => descendants.slice(0, revealed), [descendants, revealed]);
};

export { useDescendants };
