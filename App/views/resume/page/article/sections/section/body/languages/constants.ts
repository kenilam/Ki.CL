/**
 * Each language in its own name and script, the same in every locale: a
 * reader sees the name a speaker of it would use.
 */
const LANGUAGES = [
  { context: 'english', lang: 'en', name: 'English' },
  { context: 'cantonese', lang: 'yue-Hant', name: '廣東話' },
  { context: 'mandarin', lang: 'cmn-Hant', name: '普通話' },
  { context: 'japanese', lang: 'ja', name: '日本語' },
] as const;

type Language = (typeof LANGUAGES)[number];

export { LANGUAGES, type Language };
