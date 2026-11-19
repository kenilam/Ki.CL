const ORIGIN = 'https://ki-cl.com';

const PATHS = ['/llms.txt', '/robots.txt', '/sitemap.xml'] as const;

type Path = (typeof PATHS)[number];

const isPath = (path: string): path is Path => {
  return PATHS.some((each) => each === path);
};

/** The size LinkedIn, X and Facebook show without cropping. */
const CARD = { height: 630, width: 1200 };

const CARD_PATH = /^\/og(\/[\w/-]+)?\.png$/;

const toCard = (to: string) => `/og${to === '/' ? '' : to}.png`;

export { CARD, CARD_PATH, ORIGIN, PATHS, isPath, toCard, type Path };
