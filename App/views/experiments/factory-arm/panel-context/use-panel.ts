import { useCallback, useMemo, useState } from 'react';

// Hooks
import { useResponsive } from 'design/hooks';

type Tab = 'preset' | 'manual' | 'log';

/** Which tab the panel shows, and whether it's open; kept here so it stays as left across runs. */
const usePanel = () => {
  const { isNarrow } = useResponsive();
  const [tab, setTab] = useState<Tab>('preset');
  // Open beside the stage where there's room for it, folded away on small screens.
  const [open, setOpen] = useState(!isNarrow);

  // On small screens the panel covers the stage, so it folds away to show the run.
  const fold = useCallback(() => {
    setOpen(!isNarrow);
  }, [isNarrow]);

  return useMemo(
    () => ({ fold, open, setOpen, setTab, tab }),
    [fold, open, tab]
  );
};

export { usePanel };
