/** Must match `ACTION` in the gateway's `Server/turnstile.ts`. */
const ACTION = 'exchange-token';

/** The gateway reads the token from this header. */
const TOKEN_HEADER = 'x-turnstile-token';

const SESSION_PATH = '/api/session';

const SCRIPT_SRC =
  'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';

/** A fresh token is tried once more after a rejection, then the gate gives up. */
const MAX_REJECTIONS = 2;

export { ACTION, MAX_REJECTIONS, SCRIPT_SRC, SESSION_PATH, TOKEN_HEADER };
