import { PATH as EXPERIMENTS_PATH } from '@/views/experiments/constants';
import { PATH as RESUME_PATH } from '@/views/resume/constants';
import { PATH as WORKSHOP_PATH } from '@/views/workshop/constants';

const CLASS_NAME = 'kicl--views--navigation';

/** The top routes, in the order every menu lists them. */
const ROUTES = [
  { key: 'experiments', to: `/${EXPERIMENTS_PATH}` },
  { key: 'workshop', to: `/${WORKSHOP_PATH}` },
  { key: 'resume', to: `/${RESUME_PATH}` },
] as const;

export { CLASS_NAME, ROUTES };
