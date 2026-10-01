import appRoot from 'app-root-path';

import * as dotenv from 'dotenv';

import { Names, PATH } from './client/constants';

dotenv.config({ path: `${appRoot.path}/.env` });

/**
 * Any env values that serve on this hook are meant for the client side only,
 * Any sensitive values should never expose here
 */

const get = () => {
  const { KICL_ARM_LINK, NODE_ENV, TURNSTILE_SITE_KEY } = process.env || {};

  return {
    // Where the factory-arm floor finds its arms when they are not in workers on the page.
    KICL_ARM_LINK,
    NODE_ENV,
    // Public by design: the widget embeds it in the page.
    TURNSTILE_SITE_KEY,
  };
};

type Env = ReturnType<typeof get>;

export { Names, PATH, get, type Env };
