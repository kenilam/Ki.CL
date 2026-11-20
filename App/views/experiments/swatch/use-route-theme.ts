// Routes
import { useParams } from 'design/router';

// Hooks
import { useTheme } from './use-theme';

// Constants
import { PARAM } from './constants';

const useRouteTheme = () => {
  const { [PARAM]: id } = useParams();

  return useTheme(id ?? null);
};

export { useRouteTheme };
