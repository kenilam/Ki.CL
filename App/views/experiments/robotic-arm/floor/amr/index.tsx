import React from 'react';

// World
import type { Amr as Plant } from '@/views/experiments/robotic-arm/floor/world';

// Partials
import { Amr } from './amr';

const Amrs: React.FunctionComponent<{ amrs: Plant[] }> = ({ amrs }) => (
  <>
    {amrs.map((amr) => (
      <Amr key={amr.id} amr={amr} />
    ))}
  </>
);

export { Amrs };
