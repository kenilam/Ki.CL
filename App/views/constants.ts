// Paths
import { toPath as toThreadPath } from '@/views/experiments/image-agent/constants';
import { toPath as toSongPath } from '@/views/experiments/kinetic-light/constants';
import { toPath as toPlatePath } from '@/views/experiments/tree-of-life/explorer/details/constants';
import { PAGE_PATH as PASSWORD_PATH } from '@/views/me/password/constants';

/** The `main` landmark's id: the skip link targets it and route changes focus it. */
export const MAIN_ID = 'main';

export const RECORD_PATHS: Record<string, (documentId: string) => string> = {
  image_agent_threads: toThreadPath,
  kinetic_light_readings: toSongPath,
  password_changes: () => PASSWORD_PATH,
  tree_of_life: toPlatePath,
};
