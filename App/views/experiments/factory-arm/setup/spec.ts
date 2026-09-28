// Spec
import type { Solid } from '@/views/experiments/factory-arm/scene/obstacles/spec';

// Stack
import type { Pile } from '@/views/experiments/factory-arm/scene/pallet/stack';

/** What a run starts from: the obstacles, how the stacks are built, and how many there are. */
type Setup = { obstacles: Solid[]; pile: Pile; stacks: 1 | 2 };

/** A setup with a name, shipped with the page or saved by the operator. */
type Preset = Setup & { id: string; name: string; saved?: boolean };

/**
 * One step in the log: what happened, when (milliseconds since 1970, so it
 * reads right after a reload), and how it went, which colours its dot.
 */
type Entry = {
  id: number;
  at: number;
  /** Which run it happened in; the log groups by it. */
  run: number;
  /** Whether it's the step that started its run, which names the run. */
  start?: boolean;
  level?: 'confirm' | 'error' | 'info' | 'warning';
  text: string;
};

export type { Entry, Preset, Setup };
