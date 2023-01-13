// Router
import { useLocation, useSearchParams } from '@/Router';

// Constants
import { TICK } from '@/Core/Constants';

const PARAMS = 'MainMenu';

const DEFAULT: ReturnType<typeof useGlobalHeader> = {
  deleteURLSearchParams() {
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
  setURLSearchParams() {
    return false;
  },
  updateURLSearchParams() {
    return false;
  },
};

const useGlobalHeader = () => {
  const location = useLocation();

  const search = new URLSearchParams(location.search);

  const [, setSearch] = useSearchParams(search);

  const open = search.get(PARAMS) === TICK;

  const setURLSearchParams = () => {
    search.set(PARAMS, TICK);
  };

  const deleteURLSearchParams = () => {
    search.delete(PARAMS);
  };

  const updateURLSearchParams = () => {
    setSearch(search);
  };

  return {
    deleteURLSearchParams,
    location,
    open,
    search,
    setURLSearchParams,
    updateURLSearchParams,
  };
};

export { DEFAULT, PARAMS };
export default useGlobalHeader;
