import appRoot from 'app-root-path';

import * as dotenv from 'dotenv';

import { Names, PATH } from './client/constants';

dotenv.config({ path: `${appRoot.path}/.env` });

/**
 * Any env values that serve on this hook are meant for the client side only,
 * Any sensitive values should never expose here
 */

const get = () => {
  const { NODE_ENV, TURNSTILE_SITE_KEY } = process.env || {};

  return {
    NODE_ENV,
    // Public by design: the widget embeds it in the page.
    TURNSTILE_SITE_KEY,
  };
};

type Env = ReturnType<typeof get>;

export { Names, PATH, get, type Env };
