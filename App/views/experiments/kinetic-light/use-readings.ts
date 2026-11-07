// API
import { Kicl_KineticLightReadingsDocument, useQuery } from 'api/provider';

function useReadings() {
  const { data } = useQuery(Kicl_KineticLightReadingsDocument, {
    fetchPolicy: 'cache-and-network',
  });
  const readings = data?.kineticLightReadings ?? [];

  return {
    finished: readings.some(({ status }) => status !== 'READING'),
    readings,
    running: readings.find(({ status }) => status === 'READING'),
  };
}

export { useReadings };
