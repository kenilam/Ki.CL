import helmet from 'helmet';

import { Uuid } from '!/Utilities';

const security = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: [
        `'self'`,
      ],
      styleSrc: [`'self'`,
        `'unsafe-inline'`,
        `*.googleapis.com`
      ],
      scriptSrc: [
        `'nonce-${Uuid.nonce}'`,
        `'unsafe-eval'`,
        `'unsafe-inline'`,
        `*.google-analytics.com`,
        `'strict-dynamic'`
      ],
      fontSrc: [
        `'self'`,
        `data:`,
        `*.gstatic.com`
      ],
      imgSrc: [
        `'self'`,
        '*.google-analytics.com',
        `data:`,
        `blob:`
      ],
      connectSrc: [
        'https://*.g.doubleclick.net',
        '*.google-analytics.com',
        'ws://localhost:*',
        'http://localhost:*',
        `data:`,
        'blob:',
      ],
      objectSrc: [`'none'`],
      baseUri: [`'self'`],
    }
  },
});

export default security;
