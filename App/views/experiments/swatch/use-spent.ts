// API
import { Kicl_SwatchAllowanceDocument, useQuery } from 'api/provider';

const useSpent = () => {
  const { data } = useQuery(Kicl_SwatchAllowanceDocument);

  return data?.swatchAllowance.remaining === 0;
};

export { useSpent };
