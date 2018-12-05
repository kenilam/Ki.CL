import { pathnameToRoutes } from 'Helper';

import resources from 'content/resources';

const { routes, siteName } = resources;

const separator = ' | ';

function set(pathname) {
  const views = pathnameToRoutes(pathname).replace('.', separator);
  const home = routes.home.name.toUpperCase();

  document.title = `${siteName}${separator}${views || home}`;
}

export default { set };
