// Spec
import type { Score } from '@/views/experiments/image-agent/chat/spec';

/** The criteria, in the order they are shown, out of ten. */
const ROWS = [
  { context: 'relevance', key: 'relevance' },
  { context: 'quality', key: 'quality' },
  { context: 'style', key: 'styleMatch' },
  { context: 'composition', key: 'composition' },
] as const satisfies ReadonlyArray<{ context: string; key: keyof Score }>;

export { ROWS };
