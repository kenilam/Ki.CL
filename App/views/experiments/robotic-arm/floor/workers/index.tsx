import React from 'react';

// World
import type { Walker } from '../world';

// Partials
import { Worker } from './worker';

const Workers: React.FunctionComponent<{ workers: Walker[] }> = ({
  workers,
}) => (
  <>
    {workers.map((worker) => (
      <Worker key={worker.id} worker={worker} />
    ))}
  </>
);

export { Workers };
