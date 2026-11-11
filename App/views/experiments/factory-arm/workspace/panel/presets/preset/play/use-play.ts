// Context
import { useAppliedContext } from '@/views/experiments/factory-arm/applied-context';
import { usePendingContext } from '@/views/experiments/factory-arm/pending-context';
import { usePresetsContext } from '@/views/experiments/factory-arm/presets-context';

/** Whether the running cell came from the preset, and building the cell from it. */
const usePlay = (id: string) => {
  const { active } = useAppliedContext();
  const { start } = usePendingContext();
  const { presets } = usePresetsContext();

  const play = () => {
    const preset = presets.find((each) => {
      return each.id === id;
    });

    if (!preset) {
      return;
    }

    start(preset);
  };

  return { current: id === active, play };
};

export { usePlay };
