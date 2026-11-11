import { useEffect } from 'react';

// Hooks
import { useTranslation } from 'design/hooks';

// Context
import { useLineageContext } from '@/views/experiments/tree-of-life/lineage-context';

// Anchors
import { setAnchor } from '@/views/experiments/tree-of-life/explorer/scene/anchors';

// Labels
import {
  removeLabel,
  setLabel,
} from '@/views/experiments/tree-of-life/explorer/label-store';

// Tree
import type { TaxonNode } from '@/views/experiments/tree-of-life/spec';
import {
  labelWithRank,
  type TreeNode,
} from '@/views/experiments/tree-of-life/tree';

// Shape
import type { useShape } from './use-shape';

type Props = Pick<ReturnType<typeof useShape>, 'color' | 'isRoot' | 'tip'> & {
  nodeId: string;
  radius: number;
  taxon: TaxonNode;
};

/**
 * Publishes the taxon's name for the label layer and its tip for the camera.
 * Only the taxon knows where its tip ended up, so it has to be the one to say.
 */
const usePublish = ({ color, isRoot, nodeId, radius, taxon, tip }: Props) => {
  const { t } = useTranslation('tree-of-life');
  const { chains, focus } = useLineageContext();

  // The routed taxon outranks the origin, which outranks the lineage, then a fan.
  useEffect(() => {
    const text = labelWithRank(
      taxon as TreeNode,
      isRoot ? t('origin') : undefined
    );

    if (!text) {
      return undefined;
    }

    const priority = (() => {
      if (nodeId === focus) {
        return 4;
      }

      if (isRoot) {
        return 3;
      }

      return chains.includes(nodeId) ? 2 : 1;
    })();

    setLabel(nodeId, {
      text,
      position: tip.toArray(),
      priority,
      radius,
      // Only the routed taxon carries an accent, so it means one thing.
      accent: nodeId === focus ? color : undefined,
    });

    return undefined;
  }, [taxon, isRoot, nodeId, focus, chains, tip, radius, color, t]);

  /*
   * Removal is keyed to the taxon alone. Priority and accent move with the
   * route, so a combined effect would rebuild the pill on every navigation.
   */
  useEffect(() => () => removeLabel(nodeId), [nodeId]);

  useEffect(() => setAnchor(nodeId, tip.toArray()), [nodeId, tip]);
};

export { usePublish };
