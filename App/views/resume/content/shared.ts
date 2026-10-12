import type resume from '@/locales/en/resume.json';

import type { Key, Role, SectionId } from './types';

/*
 * What every version says the same way is under `shared` in the resume's
 * namespace. Titles, dates and numbers follow LinkedIn. A line that differs
 * between versions, even slightly, is written out under that version's name.
 */

const NAME = 'Keni Lam';

const EMAIL = 'hello@ki-cl.com';

/*
 * Under the name, in this order. Absolute, the site's own pages included: a
 * PDF printed from a local run would otherwise carry links to localhost.
 */
const PROFILES = [
  {
    link: 'linkedin.com/in/kenilam',
    to: 'https://www.linkedin.com/in/kenilam',
  },
  { link: 'github.com/kenilam', to: 'https://github.com/kenilam' },
  { link: 'ki-cl.com/experiments', to: 'https://ki-cl.com/experiments' },
] as const;

const ORDER: readonly SectionId[] = [
  'summary',
  'experience',
  'projects',
  'skills',
  'mentoring',
  'education',
  'languages',
];

/** A role's title, employer and dates, which no version changes. */
const role = (
  id: keyof typeof resume.shared.experience
): Omit<Role, 'points'> => ({
  dates: `shared.experience.${id}.dates`,
  organisation: `shared.experience.${id}.organisation`,
  title: `shared.experience.${id}.title`,
});

const EARLIER: readonly Key[] = [
  'shared.earlier.appleContract',
  'shared.earlier.apollo',
  'shared.earlier.hasco',
  'shared.earlier.leCielBleu',
];

const EDUCATION: readonly Key[] = [
  'shared.education.ma',
  'shared.education.ba',
  'shared.education.foundation',
];

export { EARLIER, EDUCATION, EMAIL, NAME, ORDER, PROFILES, role };
