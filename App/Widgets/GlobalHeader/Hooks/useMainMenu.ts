// Router
import { useLocation } from '@/Router';

// Constants
import { TICK } from '@/Core/Constants';

const PARAMS = 'MainMenu';

const DEFAULT: ReturnType<typeof useMainMenu> = {
  deleteParams() {
    return false;
  },
  location: {
    hash: '',
    key: '',
    pathname: window.location.pathname,
    search: window.location.search,
    state: undefined,
  },
  open: new URLSearchParams(window.location.search).get(PARAMS) === TICK,
  search: new URLSearchParams(window.location.search),
  setParams() {
    return false;
  },
};

const useMainMenu = () => {
  const location = useLocation();

  const search = new URLSearchParams(location.search);

  const open = search.get(PARAMS) === TICK;

  const setParams = () => {
    search.set(PARAMS, TICK);
  };

  const deleteParams = () => {
    search.delete(PARAMS);
  };

  return {
    deleteParams,
    location,
    open,
    search,
    setParams,
  };
};

export { DEFAULT, PARAMS };
export default useMainMenu;
