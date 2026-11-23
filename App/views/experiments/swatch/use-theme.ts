// API
import { Kicl_SwatchDocument, skipToken, useQuery } from 'api/client';

// Helpers
import { isLight } from './color';

const useTheme = (id: string | null) => {
  const { data } = useQuery(
    Kicl_SwatchDocument,
    id ? { fetchPolicy: 'cache-first', variables: { id } } : skipToken
  );
  const hex = data?.swatch?.hex;

  return hex && isLight(hex) ? 'kicl--theme--light' : 'kicl--theme--dark';
};

export { useTheme };
