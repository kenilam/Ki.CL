import { useCallback, useEffect } from 'react';

// API
import {
  useQuery,
  useLazyQuery,
  Kicl_TreeOfLifeSubtreeDocument,
  Kicl_TreeOfLifeSubtreesDocument,
} from 'api/provider';

// Routes
import { useParams } from 'design/router';

// Find
import { find as read } from '@/views/experiments/tree-of-life/find';

// Spec
import type * as Spec from '@/views/experiments/tree-of-life/spec';

const useSubtree = () => {
  const { nodeId } = useParams<Spec.Params>();
  const { data, ...TreeOfLifeSubtree } = useQuery(
    Kicl_TreeOfLifeSubtreeDocument,
    {
      variables: { nodeId },
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
   * accumulating - `TreeOfLifeNode` is keyed on `nodeId`, so a node fetched
   * twice is one entity and new `ancestor`/`descendants` links land on it
   * automatically. A hand-rolled stitch on top of that was measured to change
   * nothing, so the fetch is the lazy query itself.
   */
  const fetch = lazy;

  useEffect(() => {
    if (!nodeId) {
      return;
    }

    fetch({ variables: { nodeIds: [nodeId] } });
  }, [nodeId]);

  /*
   * Look a node up by id, straight out of the cache.
   *
   * `data` is not read here - it and the lazy result are dependencies only
   * because a change in either means the cache moved underneath and anything
   * memoised on this needs recomputing.
   */
  const find = useCallback(
    (id: string) => {
      return read(id);
    },
    [data, TreeOfLifeSubtreeLazy.data]
  );

  return {
    data,
    fetch,
    find,
    lazyData: TreeOfLifeSubtreeLazy.data,
    loading: TreeOfLifeSubtree.loading || TreeOfLifeSubtreeLazy.loading,
  };
};

export { useSubtree };
