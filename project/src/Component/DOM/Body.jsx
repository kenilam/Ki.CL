import { hashToRoutes } from 'Helper';

import resources from 'content/resources';

const home = resources.routes.home.name.toLowerCase();

const setRoutesAttr = () => {
    document.body.dataset.routes = hashToRoutes.replace(/\//g, '.') || home;
};

export default { setRoutesAttr };
