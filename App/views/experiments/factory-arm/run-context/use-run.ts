import { useCallback, useMemo, useState } from 'react';

// Context
import { useAppliedContext } from '@/views/experiments/factory-arm/applied-context';
import { useDraftContext } from '@/views/experiments/factory-arm/draft-context';
import { useLogContext } from '@/views/experiments/factory-arm/log-context';
import { usePanelContext } from '@/views/experiments/factory-arm/panel-context';

// Spec
import type { Preset, Setup, Step } from '@/views/experiments/factory-arm/spec';

/** The step that starts a run from `setup`, named by what it was built from. */
const started = (setup: Preset | Setup): Step => {
  if (!('id' in setup)) {
    return { context: 'started_manual' };
  }

  return setup.context
    ? { context: `started_${setup.context}` }
    : { context: 'started', values: { name: setup.name } };
};

/** The runs: how many there have been, and building the cell again for the next. */
const useRun = () => {
  const { apply } = useAppliedContext();
  const { setDraft } = useDraftContext();
  const { begin } = useLogContext();
  const { fold } = usePanelContext();
  // Counts runs; the cell is built again whenever it goes up.
  const [run, setRun] = useState(0);

  /** Builds the cell again from `setup`, and folds the panel away on small screens. */
  const proceed = useCallback(
    (setup: Preset | Setup) => {
      // A setup made by hand carries no id; a preset does.
      apply(setup, 'id' in setup ? setup.id : null);
      setDraft({ pile: setup.pile, stacks: setup.stacks });
      setRun((count) => count + 1);
      begin(started(setup));
      fold();
    },
    [apply, begin, fold, setDraft]
  );

  return useMemo(() => ({ proceed, run }), [proceed, run]);
};

export { useRun };
