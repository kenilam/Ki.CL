import { useCallback } from 'react';

// API
import { Kicl_SwatchListDocument, useQuery } from 'api/client';

// Routes
import { useNavigate, useParams } from 'design/router';

// Helpers
import { nearestOf } from './nearest';

// Constants
import { PARAM, toPath } from '@/views/experiments/swatch/constants';

const useNearest = () => {
  const navigate = useNavigate();
  const { [PARAM]: current } = useParams();
  const { data } = useQuery(Kicl_SwatchListDocument);

  return useCallback(
    (hex: string) => {
      const nearest = nearestOf(data?.swatchList ?? [], hex);

      if (!nearest || nearest.id === current) {
        return;
      }

      navigate(toPath(nearest.id), { replace: true });
    },
    [current, data, navigate]
  );
};

export { useNearest };
