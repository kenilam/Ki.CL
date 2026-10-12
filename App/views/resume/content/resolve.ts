import type { Context, Key, Organisation, Resolved, Version } from './types';

/**
 * A version with each key replaced by its text, in the version's own wording
 * where it has one, and each employer by its name. The page reads them from i18next and the export reads them from the
 * JSON files, so the two can be compared.
 */
const resolve = (
  version: Version,
  line: (key: Key, context: Context) => string,
  name: (organisation: Organisation) => string
): Resolved => {
  const context = version.slug.replace('-', '_') as Context;
  const text = (key: Key) => line(key, context);

  return {
    earlier: version.earlier.map(text),
    education: version.education.map(text),
    experience: version.experience.map((role) => ({
      dates: text(role.dates),
      organisation: name(role.organisation),
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
  };
};

export { resolve };
