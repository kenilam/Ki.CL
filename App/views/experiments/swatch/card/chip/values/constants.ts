const TERMS = ['pantone', 'cmyk', 'rgb', 'hex'] as const;

type Term = (typeof TERMS)[number];

export { TERMS, type Term };
