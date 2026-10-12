import type common from '@/locales/en/common.json';
import type resume from '@/locales/en/resume.json';

/** Every string in a tree of them, by its path: `shared.apple.lead`. */
type Paths<Tree> = {
  [Name in keyof Tree & string]: Tree[Name] extends string
    ? Name
    : `${Name}.${Paths<Tree[Name]>}`;
}[keyof Tree & string];

type Slug =
  'architecture' | 'frontend-ai' | 'manager' | 'master' | 'react-native';

/** A version as an i18next context: `summary_frontend_ai`. */
type Context<Name = Slug> = Name extends `${infer Start}-${infer End}`
  ? `${Start}_${End}`
  : Name;

/**
 * Where a line is written, in `App/locales/en/resume.json`, without the
 * version: `skills.ai` names `skills.ai_master`, `skills.ai_manager` and the
 * rest. A line every version says the same way has no version on its key.
 * The line itself is inline Markdown: bold text and links.
 */
type Key<Path = Paths<typeof resume>> = Path extends `${infer Line}_${Context}`
  ? Line
  : Path;

/**
 * An employer, by the name's context in the common namespace:
 * `organisation_apple`. Names are not the resume's alone.
 */
type Organisation = keyof typeof common extends infer Name
  ? Name extends `organisation_${infer Id}`
    ? Id
    : never
  : never;

type Role<Line = Key, Employer = Organisation> = {
  dates: Line;
  organisation: Employer;
  points: readonly Line[];
  title: Line;
};

type SectionId =
  | 'education'
  | 'experience'
  | 'languages'
  | 'mentoring'
  | 'projects'
  | 'skills'
  | 'summary';

/**
 * One resume. A version is a selection and an order of lines, each named by
 * its key. Every version names its lines the same way, and the text comes
 * from the version's own wording where it has one. `resolve` puts it in.
 */
type Version<Line = Key, Employer = Organisation> = {
  earlier: readonly Line[];
  education: readonly Line[];
  experience: readonly Role<Line, Employer>[];
  headline: Line;
  languages: Line;
  mentoring: Line;
  /** Shown where the versions are listed, and in the PDF's title. */
  name: Line;
  /** Sections, top to bottom. */
  order: readonly SectionId[];
  projects: { intro?: Line; items?: readonly Line[] };
  skills: readonly Line[];
  /** The URL segment, and the suffix of the exported file's name. */
  slug: Slug;
  summary: Line;
};

/** A version with its text in place of the keys. */
type Resolved = Version<string, string>;

export type {
  Context,
  Key,
  Organisation,
  Resolved,
  Role,
  SectionId,
  Slug,
  Version,
};
