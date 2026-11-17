import { ORIGIN } from './constants';
import { INDEXED } from './pages';

const sitemap = () => {
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...INDEXED.map((path) => `  <url><loc>${ORIGIN}${path}</loc></url>`),
    '</urlset>',
    '',
  ].join('\n');
};

export { sitemap };
