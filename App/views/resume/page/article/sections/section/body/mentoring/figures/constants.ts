const FIGURES = ['sessions', 'minutes', 'reviews', 'rating', 'rank'] as const;

type Figure = (typeof FIGURES)[number];

export { FIGURES, type Figure };
