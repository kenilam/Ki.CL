import React from 'react';

// Components
import { SelectItem } from 'design/components';

// Constants
import type { LAYERS } from '@/views/experiments/factory-arm/workspace/panel/manual/pile/layers/constants';

type Props = { layers: (typeof LAYERS)[number] };

const Option: React.FunctionComponent<Props> = ({ layers }) => {
  return <SelectItem value={String(layers)}>{layers}</SelectItem>;
};

export { Option };
