import React from 'react';

// Partials
import { Film } from '@/views/experiments/swatch/film';

// Hooks
import { usePreset } from '@/views/experiments/swatch/use-preset';

const Backdrop: React.FunctionComponent = () => {
  const preset = usePreset();

  return preset ? <Film id={preset.id} /> : null;
};

export { Backdrop };
