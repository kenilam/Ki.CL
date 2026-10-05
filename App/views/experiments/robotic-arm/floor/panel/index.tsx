import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Card, CardContent } from 'design/components';

// Metrics
import type { Metrics } from '@/views/experiments/robotic-arm/floor/metrics';

// World
import type { World } from '@/views/experiments/robotic-arm/floor/world';

// Partials
import { Brains } from './brains';
import { Gauges } from './gauges';
import { Size } from './size';

// Constants
import { COPY } from './constants';

type Props = React.ComponentProps<typeof Brains> &
  React.ComponentProps<typeof Size> & {
    gauges: Metrics;
    world: World;
    /** The bridge's path; without one there is no Physical AI switch. */
    path?: string;
  };

/** The floor's controls: its size, what it costs to run, and the arm on physical AI. */
const Panel: React.FunctionComponent<Props> = ({
  gauges,
  mode,
  onModeChange,
  onSizeChange,
  path,
  size,
  status,
  twinned,
  world,
}) => (
  <Card
    is='aside'
    size='max'
    variant='ghost'
    aria-label={COPY.label}
    className={classNames(
      'kicl-position-absolute',
      'kicl-inset-block-start-wide',
      'kicl-inset-inline-end-wide',
      'kicl-z-index-floating'
    )}
  >
    <CardContent is='section'>
      <Size onSizeChange={onSizeChange} size={size} />
    </CardContent>
    <CardContent is='section'>
      <Gauges gauges={gauges} world={world} />
    </CardContent>
    {path && (
      <CardContent is='section'>
        <Brains
          mode={mode}
          onModeChange={onModeChange}
          status={status}
          twinned={twinned}
        />
      </CardContent>
    )}
  </Card>
);

export { Panel };
