import type { Section } from '@/views/blog/spatial-css/article/constants';

type Shot = Section | 'intro';

type Look =
  | 'anchor'
  | 'exploded'
  | 'flat'
  | 'lighting'
  | 'model'
  | 'orbit'
  | 'portal'
  | 'room'
  | 'transition';

const ORDER: readonly Shot[] = [
  'intro',
  'why',
  'model',
  'portal',
  'anchor',
  'lighting',
  'orbit',
  'room',
  'css',
  'fallback',
  'trying',
  'draft',
  'limits',
  'references',
];

const LOOKS: Record<Shot, Look> = {
  anchor: 'anchor',
  css: 'transition',
  draft: 'exploded',
  fallback: 'flat',
  intro: 'exploded',
  lighting: 'lighting',
  limits: 'exploded',
  model: 'model',
  orbit: 'orbit',
  portal: 'portal',
  references: 'exploded',
  room: 'room',
  trying: 'exploded',
  why: 'flat',
};

export { LOOKS, ORDER, type Look, type Shot };
