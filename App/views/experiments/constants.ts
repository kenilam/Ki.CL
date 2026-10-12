/**
 * Route segment for this view.
 *
 * Kept in a leaf module - with no imports of its own - so descendant views can
 * compose an absolute path from it without importing `./index`, which would
 * close a cycle back through this folder's own route declaration.
 */
const PATH = 'experiments';

/**
 * Absolute path for the index, or for one experiment's panel on it. The
 * panel's id is the experiment's own route segment.
 */
const toPath = (experiment?: string | null): string =>
  experiment ? `/${PATH}#${experiment}` : `/${PATH}`;

export { PATH, toPath };
