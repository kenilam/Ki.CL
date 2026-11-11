// Context
import { usePanelContext } from '@/views/experiments/factory-arm/panel-context';
import { usePresetsContext } from '@/views/experiments/factory-arm/presets-context';

// Partials
import { useCurrent } from '@/views/experiments/factory-arm/workspace/panel/use-current';

/** Saves the cell as it stands as a preset, and shows it among the presets. */
const useSave = () => {
  const { setTab } = usePanelContext();
  const { save } = usePresetsContext();
  const current = useCurrent();

  return () => {
    save(current());
    setTab('preset');
  };
};

export { useSave };
