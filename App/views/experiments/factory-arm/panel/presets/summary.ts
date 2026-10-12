import type { TFunction } from 'i18next';

// Spec
import type { Setup } from '@/views/experiments/factory-arm/setup';

/** A setup in a line: its layers, stacks and obstacles. */
const summary = (
  t: TFunction<'factory-arm'>,
  { obstacles, pile, stacks }: Setup
) => t('summary', { layers: pile.layers, obstacles: obstacles.length, stacks });

export { summary };
