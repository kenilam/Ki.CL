/** Plain text, bold text, or a link. */
type Run = string | { strong: string } | { link: string; to: string };

/** One paragraph or one list item. A string when it is all plain text. */
type Line = string | readonly Run[];

type Role = {
  dates: string;
  organisation: string;
  points: readonly Line[];
  title: string;
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
 * One resume. A version is a selection and an order: the lines several
 * versions share are constants in `shared.ts`, and each version adds the
 * lines only it has.
 */
type Version = {
  earlier: readonly Line[];
  education: readonly Line[];
  experience: readonly Role[];
  headline: string;
  languages: Line;
  mentoring: Line;
  /** Shown where the versions are listed, and in the PDF's title. */
  name: string;
  /** Sections, top to bottom. */
  order: readonly SectionId[];
  projects: { intro?: Line; items?: readonly Line[] };
  skills: readonly Line[];
  /** The URL segment, and the suffix of the exported file's name. */
  slug: Slug;
  summary: Line;
};

export type { Line, Role, Run, SectionId, Slug, Version };
