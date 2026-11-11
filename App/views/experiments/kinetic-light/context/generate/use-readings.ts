// API
import {
  Kicl_KineticLightReadingUpdatedDocument,
  Kicl_KineticLightReadingsDocument,
  useQuery,
  useSubscription,
} from 'api/provider';

function useReadings() {
  const { data } = useQuery(Kicl_KineticLightReadingsDocument, {
    fetchPolicy: 'cache-and-network',
  });
  const running = data?.kineticLightReadings.find(
    ({ status }) => status === 'READING'
  );

  useSubscription(Kicl_KineticLightReadingUpdatedDocument, { skip: !running });

  return { running };
}

export { useReadings };
