import React, {
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

// API
import {
  useQuery,
  useLazyQuery,
  Kicl_TreeOfLifeSubtreeDocument,
  Kicl_TreeOfLifeSubtreesDocument,
} from 'api/provider';

// Routes
import { useParams } from '@/Router';

// Chain
import walkChain, { type Chain } from './chain';

// Find
import read from './find';

// Spec
import * as Spec from './Spec';

const DEFAULT: Spec.Context = {
  params: {},
  data: undefined,
  loading: false,
  error: undefined,
  find: () => null,
  chains: [],
  focus: undefined,
  rooted: false,
  animate: true,
  setAnimate: () => {},
};

const Context = React.createContext<Spec.Context>(DEFAULT);

/**
 * Mounted by the `tree-of-life` route itself, so it sits above every node
 * route: navigating from one node to another changes the value but does not
 * remount the provider, and the Apollo cache it reads through outlives the
 * move.
 */
const TreeOfLifeProvider: React.FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const params = useParams<Spec.Params>();

  /*
   * On by default. Growth leaving the focused taxon and travelling outward is
   * the thing this view is about, and it was turned off back when the control
   * did nothing visible — the tree arrived on its own schedule whatever the
   * setting said. Now that it plays out a level at a time, arriving to it is
   * the point rather than something to wait through, and the control is there
   * to land the tree at once when that is what you want.
   */
  const [animate, setAnimate] = useState(true);

  const { data, ...TreeOfLifeSubtree } = useQuery(
    Kicl_TreeOfLifeSubtreeDocument,
    {
      variables: { nodeId: params.nodeId },
      fetchPolicy: 'cache-first',
    }
  );

  const [lazy, TreeOfLifeSubtreeLazy] = useLazyQuery(
    Kicl_TreeOfLifeSubtreesDocument,
    {
      fetchPolicy: 'cache-first',
    }
  );

  /*
   * Apollo's normalised cache already merges each response into the tree it is
   * accumulating — `TreeOfLifeNode` is keyed on `nodeId`, so a node fetched
   * twice is one entity and new `ancestor`/`descendants` links land on it
   * automatically. A hand-rolled stitch on top of that was measured to change
   * nothing, so the fetch is the lazy query itself.
   */
  const fetch = lazy;

  useEffect(() => {
    if (!params.nodeId) {
      return;
    }

    fetch({ variables: { nodeIds: [params.nodeId] } });
  }, [params.nodeId]);

  /*
   * Look a node up by id, straight out of the cache.
   *
   * `data` is not read here — it and the lazy result are dependencies only
   * because a change in either means the cache moved underneath and anything
   * memoised on this needs recomputing.
   */
  const find = useCallback(
    (nodeId: string) => read(nodeId),
    [data, TreeOfLifeSubtreeLazy.data]
  );

  /*
   * The focused node's lineage, walked rootward until the origin of life.
   *
   * Read from the cache rather than from `data`: one response nests
   * `ancestor` only as deep as codegen fixed it, so a deep lineage would stop
   * a dozen hops short and quietly look finished. The cache accumulates the
   * links from every response, so the walk can cross the seam between them.
   */
  const lineage = useMemo(
    () => walkChain(params.nodeId),
    // `data` and the lazy result are not read here — they are what tells us
    // the cache has changed underneath and the walk is worth redoing.
    [params.nodeId, data, TreeOfLifeSubtreeLazy.data]
  );

  /*
   * The last lineage that actually reached the root, kept so the canvas has
   * something to draw while a new one is being climbed.
   *
   * Navigating to a taxon outside the cached clade leaves the walk with just
   * the new id and `complete: false`, which unmounts the entire tree for as
   * long as the climb takes — measured at ~5s and 260 blank frames. Holding
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
   * What is on screen, which lags the route while a lineage is being climbed.
   * `chains` always starts at the taxon its walk began from, so the head of
   * the rendered lineage is by definition the taxon being rendered.
   */
  const focus = chains[0];

  /*
   * When the walk runs out of cache before reaching the root, fetch whatever
   * sits above the node it stopped at. That response carries its own dozen
   * ancestors, so each pass climbs another stretch and the next walk gets
   * further — repeating until the chain lands on the root.
   *
   * `climbed` stops a tail being asked for twice: if a fetch fails to extend
   * the chain, the effect would otherwise re-run on the same tail forever.
   *
   * Driven by the live walk, never by `chains`. `chains` holds the previous
   * lineage while a new one is being climbed — climbing from its tail would
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

  // Validation aid — remove once the shape is confirmed.
  console.info('TreeOfLifeSubtree', params.nodeId, data?.TreeOfLifeSubtree);

  const error = TreeOfLifeSubtree.error || TreeOfLifeSubtreeLazy.error;

  const loading = TreeOfLifeSubtree.loading || TreeOfLifeSubtreeLazy.loading;

  const value = {
    params,
    data,
    loading,
    error,
    fetch,
    find,
    chains,
    focus,
    rooted,
    animate,
    setAnimate,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

const useTreeOfLifeContext = () => {
  const Contexts = useContext(Context);

  return Contexts;
};

export { useTreeOfLifeContext };
export default TreeOfLifeProvider;
