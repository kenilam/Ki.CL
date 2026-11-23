import { useEffect } from 'react';

// API
import {
  Kicl_SwatchAllowanceDocument,
  Kicl_SwatchListDocument,
  useApolloClient,
} from 'api/client';

// Constants
import { MAKER } from '@/views/experiments/swatch/constants';

const useRefresh = () => {
  const client = useApolloClient();

  useEffect(() => {
    const sheet = document.getElementById(MAKER);

    if (!sheet) {
      return;
    }

    const toggle = (event: Event) => {
      if ((event as ToggleEvent).newState !== 'open') {
        return;
      }

      void client.refetchQueries({
        include: [Kicl_SwatchAllowanceDocument, Kicl_SwatchListDocument],
      });
    };

    sheet.addEventListener('toggle', toggle);

    return () => {
      sheet.removeEventListener('toggle', toggle);
    };
  }, [client]);
};

export { useRefresh };
