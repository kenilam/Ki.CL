// Spec
import type { Setup } from '@/views/experiments/factory-arm/setup';

const count = (n: number, one: string) => `${n} ${one}${n === 1 ? '' : 's'}`;

/** A setup in a line: its layers, stacks and obstacles. */
const summary = ({ obstacles, pile, stacks }: Setup) =>
  [
    count(pile.layers, 'layer'),
    count(stacks, 'stack'),
    count(obstacles.length, 'obstacle'),
  ].join(' · ');

export { summary };
