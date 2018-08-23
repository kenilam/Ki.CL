import { pathnameToRoutes } from 'Helper';

const setRoutesAttr = (prefix, pathname) => {
    document.body.dataset[`${prefix}Route`] = pathnameToRoutes(pathname);
};

export default { setRoutesAttr };
