/**
 * Route segment for this view.
 *
 * Kept in a leaf module - with no imports of its own - so descendant views can
 * compose an absolute path from it without importing `./index`, which would
 * close a cycle back through this folder's own route declaration.
 */
const PATH = 'system-design';

const CLASS_NAME = 'kicl--views--portfolio--pika--system-design';

/** Ids on the top-level section headings, shared with the anchor nav. */
const SECTION_ID = {
  estimate: 'estimate',
  partOne: 'part-1',
  partTwo: 'part-2',
  walkthrough: 'walkthrough',
  watchItRun: 'watch-it-run',
  watchTheAgentWork: 'watch-the-agent-work',
} as const;

/** Every section's `h2`. It is positioned so the gradient rule above it can anchor to it. */
const SECTION_HEADING =
  'kicl-font-size-larger kicl-padding-block-start-narrow kicl-position-relative';

export { CLASS_NAME, PATH, SECTION_HEADING, SECTION_ID };
