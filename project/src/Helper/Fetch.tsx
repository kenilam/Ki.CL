import isImage from 'is-image';
import IHelper from './spec';

function fetchImage(url: string) {
  const img = new Image();
  
  const cancel = () => {
    img.src = '';
  };
  
  const promise = new Promise(
    resolve => {
      img.onload = () => {
        resolve(img);
      };
      img.src = url;
    }
  );
  
  return {cancel, promise};
}

const Fetch: IHelper.Fetch = (url, options) => {
  if (isImage(url)) {
    return fetchImage(url);
  }
  
  const controller = new AbortController();
  const signal = controller.signal;
  const cancel = () => {
    controller.abort();
  };
  const promise = window.fetch(url,
    {
      headers: {'Content-type': 'application/json'},
      method: options ? options.method : 'GET',
      ...options,
      signal
    }
  )
  .then(response => response.json())
  .catch(errors => errors);
  
  return {cancel, promise}
};

export default Fetch;
