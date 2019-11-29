import isImage from 'is-image';

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

function Fetch(url: string) {
  if (isImage(url)) {
    return fetchImage(url);
  }
  
  const controller = new AbortController();
  const signal = controller.signal;
  const cancel = () => {
    controller.abort();
  };
  const promise = window.fetch(url, {signal})
  .then(response => response.json())
  .catch(() => {
  });
  
  return {cancel, promise}
}

export default Fetch;
