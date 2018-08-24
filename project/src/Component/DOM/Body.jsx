import { pathnameToRoutes } from 'Helper';

const setRoutesAttr = (prefix, pathname) => {
    document.body.dataset[`${prefix}Routes`] = pathnameToRoutes(pathname);
};

export default { setRoutesAttr };
