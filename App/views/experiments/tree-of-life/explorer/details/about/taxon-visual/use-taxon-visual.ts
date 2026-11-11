// Constants
import { ROOT_NODE_ID } from '@/views/experiments/tree-of-life/constants';
import { isTaxonVisualEligible } from './constants';

// Hooks
import { useTaxon } from '@/views/experiments/tree-of-life/explorer/details/use-taxon';
import { useRefresh } from './use-refresh';
import { useRequest } from './use-request';

// Tree
import { labelFor } from '@/views/experiments/tree-of-life/tree';

/** Where the focused taxon's plate stands: drawn, being drawn, or failed. */
const useTaxonVisual = () => {
  const node = useTaxon();
  const eligible = node
    ? isTaxonVisualEligible(node, node.nodeId === ROOT_NODE_ID)
    : false;
  const name = node ? labelFor(node) : '';

  const { awaitingGeneration, debounced, error, loading, visual } = useRequest({
    eligible,
    name,
    node,
  });
  const refreshing = useRefresh({ node, visual });

  const imageUrl = node?.asset?.url ?? null;
  const status = node?.visualStatus ?? visual?.status;
  const failed = Boolean(error) || status === 'ERROR' || status === 'EXHAUSTED';

  const isGenerating =
    !imageUrl &&
    !failed &&
    (!debounced || loading || refreshing || awaitingGeneration || !visual);

  return {
    eligible,
    error: Boolean(error),
    failed,
    imageUrl,
    isGenerating,
    name,
    node,
    status,
  };
};

export { useTaxonVisual };
