import { useEffect } from 'react';

// API
import { Kicl_SwatchListDocument, useQuery } from 'api/provider';

// Constants
import { MAKER } from '@/views/experiments/swatch/constants';

const useRefresh = () => {
  const { refetch } = useQuery(Kicl_SwatchListDocument);

  useEffect(() => {
    const sheet = document.getElementById(MAKER);

    if (!sheet) {
      return;
    }

    const toggle = (event: Event) => {
      if ((event as ToggleEvent).newState === 'open') {
        void refetch();
      }
    };

    sheet.addEventListener('toggle', toggle);

    return () => {
      sheet.removeEventListener('toggle', toggle);
    };
  }, [refetch]);
};

export { useRefresh };
