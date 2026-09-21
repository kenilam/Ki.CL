import appRoot from 'app-root-path';

import * as dotenv from 'dotenv';

import { Names, PATH } from './Client/constants';

dotenv.config({ path: `${appRoot.path}/.env` });

/**
 * Any env values that serve on this hook are meant for the client side only,
 * Any sensitive values should never expose here
 */

const get = () => {
  const { KICL_MUSIC_OPEN_LOFI_URL, KICL_MUSIC_SAMPLES_URL, NODE_ENV } =
    process.env || {};

  return {
    /**
     * Where the Music Visualiser's Open Lo-Fi tracks are served from. Unset,
     * the view uses the static bucket through the same-origin `/assets/static`
     * route, at `music/open-lofi/`.
     */
    KICL_MUSIC_OPEN_LOFI_URL,
    /**
     * Where the Music Visualiser's sampled instruments are served from. Unset,
     * the view uses the static bucket through the same-origin `/assets/static`
     * route; a developer may point it elsewhere to try a sample set before
     * uploading it.
     */
    KICL_MUSIC_SAMPLES_URL,
    NODE_ENV,
  };
};

type Env = ReturnType<typeof get>;

export { type Env, Names, PATH };
export default get;
