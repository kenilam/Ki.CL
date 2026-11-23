// API
import { Kicl_SwatchDocument, skipToken, useQuery } from 'api/client';

// Context
import { useMaker } from '@/views/experiments/swatch/maker/context';

// The swatch being made from the picture: undefined before an upload, null while its color is found.
const useFound = () => {
  const { busy, pending } = useMaker();
  const { data } = useQuery(
    Kicl_SwatchDocument,
    pending
      ? { fetchPolicy: 'cache-first', variables: { id: pending } }
      : skipToken
  );
  const swatch = data?.swatch;

  if (!busy || swatch?.failure) {
    return undefined;
  }

  return swatch?.hex && swatch.name
    ? { hex: swatch.hex, name: swatch.name }
    : null;
};

export { useFound };
