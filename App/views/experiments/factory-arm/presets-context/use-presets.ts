import { useCallback, useMemo } from 'react';

// Hooks
import { useTranslation } from 'design/hooks';

// Context
import { useAppliedContext } from '@/views/experiments/factory-arm/applied-context';
import { useLogContext } from '@/views/experiments/factory-arm/log-context';

// Partials
import { PRESETS } from '@/views/experiments/factory-arm/presets';
import { useSaved } from './use-saved';

// Spec
import type { Setup } from '@/views/experiments/factory-arm/spec';

/** The presets, the ones that ship with the page and the operator's own. */
const usePresets = () => {
  const { t } = useTranslation('factory-arm');
  const { apply, forget } = useAppliedContext();
  const { note } = useLogContext();
  const { discard: drop, save: keep, saved } = useSaved();

  // A removed preset can't stay the active one.
  const discard = useCallback(
    (id: string) => {
      drop(id);
      forget(id);
    },
    [drop, forget]
  );

  /** The name a new preset gets unless the operator gives one. */
  const next = t('preset', { context: 'saved', number: saved.length + 1 });

  /**
   * Saves `setup` as a preset named `name`, or numbered when it has none.
   * The running cell is what was saved, so the new preset is the active one.
   */
  const save = useCallback(
    (setup: Setup, name?: string) => {
      const id = `saved-${Date.now()}`;
      const preset = { ...setup, id, name: name?.trim() || next };

      keep(preset);
      apply(preset, id);
      note({ context: 'saved', values: { name: preset.name } }, 'info');
    },
    [apply, keep, next, note]
  );

  return useMemo(
    () => ({ discard, next, presets: [...PRESETS, ...saved], save }),
    [discard, next, saved, save]
  );
};

export { usePresets };
