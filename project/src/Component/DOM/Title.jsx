import { pathnameToRoutes } from 'Helper';

import resources from 'content/resources';

const { routes, siteName } = resources;

const separator = ' | ';

const set = pathname => {
    const views = pathnameToRoutes(pathname);

    document.title = `${siteName}${separator}${views.replace('.', separator) ||
        routes.home.name.toUpperCase()}`;
};

export default { set };
