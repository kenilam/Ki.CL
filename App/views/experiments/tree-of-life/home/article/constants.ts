/*
 * Served from the `static` bucket through the API's asset proxy rather than
 * committed to this repository.
 *
 * Named for what they are, not for their contents, so re-encoding one is an
 * upload and nothing else - no name here has to change. The proxy sends these
 * revalidating rather than immutable to make that safe.
 */
const IMAGES = '/assets/static';

export const ORIGINAL_VISION = `${IMAGES}/original-vision.webp`;
export const PERROT_1854 = `${IMAGES}/perrot-1854.webp`;
export const V14 = `${IMAGES}/v14.webp`;
