import { hashToRoutes } from 'Helper';

const setRoutesAttr = () => {
    document.body.dataset.routes = hashToRoutes;
};

export default { setRoutesAttr };
