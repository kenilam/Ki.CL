// Spec
import * as Spec from '@/Components/HyperLink/Spec';

const useURLStatus = (to: Spec.Props['to']) => {
  if (typeof to === 'string') {
    const isHash = to.startsWith('#');
    const isSearch = to.startsWith('?');

    try {
      return {
        isExternal: Boolean(new URL(to)),
        isHash,
        isSearch,
      };
    } catch (_) {
      return {
        isExternal: false,
        isHash,
        isSearch,
      };
    }
  }

  if (to.pathname) {
    const isHash = !!to.hash;
    const isSearch = !!to.search;

    try {
      return {
        isExternal: Boolean(new URL(to.pathname)),
        isHash,
        isSearch,
      };
    } catch (_) {
      return {
        isExternal: false,
        isHash,
        isSearch,
      };
    }
  }

  return {
    isExternal: false,
    isHash: false,
    isSearch: false,
  };
};

export default useURLStatus;
