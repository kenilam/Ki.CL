/**
 * Route segment for this view.
 *
 * Kept in a leaf module, with no imports at runtime, so the navigation can
 * link here without importing `./index`, which would bring the route with it.
 */
const PATH = 'resume';

/** Root of every class and custom property in this view. */
const CLASS_NAME = 'kicl--views--about__resume';

const ENTRY_ID = 'kicl-resume-entry';

/** A section's anchor, which the page indicator's dots link to. */
const toAnchor = (section: string) => `kicl-resume-${section}`;

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

/** The shape About's mark takes behind each row of the experience. */
const MOMENTS = {
  apple: 'platforms',
  earlier: 'web',
  ebay: 'engineer',
  indeed: 'people',
  rakuten: 'people',
  retail: 'stores',
  tesla: 'systems',
} as const;

export {
  CLASS_NAME,
  ENTRY_ID,
  FILE,
  MOMENTS,
  OBJECT,
  PATH,
  PHONE_KEY,
  toAnchor,
};
