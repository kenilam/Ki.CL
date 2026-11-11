// Context
import { useLineageContext } from '@/views/experiments/tree-of-life/lineage-context';
import { useTaxonContext } from '@/views/experiments/tree-of-life/explorer/scene/taxon/context';

type Variant = 'active' | 'origin';

const useVariant = (): Variant | null => {
  const { isRoot, nodeId } = useTaxonContext();
  const { focus } = useLineageContext();

  // If the focus is the origin, the ripple wins: being here is the more immediate fact.
  if (nodeId === focus) {
    return 'active';
  }

  return isRoot ? 'origin' : null;
};

export { type Variant, useVariant };
