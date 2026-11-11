// Routes
import { useNavigate } from 'design/router';

// Context
import { useLineageContext } from '@/views/experiments/tree-of-life/lineage-context';

// Constants
import { toPath } from '@/views/experiments/tree-of-life/constants';

/** Closing replaces this entry with the taxon, so Back doesn't reopen it. */
const useClose = () => {
  const navigate = useNavigate();
  const { focus } = useLineageContext();

  return () => {
    navigate(toPath(focus), { replace: true, viewTransition: true });
  };
};

export { useClose };
