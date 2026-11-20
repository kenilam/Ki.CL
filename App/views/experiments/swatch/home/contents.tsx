import React from 'react';

// Components
import { Spinner } from 'design/components';

// Routes
import { Navigate } from 'design/router';

// Hooks
import { usePreset } from '@/views/experiments/swatch/use-preset';

// Partials
import { Empty } from './empty';

// Constants
import { toPath } from '@/views/experiments/swatch/constants';

const Contents: React.FunctionComponent = () => {
  const preset = usePreset();

  if (preset === undefined) {
    return <Spinner position='inline' />;
  }

  return preset ? <Navigate replace to={toPath(preset.id)} /> : <Empty />;
};

export { Contents };
