/**
 * Route segment for this view.
 *
 * Kept in a leaf module - with no imports of its own - so descendant views can
 * compose an absolute path from it without importing `./index`, which would
 * close a cycle back through this folder's own route declaration.
 */
const PATH = 'portfolio';

export { PATH };
