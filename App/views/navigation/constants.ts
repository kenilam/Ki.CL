import { PATH as EXPERIMENTS_PATH } from '@/views/experiments/constants';
import { PATH as RESUME_PATH } from '@/views/resume/constants';

const CLASS_NAME = 'kicl--views--navigation';

/** Pages can carry more than one nav, so the site's own is named. */
const LABEL = 'Main';

/** The top routes, in the order every menu lists them. */
const ROUTES = [
  { title: 'Experiments', to: `/${EXPERIMENTS_PATH}` },
  { title: 'Resume', to: `/${RESUME_PATH}` },
] as const;

export { CLASS_NAME, LABEL, ROUTES };
