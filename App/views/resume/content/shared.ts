import type resume from '@/locales/en/resume.json';

import type { Key, Organisation, Role, SectionId } from './types';

/*
 * What every version says the same way is under `shared` in the resume's
 * namespace. Titles, dates and numbers follow LinkedIn. A line that differs
 * between versions, even slightly, is written out under that version's name.
 */

const NAME = 'Keni Lam';

const EMAIL = 'hello@ki-cl.com';

/*
 * Under the name, in this order. Each link is written once, under
 * `shared.links`, and the lines that carry one refer to it. They are
 * absolute, the site's own pages included: a PDF printed from a local run
 * would otherwise carry links to localhost.
 */
const PROFILES: readonly Key[] = [
  'shared.links.linkedin',
  'shared.links.github',
  'shared.links.experiments',
];

const ORDER: readonly SectionId[] = [
  'summary',
  'experience',
  'projects',
  'skills',
  'mentoring',
  'education',
  'languages',
];

type RoleId = keyof typeof resume.shared.experience;

/** Two of the roles were at Apple. */
const EMPLOYERS: Record<RoleId, Organisation> = {
  apple: 'apple',
  ebay: 'ebay',
  indeed: 'indeed',
  rakuten: 'rakuten',
  retail: 'apple',
  tesla: 'tesla',
};

/** A role's title, employer and dates, which no version changes. */
const role = (id: RoleId): Omit<Role, 'points'> => ({
  dates: `shared.experience.${id}.dates`,
  organisation: EMPLOYERS[id],
  title: `shared.experience.${id}.title`,
});

const EARLIER: readonly Key[] = [
  'shared.earlier.apple_contract',
  'shared.earlier.apollo',
  'shared.earlier.hasco',
  'shared.earlier.le_ciel_bleu',
];

const EDUCATION: readonly Key[] = [
  'shared.education.ma',
  'shared.education.ba',
  'shared.education.foundation',
];

export { EARLIER, EDUCATION, EMAIL, NAME, ORDER, PROFILES, role };
