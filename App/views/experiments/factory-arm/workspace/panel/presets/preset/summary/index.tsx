import React from 'react';

// Components
import { CardDescription } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Context
import { usePresetsContext } from '@/views/experiments/factory-arm/presets-context';

// Spec
import type * as Spec from '@/views/experiments/factory-arm/spec';

type Props = Pick<Spec.Preset, 'id'>;

/** How many layers, obstacles and stacks the preset builds. */
const Summary: React.FunctionComponent<Props> = ({ id }) => {
  const { t } = useTranslation('factory-arm');
  const { presets } = usePresetsContext();
  const preset = presets.find((each) => {
    return each.id === id;
  });

  if (!preset) {
    return null;
  }

  return (
    <CardDescription className='kicl-font-family-mono' is='span'>
      {t('summary', {
        layers: preset.pile.layers,
        obstacles: preset.obstacles.length,
        stacks: preset.stacks,
      })}
    </CardDescription>
  );
};

export { Summary };
