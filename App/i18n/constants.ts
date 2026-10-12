const LANGUAGE = 'en';

/** What renders outside a route's own `Suspense`: the header, the session gate, the dialogs. */
const DEFAULT_NAMESPACE = 'common';

/**
 * Loaded before the app mounts. The design system's components render
 * everywhere, the header included, so their words are fetched with the
 * default namespace's and not when the first one appears.
 */
const PRELOADED = [DEFAULT_NAMESPACE, 'design'];

export { DEFAULT_NAMESPACE, LANGUAGE, PRELOADED };
