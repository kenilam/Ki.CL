// API
import { Kicl_SwatchListDocument, useQuery } from 'api/client';

// Components
import { useWatch } from 'design/components';

// Routes
import { useParams } from 'design/router';

// Context
import { useMaker } from '@/views/experiments/swatch/maker/context';

// Hooks
import { useExact } from '@/views/experiments/swatch/maker/use-exact';

// Helpers
import { nearestOf } from '@/views/experiments/swatch/maker/make/pick/nearest';

// Constants
import { PARAM } from '@/views/experiments/swatch/constants';

// How the swatch on the page relates to the picked color: the same color, the nearest one, or neither.
const useMatch = () => {
  const { [PARAM]: current } = useParams();
  const { pick } = useMaker();
  const picked = useWatch({ control: pick.control, name: 'hex' });
  const { data } = useQuery(Kicl_SwatchListDocument);
  const exact = useExact();

  if (exact) {
    return 'exact';
  }

  const nearest = nearestOf(data?.swatchList ?? [], picked);

  return nearest?.id === current ? 'closest' : null;
};

export { useMatch };
