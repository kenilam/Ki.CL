import type resume from '@/locales/en-US/resume.json';

import type { Key, Organisation, Role, SectionId } from './types';

/*
 * In the resume's namespace, a line every version says the same way has a
 * plain key. A line that differs between versions, even slightly, is written
 * out for each one, with the version on the key: `summary_manager`. Titles,
 * dates and numbers follow LinkedIn.
 */

const ORDER: readonly SectionId[] = [
  'summary',
  'experience',
  'projects',
  'skills',
  'mentoring',
  'education',
  'languages',
];

type RoleId = keyof typeof resume.experience;

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
  dates: `experience.${id}.dates`,
  organisation: EMPLOYERS[id],
  title: `experience.${id}.title`,
});

const EARLIER: readonly Key[] = [
  'earlier.apple_contract',
  'earlier.apollo',
  'earlier.hasco',
  'earlier.le_ciel_bleu',
];

const EDUCATION: readonly Key[] = [
  'education.ma',
  'education.ba',
  'education.foundation',
];

export { EARLIER, EDUCATION, ORDER, role };
