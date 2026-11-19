import { createElement } from 'react';

import type { Preview } from '@/middleware/crawl/previews';

const words = ({ description, section, title }: Preview) => {
  return createElement(
    'div',
    { style: { display: 'flex', flexDirection: 'column', gap: 24 } },
    createElement(
      'div',
      {
        style: {
          fontSize: 28,
          fontWeight: 500,
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
        },
      },
      section
    ),
    createElement(
      'div',
      {
        style: {
          display: 'block',
          fontFamily: 'Barlow Semi Condensed',
          fontSize: 88,
          fontWeight: 700,
          letterSpacing: '-0.01em',
          lineClamp: 2,
          lineHeight: 1,
        },
      },
      title
    ),
    createElement(
      'div',
      {
        style: {
          color: 'rgba(0, 0, 0, 0.64)',
          display: 'block',
          fontSize: 34,
          lineClamp: 3,
          lineHeight: 1.35,
        },
      },
      description
    )
  );
};

export { words };
