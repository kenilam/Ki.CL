import { view } from 'content/resources';

const basePath = view.home.name.toLowerCase();

const notationise = (path, routeIndex) => path
  .replace('#', '')
  .substr(1)
  .replace(/\//g, '.')
  .split('.')
  .splice(0, routeIndex || path.length).join('.')
|| basePath;

export default { notationise };
