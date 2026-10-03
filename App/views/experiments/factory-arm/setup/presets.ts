// Constants
import { OBSTACLES } from '@/views/experiments/factory-arm/scene/obstacles/constants';

// Spec
import type { Preset } from './spec';

/** The presets that ship with the page. The first is what a visit starts with. */
const PRESETS: Preset[] = [
  {
    id: 'standard',
    name: 'Standard',
    obstacles: OBSTACLES,
    pile: { layers: 4, seed: 7 },
    stacks: 1,
  },
  {
    id: 'two-stacks',
    name: 'Two stacks',
    obstacles: OBSTACLES,
    pile: { layers: 3, seed: 11 },
    stacks: 2,
  },
  {
    id: 'open-floor',
    name: 'Open floor',
    obstacles: [],
    pile: { layers: 4, seed: 3 },
    stacks: 1,
  },
  {
    id: 'crowded',
    name: 'Crowded',
    obstacles: [
      ...OBSTACLES,
      {
        id: 'pillar-back',
        min: { x: 0.5, y: 0, z: -0.9 },
        max: { x: 0.64, y: 2.3, z: -0.76 },
      },
    ],
    pile: { layers: 3, seed: 19 },
    stacks: 2,
  },
];

export { PRESETS };
