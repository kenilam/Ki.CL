// Context
import { useCellContext } from '@/views/experiments/factory-arm/cell-context';
import { useDraftContext } from '@/views/experiments/factory-arm/draft-context';

/** The cell as it stands: the Manual tab's case settings, and the obstacles where they stand now. */
const useCurrent = () => {
  const { cell } = useCellContext();
  const { draft } = useDraftContext();

  return () => {
    return { ...draft, obstacles: cell.current?.obstacles.current ?? [] };
  };
};

export { useCurrent };
