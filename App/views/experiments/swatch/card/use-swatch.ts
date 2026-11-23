// API
import {
  Kicl_SwatchAllowanceDocument,
  Kicl_SwatchDocument,
  Kicl_SwatchListDocument,
  Kicl_SwatchUpdatedDocument,
  skipToken,
  useQuery,
  useSubscription,
} from 'api/client';

// Routes
import { useParams } from 'design/router';

// Constants
import { PARAM } from '@/views/experiments/swatch/constants';

const useSwatch = () => {
  const { [PARAM]: id } = useParams();
  const { data, loading } = useQuery(
    Kicl_SwatchDocument,
    id ? { variables: { id } } : skipToken
  );
  const making = data?.swatch?.status === 'MAKING';

  useSubscription(Kicl_SwatchUpdatedDocument, {
    onData: ({ client, data: { data: pushed } }) => {
      if (pushed?.swatchUpdated?.status !== 'READY') {
        return;
      }

      void client.refetchQueries({
        include: [Kicl_SwatchAllowanceDocument, Kicl_SwatchListDocument],
      });
    },
    skip: !id || !making,
    variables: { id: id ?? '' },
  });

  return { id: id ?? null, loading, missing: !loading && !data?.swatch };
};

export { useSwatch };
