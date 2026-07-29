import type React from 'react';

import type { Kicl_TreeOfLifeSubtreeQuery } from 'api/provider';
import type { useQuery } from '@apollo/client/react';

/**
 * The subtree query's result, as Apollo types it.
 *
 * Indexed off `useQuery.Result` rather than restated: Apollo Client 4 infers
 * everything from the `TypedDocumentNode` handed to the hook, and it removed
 * `ApolloError` outright, so naming the error type here would be inventing a
 * name the library no longer has.
 */
type SubtreeResult = useQuery.Result<Kicl_TreeOfLifeSubtreeQuery>;

/** Route params for the node route — mirrors `PARAM` in `./constants`. */
export type Params = {
  nodeId: string;
};

/**
 * One node as it sits in the loaded subtree, described structurally.
 *
 * The generated result types nest a *different* type at every level, so a
 * recursive walk cannot be written against them. This is the shape the whole
 * tree shares, which is what `find` traverses and hands back.
 */
export type TaxonNode = {
  nodeId: string;
  name?: string | null;
  rank?: string | null;
  numTips?: number | null;
  ancestor?: TaxonNode | null;
  descendants?: readonly (TaxonNode | null)[] | null;
};

/**
 * Value the provider supplies: the route params as they are, plus the subtree
 * query for whichever node they name.
 *
 * The query members are indexed off Apollo's own result type rather than
 * restated, so regenerating `@mf-types/api` after a schema change carries
 * through here instead of drifting.
 */
export type Context = {
  /** `useParams` makes every key optional — a param exists once it matches. */
  params: Readonly<Partial<Params>>;
  data: SubtreeResult['data'];
  loading: SubtreeResult['loading'];
  error: SubtreeResult['error'];
  /**
   * Look a node up by id in whatever subtree is currently loaded. Consumers
   * hold ids rather than node objects, so nothing can render from a copy that
   * has fallen behind the cache.
   */
  find: (nodeId: string) => TaxonNode | null;
  /**
   * The focused node's lineage, rootward:
   * `[nodeId, ancestor, …, root]`. Empty until a subtree has loaded.
   *
   * Held at the last lineage that actually reached the root. Navigating to a
   * taxon outside the cached clade takes several round trips to climb, and the
   * walk reports only what the cache can currently reach — so following it live
   * would empty the canvas for the whole climb. Staying on the previous lineage
   * keeps the tree on screen until the new one can replace it whole.
   */
  chains: string[];
  /**
   * The taxon the rendered lineage belongs to — `chains[0]`.
   *
   * Not the same as `params.nodeId` while a new lineage is being climbed: the
   * route has already moved, but what is on screen has not. Anything that marks
   * or frames the current taxon wants this, or it will point at a node that is
   * not drawn yet.
   */
  focus: string | undefined;
  /**
   * Whether `chains` actually reaches the origin of life.
   *
   * The lineage is climbed over several fetches, so until this is true the
   * last entry is only as far as the cache got — not the root. Anything that
   * anchors on the root has to wait for it, or it will anchor on whichever
   * ancestor happened to be the end of the chain at the time and have to
   * start over when the next hop lands.
   */
  rooted: boolean;
  /**
   * Whether transitions play out or land immediately.
   *
   * Held centrally rather than passed down: the lineage unfurls through
   * dozens of independently-sprung taxa, and they have to agree — a tree half
   * of which is animating and half of which has jumped is worse than either.
   */
  animate: boolean;
  setAnimate: React.Dispatch<React.SetStateAction<boolean>>;
};
