import { view } from 'content/resources';

const basePath = view.home.name.toLowerCase();

const notationise = (path, routeIndex) => 
  path
    .substr(1)
    .replace(/\//g, '.')
    .split('.')
    .splice(0, routeIndex || 0).join('.')
  || basePath;

export default { notationise };
