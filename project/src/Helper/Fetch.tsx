import isImage from 'is-image';
import Spec from './spec';

function fetchImage<T>(url: string): Spec.Fetch<T> {
  const img = new Image();

  const cancel = () => {
    delete img.src;
  };

  const trigger: Spec.Trigger<T> = () =>
    new Promise((resolve) => {
      img.onload = () => {
        resolve();
      };
      img.src = url;
    });

  return { cancel, trigger };
}

function Fetch<T>(url: string, options?: RequestInit): Spec.Fetch<T> {
  if (isImage(url)) {
    return fetchImage(url);
  }

  const controller = new AbortController();

  const signal = controller.signal;

  const cancel = () => {
    controller.abort();
  };

  const trigger = () =>
    window
      .fetch(url, {
        ...options,
        headers: { 'Content-type': 'application/json' },
        method: options ? options.method : 'GET',
        signal,
      })
      .then((response) => response.json())
      .catch((errors) => errors);

  return { cancel, trigger };
}

export default Fetch;
