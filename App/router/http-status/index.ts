import { Status204 } from './status-204';
import { Status403 } from './status-403';
import { Status404 } from './status-404';
import { Status500 } from './status-500';

const HttpStatus = {
  204: Status204,
  403: Status403,
  404: Status404,
  500: Status500,
} as const;

export { Status204, Status403, Status404, Status500, HttpStatus };
