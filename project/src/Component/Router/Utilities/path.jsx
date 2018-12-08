const base = 'home';

const byIndex = ({ pathname }, routeIndex) => pathname.split('/')[ routeIndex ] || base;

const notationise = ({ pathname }) => pathname.substr(1).replace('/', '.') || base;

export default { byIndex, notationise };
