import type { Key } from '@/views/about/resume/content';

const UAL =
  'https://upload.wikimedia.org/wikipedia/commons/a/ab/University_of_the_Arts_London_Logo.svg';

const BRIGHTON =
  'https://upload.wikimedia.org/wikipedia/commons/9/91/University_of_Brighton_logo.svg';

/** Each school's logo, from Wikimedia Commons, where both are public domain. */
const LOGOS: Partial<Record<Key, string>> = {
  'education.ba': BRIGHTON,
  'education.foundation': UAL,
  'education.ma': UAL,
};

export { LOGOS };
