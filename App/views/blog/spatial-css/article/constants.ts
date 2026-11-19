const SECTIONS = [
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
] as const;

type Section = (typeof SECTIONS)[number];

const TERMS: Partial<Record<Section, string>> = {
  anchor: 'position-context: anchor',
  css: 'transition',
  draft: 'spatial: page',
  fallback: 'window.HTMLModelElement',
  lighting: '@environment-map',
  model: '<model>',
  orbit: 'portal-action: orbit',
  portal: 'spatial: portal',
  room: 'requestVolumetricScene()',
  trying: 'CSS Portals',
};

export { SECTIONS, TERMS, type Section };
