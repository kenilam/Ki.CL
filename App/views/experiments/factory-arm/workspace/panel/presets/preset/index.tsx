import React from 'react';

// Components
import { Card } from 'design/components';

// Context
import { useAppliedContext } from '@/views/experiments/factory-arm/applied-context';
import { usePresetsContext } from '@/views/experiments/factory-arm/presets-context';

// Partials
import { Name } from './name';
import { Play } from './play';
import { Remove } from './remove';
import { Summary } from './summary';

// Spec
import type * as Spec from '@/views/experiments/factory-arm/spec';

type Props = Pick<Spec.Preset, 'id'>;

/**
 * One preset. Its play button builds the cell from it; the one the running
 * cell came from is edged green, and its button starts it over. Playing
 * while the arm is working asks first.
 */
const Preset: React.FunctionComponent<Props> = ({ id }) => {
  const { active } = useAppliedContext();
  const { presets } = usePresetsContext();
  const preset = presets.find((each) => {
    return each.id === id;
  });

  if (!preset) {
    return null;
  }

  return (
    <Card
      is='li'
      level={preset.id === active ? 'confirm' : undefined}
      header={
        <>
          <Name id={id} />
          <Summary id={id} />
          <Play id={id} />
        </>
      }
    >
      {preset.saved ? <Remove id={id} /> : null}
    </Card>
  );
};

export { Preset };
