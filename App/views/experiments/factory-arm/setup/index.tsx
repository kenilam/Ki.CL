import React, {
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';

// Spec
import type { Solid } from '@/views/experiments/factory-arm/scene/obstacles/spec';
import type { Shape } from '@/views/experiments/factory-arm/scene/obstacles/constants';

// Partials
import { PRESETS } from './presets';
import { useSaved } from './store';

// Spec
import type { Preset, Setup } from './spec';

type Tab = 'preset' | 'manual' | 'log';

/**
 * One step in the log: what happened, when (milliseconds since the page
 * loaded), and how it went, which colours its dot.
 */
type Entry = {
  id: number;
  at: number;
  /** Which run it happened in; the log groups by it. */
  run: number;
  level?: 'confirm' | 'error' | 'info' | 'warning';
  text: string;
};

/** How many steps the log keeps; the oldest go first. */
const LIMIT = 300;

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
  obstacles: React.RefObject<Solid[]>;
};

type Value = {
  /** Every step the cell took, newest first. */
  log: Entry[];
  note: (text: string, level?: Entry['level']) => void;
  clearLog: () => void;
  cell: React.RefObject<Cell | null>;
  attach: (cell: Cell | null) => void;
  /** Whether the running cell has changed since it was built or saved. */
  edited: boolean;
  setEdited: (edited: boolean) => void;
  /** What the running cell was built from. */
  applied: Setup;
  /** Counts runs; the cell is built again whenever it goes up. */
  run: number;
  /** Builds the cell again from `setup`. */
  proceed: (setup: Setup) => void;
  draft: Draft;
  setDraft: (draft: Draft) => void;
  presets: Preset[];
  /** Saves `setup` as a preset named `name`, or numbered when it has none. */
  save: (setup: Setup, name?: string) => void;
  /** The preset the running cell was built from, or saved as; none when set up by hand. */
  active: string | null;
  /** The name a new preset gets unless the operator gives one. */
  next: string;
  discard: (id: string) => void;
  tab: Tab;
  setTab: (tab: Tab) => void;
  /** Whether the panel is open; kept here so it stays as left across runs. */
  open: boolean;
  setOpen: (open: boolean) => void;
};

const Context = React.createContext<Value | null>(null);

const [FIRST] = PRESETS;

/** Wider than a tablet, where the panel stands beside the stage (`query('>tablet')`). */
const WIDE = '(min-width: 737px)';

/**
 * What the cell is built from, above the cell itself, so it outlives each
 * run: the setup applied, the Manual tab's draft, the presets, and which tab
 * is open.
 */
const SetupProvider: React.FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const { discard: drop, save: keep, saved } = useSaved();

  const [applied, setApplied] = useState<Setup>(FIRST);
  const [run, setRun] = useState(0);
  const [draft, setDraft] = useState<Draft>({
    pile: FIRST.pile,
    stacks: FIRST.stacks,
  });
  const [active, setActive] = useState<string | null>(FIRST.id);
  const [edited, setEdited] = useState(false);
  const [log, setLog] = useState<Entry[]>([]);
  const counted = useRef(0);
  // The run a step belongs to, read as it's logged rather than when `note` was made.
  const current = useRef(0);

  const note = useCallback((text: string, level?: Entry['level']) => {
    counted.current += 1;

    const entry = {
      at: performance.now(),
      id: counted.current,
      level,
      run: current.current,
      text,
    };

    setLog((current) => [entry, ...current].slice(0, LIMIT));
  }, []);

  const clearLog = useCallback(() => setLog([]), []);
  const cell = useRef<Cell | null>(null);

  const attach = useCallback((next: Cell | null) => {
    cell.current = next;
  }, []);
  const [tab, setTab] = useState<Tab>('preset');
  // Open beside the stage where there's room for it, folded away on small screens.
  const [open, setOpen] = useState(() => matchMedia(WIDE).matches);

  const proceed = useCallback(
    (setup: Setup) => {
      // A setup made by hand carries no id; a preset does.
      setActive('id' in setup ? (setup as Preset).id : null);
      setEdited(false);
      setApplied(setup);
      setDraft({ pile: setup.pile, stacks: setup.stacks });
      setRun((count) => count + 1);
      current.current += 1;
      note(
        `Started ${'name' in setup ? (setup as Preset).name : 'a manual setup'}`,
        'info'
      );
    },
    [note]
  );

  // A removed preset can't stay the active one.
  const discard = useCallback(
    (id: string) => {
      drop(id);
      setActive((current) => (current === id ? null : current));
    },
    [drop]
  );

  const next = `Saved ${saved.length + 1}`;

  // The running cell is what was saved, so the new preset is the active one.
  const save = useCallback(
    (setup: Setup, name?: string) => {
      const id = `saved-${Date.now()}`;

      keep({ ...setup, id, name: name?.trim() || next });
      note(`Saved the cell as ${name?.trim() || next}`, 'info');
      setActive(id);
      setEdited(false);
      setTab('preset');
    },
    [keep, next, note]
  );

  const value = useMemo(
    () => ({
      clearLog,
      log,
      note,
      active,
      applied,
      attach,
      cell,
      edited,
      discard,
      draft,
      next,
      presets: [...PRESETS, ...saved],
      proceed,
      run,
      open,
      save,
      setDraft,
      setEdited,
      setOpen,
      setTab,
      tab,
    }),
    [
      clearLog,
      log,
      note,
      active,
      applied,
      attach,
      edited,
      discard,
      draft,
      next,
      open,
      proceed,
      run,
      save,
      saved,
      tab,
    ]
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

const useSetup = () => {
  const value = useContext(Context);

  if (!value) {
    throw new Error('useSetup is used outside SetupProvider');
  }

  return value;
};

export { SetupProvider, useSetup, WIDE };
export type { Preset, Setup } from './spec';
export type { Entry };
