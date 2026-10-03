import * as nodePath from 'path';

/**
 * Cascade layers, lowest priority first.
 *
 * Without these, priority between two equal-specificity rules is decided by
 * the order their stylesheets happen to load - and that order is not stable.
 * Dev injects a `<style>` per module in import order, so `core/styles` (imported
 * first by `App/index.tsx`) lands at the bottom of the cascade. A production
 * build splits CSS per Rollup chunk and links each chunk's dependencies first,
 * which puts `core/styles` at the *top* instead. Same source, inverted result:
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
  'wrappers',
  'views',
  'utilities',
] as const;

type Layer = (typeof LAYERS)[number];

/**
 * Repeated at the top of every stylesheet. The first copy the browser sees
 * fixes the order; the rest are no-ops. Cheap insurance - it means no single
 * file has to be guaranteed to load first.
 *
 * The design system's stylesheet declares the same layers in the same order.
 */
const LAYER_ORDER = `@layer ${LAYERS.join(', ')};`;

/**
 * Which cascade layer a stylesheet belongs to, or `null` for Sass partials -
 * wrapping those would scope their `@mixin`/`@function` definitions to a block
 * and make them unreachable to the files that `@use` them.
 *
 * Everything the host still styles is a view. The reset, base, layout,
 * components, wrappers and utilities layers are filled by the design system
 * remote (Ki.CL-design-system), whose `Design/scripts/get-style-layer.ts` must
 * keep `LAYERS` identical to the list above.
 */
const getStyleLayer = (filename: string): Layer | null =>
  nodePath.basename(filename.replace(/\\/g, '/')).startsWith('_')
    ? null
    : 'views';

export { LAYER_ORDER, LAYERS, getStyleLayer, type Layer };
