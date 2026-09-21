import appRoot from 'app-root-path';

import * as dotenv from 'dotenv';

import { Names, PATH } from './Client/constants';

dotenv.config({ path: `${appRoot.path}/.env` });

/**
 * Any env values that serve on this hook are meant for the client side only,
 * Any sensitive values should never expose here
 */

const get = () => {
  const { NODE_ENV } = process.env || {};

  return {
    NODE_ENV,
  };
};

type Env = ReturnType<typeof get>;

export { type Env, Names, PATH };
export default get;
