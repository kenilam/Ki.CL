// Constants
import { EXPERIMENTS } from '@/views/routes';

/** Newest first; the number shown keeps the order they were made in. */
const SCREENS = EXPERIMENTS.map((experiment, index) => {
  return { experiment, number: index + 1 };
}).reverse();

export { SCREENS };
