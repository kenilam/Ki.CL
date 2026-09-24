/** When the page's frame starts easing in from full-bleed, in ms. */
const FRAME_DELAY = 300;

/**
 * When the background and header come in: once the frame has settled, which
 * takes `--kicl-transition-duration-slow` (720ms).
 */
const CONTENT_DELAY = FRAME_DELAY + 800;

export { CONTENT_DELAY, FRAME_DELAY };
