import { view } from 'content/resources';

const { URLSearchParams } = window;

const basePath = view.home.name.toLowerCase();

const notationise = (path, routeIndex) =>
  path
    .replace('#', '')
    .substr(1)
    .replace(/\//g, '.')
    .split('.')
    .splice(0, routeIndex || path.length)
    .join('.') || basePath;

const query = (location, query) => {
  query = {};

  Array.from(new URLSearchParams(location.search).entries()).forEach(
    ([key, value]) => {
      query[key] = value;
    }
  );

  return query;
};

export default { notationise, query };
