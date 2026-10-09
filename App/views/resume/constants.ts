import type { SectionId } from './content/types';

/**
 * Route segment for this view.
 *
 * Kept in a leaf module, with no imports at runtime, so the navigation can
 * link here without importing `./index`, which would bring the route with it.
 */
const PATH = 'resume';

/** Root of every class and custom property in this view. */
const CLASS_NAME = 'kicl--views--resume';

/** The exported master PDF's name in the static bucket, kept for good. */
const OBJECT = `${PATH}/keni-lam-resume.pdf`;

/**
 * Where the site serves it: the API streams the bucket at `/assets/static`.
 * It is not in `App/public`, so the file and the address in it are in no
 * commit and no image.
 */
const FILE = `/assets/static/${OBJECT}`;

/**
 * Where the contact line looks for a phone number, in local storage. Nothing
 * on the site writes it. The export does, for the PDFs sent with an
 * application, so the number is in no commit and no bundle.
 */
const PHONE_KEY = 'kicl-resume-phone';

const SECTIONS = {
  education: 'Education',
  experience: 'Experience',
  languages: 'Languages',
  mentoring: 'Mentoring',
  projects: 'Projects',
  skills: 'Skills',
  summary: 'Summary',
} as const satisfies Record<SectionId, string>;

const COPY = {
  earlier: 'Earlier',
  file: 'PDF',
  print: 'Print',
  sections: SECTIONS,
  sendMessage: 'Send me a message',
  /** The document's title while it prints, which a browser offers as the file's name. */
  title: 'Resume',
} as const;

/** Every section's heading: a small label over a rule. */
const HEADING = ['kicl-font-size-small', 'kicl-text-transform-uppercase'];

export { CLASS_NAME, COPY, FILE, HEADING, OBJECT, PATH, PHONE_KEY };
