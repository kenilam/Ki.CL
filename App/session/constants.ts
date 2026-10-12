/** Must match `TURNSTILE_ACTION` in the API's ExchangeToken resolver. */
const ACTION = 'exchange-token';

/** The API reads the token from this header, not from the GraphQL variables. */
const TOKEN_HEADER = 'x-turnstile-token';

const SCRIPT_SRC =
  'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';

/** A fresh token is tried once more after a rejection, then the gate gives up. */
const MAX_REJECTIONS = 2;

export { ACTION, MAX_REJECTIONS, SCRIPT_SRC, TOKEN_HEADER };
