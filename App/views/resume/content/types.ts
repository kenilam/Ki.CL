import type resume from '@/locales/en/resume.json';

/** Every string in a tree of them, by its path: `shared.apple.lead`. */
type Paths<Tree> = {
  [Name in keyof Tree & string]: Tree[Name] extends string
    ? Name
    : `${Name}.${Paths<Tree[Name]>}`;
}[keyof Tree & string];

/**
 * Where a line is written, in `App/locales/en/resume.json`. The line itself
 * is inline Markdown: bold text and links.
 */
type Key = Paths<typeof resume>;

type Role<Line = Key> = {
  dates: Line;
  organisation: Line;
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

type Slug =
  'architecture' | 'frontend-ai' | 'manager' | 'master' | 'react-native';

/**
 * One resume. A version is a selection and an order of lines, each named by
 * its key: the lines several versions share are under `shared`, and the
 * lines only one has are under its own name. `resolve` puts the text in.
 */
type Version<Line = Key> = {
  earlier: readonly Line[];
  education: readonly Line[];
  experience: readonly Role<Line>[];
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
type Resolved = Version<string>;

export type { Key, Resolved, Role, SectionId, Slug, Version };
