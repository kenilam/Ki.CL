// Context
import { useSubtreeContext } from '@/views/experiments/tree-of-life/subtree-context';
import { useLineageContext } from '@/views/experiments/tree-of-life/lineage-context';

// Tree
import type { TreeNode } from '@/views/experiments/tree-of-life/tree';

/** The taxon on screen, straight out of the cache. */
const useTaxon = () => {
  const { find } = useSubtreeContext();
  const { focus } = useLineageContext();

  return focus ? (find(focus) as TreeNode | null) : null;
};

export { useTaxon };
