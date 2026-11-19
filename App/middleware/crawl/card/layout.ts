import { createElement } from 'react';

import type { Preview } from '@/middleware/crawl/previews';

import { brand } from './brand';
import { words } from './words';

const layout = (preview: Preview) => {
  return createElement(
    'div',
    {
      style: {
        backgroundColor: '#fff',
        boxSizing: 'border-box',
        color: '#000',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'Barlow',
        height: '100%',
        justifyContent: 'space-between',
        padding: 80,
        width: '100%',
      },
    },
    brand(),
    words(preview)
  );
};

export { layout };
