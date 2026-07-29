import Status204 from './Status204';
import Status404 from './Status404';
import Status500 from './Status500';

// Styles
import './Styles.scss';

const HttpStatus = {
  204: Status204,
  404: Status404,
  500: Status500,
} as const;

export { Status204, Status404, Status500 };
export default HttpStatus;
