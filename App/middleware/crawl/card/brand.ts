import { readFileSync } from 'node:fs';

import { createElement } from 'react';

import { ORIGIN } from '@/middleware/crawl/constants';

const LOGO = `data:image/svg+xml;base64,${readFileSync(
  new URL('./logo.svg', import.meta.url)
).toString('base64')}`;

const LOGO_HEIGHT = 48;

const brand = () => {
  return createElement(
    'div',
    {
      style: {
        alignItems: 'center',
        display: 'flex',
        fontSize: 28,
        fontWeight: 500,
        justifyContent: 'space-between',
      },
    },
    createElement('img', {
      height: LOGO_HEIGHT,
      src: LOGO,
      width: (LOGO_HEIGHT * 385) / 160,
    }),
    new URL(ORIGIN).host
  );
};

export { brand };
