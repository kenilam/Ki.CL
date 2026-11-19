import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';

import { Resvg } from '@resvg/resvg-js';
import satori from 'satori';

import { CARD, CARD_PATH } from '@/middleware/crawl/constants';
import { preview } from '@/middleware/crawl/previews';

import { layout } from './layout';

const require = createRequire(import.meta.url);

const font = (name: string, file: string, weight: 400 | 500 | 700) => ({
  data: readFileSync(require.resolve(`@fontsource/${file}`)),
  name,
  style: 'normal' as const,
  weight,
});

/* Satori reads WOFF, not the WOFF2 the site serves. */
const FONTS = [
  font('Barlow', 'barlow/files/barlow-latin-400-normal.woff', 400),
  font('Barlow', 'barlow/files/barlow-latin-500-normal.woff', 500),
  font(
    'Barlow Semi Condensed',
    'barlow-semi-condensed/files/barlow-semi-condensed-latin-700-normal.woff',
    700
  ),
];

/** The page's card as PNG, or null when `path` names no page's card. */
const card = async (path: string) => {
  const [, to = '/'] = CARD_PATH.exec(path) ?? [];
  const page = preview(to);

  if (!CARD_PATH.test(path) || page.to !== to) {
    return null;
  }

  const svg = await satori(layout(page), { ...CARD, fonts: FONTS });

  return new Resvg(svg).render().asPng();
};

export { card };
