// Spec
import type { Solid } from '@/views/experiments/factory-arm/scene/obstacles/spec';

// Stack
import type { Pile } from '@/views/experiments/factory-arm/scene/pallet/stack';

/** What a run starts from: the obstacles, how the stacks are built, and how many there are. */
type Setup = { obstacles: Solid[]; pile: Pile; stacks: 1 | 2 };

/** A setup with a name, shipped with the page or saved by the operator. */
type Preset = Setup & { id: string; name: string; saved?: boolean };

export type { Preset, Setup };
