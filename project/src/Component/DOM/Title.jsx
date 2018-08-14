import { hashToRoutes } from 'Helper';

import resources from 'content/resources';

const { routes, siteName } = resources;

const separator = ' | ';

const set = () => {
    const views = hashToRoutes.toUpperCase().split('/');

    document.title = `${siteName}${separator}${views.join(separator) ||
        routes.home.name.toUpperCase()}`;
};

export default { set };
