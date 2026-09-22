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

export { CLASS_NAME, PATH, SECTION_ID };
