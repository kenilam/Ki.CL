const ORIGIN = 'https://ki-cl.com';

const PATHS = ['/llms.txt', '/robots.txt', '/sitemap.xml'] as const;

type Path = (typeof PATHS)[number];

const isPath = (path: string): path is Path => {
  return PATHS.some((each) => each === path);
};

export { ORIGIN, PATHS, isPath, type Path };
