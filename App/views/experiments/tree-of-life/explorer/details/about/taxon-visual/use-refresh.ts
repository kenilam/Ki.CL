import { useEffect, useState } from 'react';

// API
import { useLazyQuery, Kicl_TreeOfLifeSubtreeDocument } from 'api/provider';

// Tree
import type { TreeNode } from '@/views/experiments/tree-of-life/tree';

// Hooks
import type { useRequest } from './use-request';

type Props = Pick<ReturnType<typeof useRequest>, 'visual'> & {
  node: TreeNode | null;
};

/**
 * Fetches the taxon again once its plate settles, so the new fields land in
 * the Apollo cache that the dialog reads.
 */
const useRefresh = ({ node, visual }: Props) => {
  const [refreshing, setRefreshing] = useState(false);

  const [fetchSubtree] = useLazyQuery(Kicl_TreeOfLifeSubtreeDocument, {
    fetchPolicy: 'network-only',
  });

  const settled =
    visual && visual.status !== 'PENDING'
      ? `${visual.status}:${visual.ottId}:${visual.nodeId ?? ''}`
      : null;

  useEffect(() => {
    if (!settled || !visual) {
      return;
    }

    const nodeId = visual.nodeId ?? node?.nodeId;
    const visualOttId = visual.ottId;
    let cancelled = false;

    void (async () => {
      setRefreshing(true);

      try {
        await fetchSubtree({
          variables: visualOttId
            ? { ottId: visualOttId, heightLimit: 1 }
            : { nodeId, heightLimit: 1 },
        });
      } finally {
        if (!cancelled) {
          setRefreshing(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [fetchSubtree, node?.nodeId, settled, visual]);

  return refreshing;
};

export { useRefresh };
