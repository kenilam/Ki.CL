/** The `main` landmark's id: the skip link targets it and route changes focus it. */
const MAIN_ID = 'main';

/** Any button opens the dialog by this id: `command='show-modal'`. */
const CONTACT_ID = 'kicl--views--contact';

/** When the page's frame starts easing in from full-bleed, in ms. */
const FRAME_DELAY = 300;

/**
 * When the background and header come in: once the frame has settled, which
 * takes `--kicl-transition-duration-slow` (720ms).
 */
const CONTENT_DELAY = FRAME_DELAY + 800;

export { CONTACT_ID, CONTENT_DELAY, FRAME_DELAY, MAIN_ID };
