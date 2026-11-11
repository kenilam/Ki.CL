// Three
import type { Fiber } from '@/three';

// Routes
import { useNavigate } from 'design/router';

// Context
import { useLineageContext } from '@/views/experiments/tree-of-life/lineage-context';
import { useTaxonContext } from '@/views/experiments/tree-of-life/explorer/scene/taxon/context';

// Constants
import { toPath } from '@/views/experiments/tree-of-life/constants';
import { toPath as toDetailsPath } from '@/views/experiments/tree-of-life/explorer/details-path';

// Labels
import { setHovered } from '@/views/experiments/tree-of-life/explorer/label-store';

/**
 * The body is the only part that takes a pointer: branches are too thin to hit,
 * and the aura ignores it. The focused taxon opens its details instead.
 */
const usePointer = () => {
  const { nodeId } = useTaxonContext();
  const { focus } = useLineageContext();
  const navigate = useNavigate();

  return {
    onClick: (event: Fiber.ThreeEvent<MouseEvent>) => {
      event.stopPropagation();

      if (nodeId === focus) {
        navigate(toDetailsPath(nodeId), { viewTransition: true });

        return;
      }

      navigate(toPath(nodeId));
    },
    onPointerOver: () => {
      document.body.style.cursor = 'pointer';
      setHovered(nodeId);
    },
    onPointerOut: () => {
      document.body.style.cursor = '';
      setHovered(null);
    },
  };
};

export { usePointer };
