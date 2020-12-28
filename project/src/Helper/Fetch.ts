import { IsImage } from '@/Helper';
import * as Spec from '@/Helper/spec';

const fetchImage: Spec.FetchImage = (prop) => {
  const img = new Image();

  const cancel = () => {
    img.src = '';
  };

  const trigger: Spec.Trigger = () => (
    new Promise((resolve) => {
      if (!prop?.url) {
        return Promise.resolve();
      }

      img.onload = () => {
        resolve({ src: img.src } as unknown as Response);
      };

      img.src = prop.url;
    })
  );

  img.src = '';

  return { cancel, trigger };
}

const Fetch: Spec.Fetch = (url, options) => {
  if (IsImage({ path: url })) {
    return fetchImage({ url });
  }

  const controller = new AbortController();

  const signal = controller.signal;

  const cancel: Spec.Cancel = () => {
    controller.abort();
  };

  const trigger: Spec.Trigger = async () => {
    if (!url) {
      return Promise.resolve();
    }

    const result = await (
      window
        .fetch(url, {
          ...options,
          headers: { 'Content-type': 'application/json' },
          method: options ? options.method : 'GET',
          signal,
        })
        .then((response) => response.json())
        .catch((errors) => errors)
    );

    return result;
  }

  return { cancel, trigger };
}

export default Fetch;
