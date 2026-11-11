// Hooks
import { useTranslation } from 'design/hooks';

// Context
import { usePresetsContext } from '@/views/experiments/factory-arm/presets-context';

/** A preset's name: the copy's for one that ships with the page, the operator's own for one they saved. */
const useName = (id: string) => {
  const { t } = useTranslation('factory-arm');
  const { presets } = usePresetsContext();
  const preset = presets.find((each) => {
    return each.id === id;
  });

  if (!preset) {
    return '';
  }

  return preset.context
    ? t('preset', { context: preset.context })
    : preset.name;
};

export { useName };
