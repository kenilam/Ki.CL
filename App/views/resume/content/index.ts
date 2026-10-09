import type { Version } from './types';

import { ARCHITECTURE } from './architecture';
import { FRONTEND_AI } from './frontend-ai';
import { MANAGER } from './manager';
import { MASTER } from './master';
import { REACT_NATIVE } from './react-native';

/** The master first: it is the one at `/resume`. */
const VERSIONS: readonly Version[] = [
  MASTER,
  MANAGER,
  FRONTEND_AI,
  REACT_NATIVE,
  ARCHITECTURE,
];

/** The version a URL segment names, the master when there is none. */
const findVersion = (slug: string = MASTER.slug): Version | undefined =>
  VERSIONS.find((version) => version.slug === slug);

export type { Line, Role, Run, SectionId, Slug, Version } from './types';
export { EMAIL, LOCATION, NAME, PROFILES } from './shared';
export { fingerprint } from './fingerprint';
export { MASTER, VERSIONS, findVersion };
