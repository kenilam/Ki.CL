import { useEffect, useMemo, useRef } from 'react';

// Routes
import { useParams } from 'design/router';

// Chain
import {
  type Chain,
  chain as walkChain,
} from '@/views/experiments/tree-of-life/chain';

// Context
import { useSubtreeContext } from '@/views/experiments/tree-of-life/subtree-context';

// Spec
import type * as Spec from '@/views/experiments/tree-of-life/spec';

const useLineage = () => {
  const { nodeId } = useParams<Spec.Params>();
  const { data, fetch, lazyData } = useSubtreeContext();

  /*
   * The focused node's lineage, walked rootward until the origin of life.
   *
   * Read from the cache rather than from `data`: one response nests
   * `ancestor` only as deep as codegen fixed it, so a deep lineage would stop
   * a dozen hops short and quietly look finished. The cache accumulates the
   * links from every response, so the walk can cross the seam between them.
   */
  const lineage = useMemo(
    () => walkChain(nodeId),
    // `data` and the lazy result are not read here - they are what tells us
    // the cache has changed underneath and the walk is worth redoing.
    [nodeId, data, lazyData]
  );

  /*
   * The last lineage that actually reached the root, kept so the canvas has
   * something to draw while a new one is being climbed.
   *
   * Navigating to a taxon outside the cached clade leaves the walk with just
   * the new id and `complete: false`, which unmounts the entire tree for as
   * long as the climb takes - measured at ~5s and 260 blank frames. Holding
   * the previous lineage keeps the old tree up and swaps it for the new one in
   * one move, once that one is whole.
   *
   * Written during render rather than in an effect: an effect runs a commit
   * late, which is exactly the frame the tree would blank in. The write is
   * idempotent, so repeating it is harmless.
   */
  const settled = useRef<Chain>({ ids: [], complete: false });

  if (lineage.complete) {
    settled.current = lineage;
  }

  const chains = lineage.complete ? lineage.ids : settled.current.ids;
  const rooted = lineage.complete || settled.current.complete;

  /*
   * When the walk runs out of cache before reaching the root, fetch whatever
   * sits above the node it stopped at. That response carries its own dozen
   * ancestors, so each pass climbs another stretch and the next walk gets
   * further - repeating until the chain lands on the root.
   *
   * `climbed` stops a tail being asked for twice: if a fetch fails to extend
   * the chain, the effect would otherwise re-run on the same tail forever.
   *
   * Driven by the live walk, never by `chains`. `chains` holds the previous
   * lineage while a new one is being climbed - climbing from its tail would
   * re-fetch the old, already-complete chain and never advance the new one,
   * turning a few seconds of blank canvas into a permanent stall.
   */
  const climbed = useRef(new Set<string>());

  useEffect(() => {
    const tail = lineage.ids[lineage.ids.length - 1];

    if (!tail || lineage.complete || climbed.current.has(tail)) {
      return;
    }

    climbed.current.add(tail);

    fetch({ variables: { nodeIds: [tail] } });
  }, [lineage]);

  /*
   * What is on screen, which lags the route while a lineage is being climbed.
   * `chains` always starts at the taxon its walk began from, so the head of
   * the rendered lineage is by definition the taxon being rendered.
   */
  const focus = chains[0];

  return useMemo(() => {
    return { chains, focus, rooted };
  }, [chains, focus, rooted]);
};

export { useLineage };
