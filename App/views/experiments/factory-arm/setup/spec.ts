// Spec
import type { Solid } from '@/views/experiments/factory-arm/scene/obstacles/spec';

// Engine
import type { Note } from '@/views/experiments/factory-arm/engine/spec';

// Stack
import type { Pile } from '@/views/experiments/factory-arm/scene/pallet/stack';

/** What a run starts from: the obstacles, how the stacks are built, and how many there are. */
type Setup = { obstacles: Solid[]; pile: Pile; stacks: 1 | 2 };

/** The presets that ship with the page, as the copy names them (`preset_<context>`). */
type Shipped = 'crowded' | 'open_floor' | 'standard' | 'two_stacks';

/**
 * A setup with a name: one that ships with the page, named in the copy, or
 * one the operator saved under a name of their own.
 */
type Preset = Setup & { id: string; saved?: boolean } & (
    { context: Shipped; name?: never } | { context?: never; name: string }
  );

/** A step for the log: the engine's, and what the operator did to the cell. */
type Step =
  | Note
  | {
      context:
        | `started_${Shipped}`
        | 'added'
        | 'felt'
        | 'found'
        | 'removed'
        | 'saved'
        | 'started'
        | 'started_manual';
      values?: Note['values'];
    };

/**
 * One step in the log: what happened (`step_<context>` in the copy), when (milliseconds since 1970, so it
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
  note: Step;
};

export type { Entry, Preset, Setup, Step };
