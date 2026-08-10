import * as nodePath from 'path';

/**
 * Cascade layers, lowest priority first.
 *
 * Without these, priority between two equal-specificity rules is decided by
 * the order their stylesheets happen to load — and that order is not stable.
 * Dev injects a `<style>` per module in import order, so `Core/Styles` (imported
 * first by `App/index.tsx`) lands at the bottom of the cascade. A production
 * build splits CSS per Rollup chunk and links each chunk's dependencies first,
 * which puts `Core/Styles` at the *top* instead. Same source, inverted result:
 * `.kicl-layout` beat `.kicl--icons--logo` only in the built site, sizing the
 * logo to `min-block-size: 100dvb` and pushing it out of its header.
 *
 * Layers make the order explicit, so chunking can no longer change it.
 */
const LAYERS = [
  'reset',
  'base',
  'layout',
  'components',
  'views',
  'utilities',
] as const;

type Layer = (typeof LAYERS)[number];

/**
 * Repeated at the top of every stylesheet. The first copy the browser sees
 * fixes the order; the rest are no-ops. Cheap insurance — it means no single
 * file has to be guaranteed to load first.
 *
 * `App/Core/Styles/reset.css` carries a copy of this list too, since it is
 * plain CSS and never passes through the SCSS hook that prepends this.
 */
const LAYER_ORDER = `@layer ${LAYERS.join(', ')};`;

/** Element-level defaults — `body`, headings, form controls, theme classes. */
const BASE = [
  'styles.body.scss',
  'styles.generic.scss',
  'styles.headings.scss',
];

/**
 * `.kicl-layout` sits below `components` on purpose: `Layout` clones its
 * classes onto whatever child it wraps, so its sizing lands on the same
 * element as that component's own — and the component should win.
 */
const LAYOUT = ['layout.scss'];

/**
 * Which cascade layer a stylesheet belongs to, or `null` for Sass partials —
 * wrapping those would scope their `@mixin`/`@function` definitions to a block
 * and make them unreachable to the files that `@use` them.
 */
const getStyleLayer = (filename: string): Layer | null => {
  const normalized = filename.replace(/\\/g, '/');
  const basename = nodePath.basename(normalized);

  if (basename.startsWith('_')) {
    return null;
  }

  const [, path = ''] = normalized.split('/App/');

  if (path.startsWith('Core/Styles/')) {
    if (BASE.includes(basename)) {
      return 'base';
    }

    if (LAYOUT.includes(basename)) {
      return 'layout';
    }

    // Tokens and the single-purpose `kicl-*` classes. Highest layer so a
    // utility applied in JSX overrides the component's own SCSS, which is what
    // the design-system rule already tells us to expect.
    return 'utilities';
  }

  if (path.startsWith('Views/') || path.startsWith('Router/')) {
    return 'views';
  }

  return 'components';
};

export { LAYER_ORDER, LAYERS, type Layer };
export default getStyleLayer;
