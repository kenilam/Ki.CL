import { FILE } from '@/views/resume/constants';
import { EXPERIMENTS, PAGES, POSTS, ROUTES, TOPICS } from '@/views/routes';

const INDEXED = [
  PAGES.home,
  ...ROUTES.map(({ to }) => to),
  ...EXPERIMENTS.map(({ to }) => to),
  ...TOPICS.map(({ to }) => to),
  PAGES.blog,
  ...POSTS.map(({ to }) => to),
  PAGES.resume,
  FILE,
];

const PRIVATE = [PAGES.me, `${PAGES.resume}/`];

export { INDEXED, PRIVATE };
