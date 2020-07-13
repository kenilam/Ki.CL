import isImage from 'is-image';
import { Fetch, Trigger } from '@/Helper/spec';

function fetchImage<T>(url: string): Fetch<T> {
  const img = new Image();

  const cancel = () => {
    delete img.src;
  };

  const trigger: Trigger<T> = () =>
    new Promise((resolve) => {
      img.onload = () => {
        resolve();
      };
      img.src = url;
    });

  return { cancel, trigger };
}

function Fetch<T>(url: string, options?: RequestInit): Fetch<T> {
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
