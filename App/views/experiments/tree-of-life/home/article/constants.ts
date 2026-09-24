/*
 * Served from the `static` bucket through the API's asset proxy, not committed
 * here. The names don't describe the encoding, so re-encoding an image is just
 * an upload. The proxy sends these as revalidating instead of immutable so the
 * new file gets picked up.
 */
const IMAGES = '/assets/static';

export const ORIGINAL_VISION = `${IMAGES}/original-vision.webp`;
export const PERROT_1854 = `${IMAGES}/perrot-1854.webp`;
export const V14 = `${IMAGES}/v14.webp`;
