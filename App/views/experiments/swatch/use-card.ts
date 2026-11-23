// API
import { Kicl_SwatchDocument, skipToken, useQuery } from 'api/client';

// Routes
import { useParams } from 'design/router';

// Constants
import { PARAM } from '@/views/experiments/swatch/constants';

const useCard = () => {
  const { [PARAM]: id } = useParams();
  const { data } = useQuery(
    Kicl_SwatchDocument,
    id ? { fetchPolicy: 'cache-first', variables: { id } } : skipToken
  );

  return data?.swatch;
};

export { useCard };
