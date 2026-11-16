const RECOGNITIONS = [
  {
    certificate: 'top50-sep-2026-graphic-design-6b23df',
    image: 'top_50.svg',
    kind: 'top50',
    month: '2026-09',
  },
  {
    certificate: 'top50-jun-2026-graphic-design-6b23df',
    image: 'top_50.svg',
    kind: 'top50',
    month: '2026-06',
  },
  {
    certificate: 'top10-dec-2025-graphic-design-6b23df',
    image: 'top_10.svg',
    kind: 'top10',
    month: '2025-12',
  },
  {
    certificate: 'top10-sep-2025-graphic-design-6b23df',
    image: 'top_10.svg',
    kind: 'top10',
    month: '2025-09',
  },
  {
    certificate: 'top50-jun-2025-graphic-design-6b23df',
    image: 'top_50.svg',
    kind: 'top50',
    month: '2025-06',
  },
  {
    certificate: 'top1percent-may-2025-engineering-6b23df',
    image: 'top_1_may.svg',
    kind: 'top1',
    month: '2025-05',
  },
  {
    certificate: 'top50-mar-2025-graphic-design-6b23df',
    image: 'top_50.svg',
    kind: 'top50',
    month: '2025-03',
  },
  {
    certificate: 'top50-dec-2024-graphic-design-6b23df',
    image: 'top_50.svg',
    kind: 'top50',
    month: '2024-12',
  },
  {
    certificate: 'adplist100-2024-keni-lam-6b23df',
    image: 'top_1_dec.svg',
    kind: 'adplist100',
    month: '2024-12',
  },
] as const;

const ALL_ID = 'kicl-resume-recognitions';

const LATEST = 3;

type Recognition = (typeof RECOGNITIONS)[number];

export { ALL_ID, LATEST, RECOGNITIONS, type Recognition };
