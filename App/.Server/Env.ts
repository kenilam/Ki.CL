import * as dotenv from 'dotenv';

import { path as appRoot } from 'app-root-path';

const { error, parsed = {} } = dotenv.config({
  debug: true,
  path: `${appRoot}/.env`,
});

if (error) {
  throw error;
}

/**
 * Env is only mean for Server-side run-time after build is completed on atm,
 * it will break or become undefined on the client-side run-time
 * @summary Usages
 */
const Env = parsed;

export default Env;
