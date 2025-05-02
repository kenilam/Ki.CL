import { useLocation } from 'react-router-dom';

import URLPattern from './URLPattern';

type Props = {
  pattern?: string[] | string;
};

const useMatchPattern = (props?: Props) => {
  const location = useLocation();

  if (!props?.pattern) {
    return false;
  }

  if (Array.isArray(props?.pattern)) {
    const urls = props.pattern.map((pattern) => {
      const url = new URLPattern({
        pathname: pattern,
        baseURL: window.location.origin,
      });

      return url;
    });

    const matches = urls.some((url) => {
      const match = url.test(`${window.location.origin}${location.pathname}`);

      return match;
    });

    return matches;
  }

  const url = new URLPattern({
    pathname: props.pattern,
    baseURL: window.location.origin,
  });

  const match = url.test(`${window.location.origin}${location.pathname}`);

  return match;
};

export { type Props };
export default useMatchPattern;
