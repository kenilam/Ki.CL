import type { RefObject } from 'react';

// Spec
import type { Solid } from '@/views/experiments/factory-arm/engine/solid';

// Engine
import type { Note } from '@/views/experiments/factory-arm/engine/spec';

// Stack
import type { Pile } from '@/views/experiments/factory-arm/engine/stack';

// Obstacles
import type { Shape } from '@/views/experiments/factory-arm/engine/obstacles';

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

/** How the stacks are built, as the Manual tab edits them before a run. */
type Draft = Pick<Setup, 'pile' | 'stacks'>;

/**
 * The running cell, as the panel reaches it: the obstacles as they stand, and
 * a way to ask the stage for a shape. Each run's cell attaches itself here,
 * so the panel outlives the runs instead of being built again with each.
 */
type Cell = {
  ask: (shape: Shape) => void;
  /** Whether the arm is working: a case on the pad, or any queued. */
  busy: () => boolean;
  obstacles: RefObject<Solid[]>;
};

export type { Cell, Draft, Entry, Preset, Setup, Step };
