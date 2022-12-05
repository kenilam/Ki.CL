const getAppPath = (path?: string) => {
  if (!path) {
    return new URL('../', import.meta.url).href;
  }

  const { href } = new URL(`../${path}`, import.meta.url);

  if (href.endsWith('undefined')) {
    return `${window.location.origin}${path}`;
  }

  return href;
};

export default getAppPath;
