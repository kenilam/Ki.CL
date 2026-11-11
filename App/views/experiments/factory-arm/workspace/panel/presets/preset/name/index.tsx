import React from 'react';

// Components
import { CardTitle } from 'design/components';

// Partials
import { useName } from '@/views/experiments/factory-arm/workspace/panel/presets/preset/use-name';

// Spec
import type * as Spec from '@/views/experiments/factory-arm/spec';

type Props = Pick<Spec.Preset, 'id'>;

const Name: React.FunctionComponent<Props> = ({ id }) => {
  const name = useName(id);

  return <CardTitle is='span'>{name}</CardTitle>;
};

export { Name };
