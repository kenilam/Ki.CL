import { pathnameToRoutes } from 'Helper';

import resources from 'content/resources';

const { home } = resources.routes;
const defaultAttr = home.name.toLowerCase();

function get(prefix) {
  return (document.body.dataset[`${prefix}Routes`] || defaultAttr).split('.');
}

function set(prefix, pathname) {
  document.body.dataset[`${prefix}Routes`] = pathnameToRoutes(pathname);
}

function observe(callback) {
  const { MutationObserver } = window;

  const observer = new MutationObserver(mutations => {
    mutations = mutations.filter(
      mutation => mutation.type === 'attributes' && callback
    );

    if (mutations.length === 0) {
      return;
    }

    callback();
  });

  observer.observe(document.body, {
    attributes: true
  });

  return () => observer.disconnect();
}

const routesAttr = { get, observe, set };

export default { routesAttr };
