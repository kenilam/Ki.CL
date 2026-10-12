import type { Key, Resolved, Version } from './types';

/**
 * A version with each key replaced by its text. The page reads the text from
 * i18next and the export reads it from the JSON file, so the two can be
 * compared.
 */
const resolve = (version: Version, text: (key: Key) => string): Resolved => ({
  earlier: version.earlier.map(text),
  education: version.education.map(text),
  experience: version.experience.map((role) => ({
    dates: text(role.dates),
    organisation: text(role.organisation),
    points: role.points.map(text),
    title: text(role.title),
  })),
  headline: text(version.headline),
  languages: text(version.languages),
  mentoring: text(version.mentoring),
  name: text(version.name),
  order: version.order,
  projects: {
    intro: version.projects.intro && text(version.projects.intro),
    items: version.projects.items?.map(text),
  },
  skills: version.skills.map(text),
  slug: version.slug,
  summary: text(version.summary),
});

export { resolve };
