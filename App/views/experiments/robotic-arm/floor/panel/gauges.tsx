import React, { useEffect, useState } from 'react';

// Components
import { Details, List, ListItem, Text } from 'design/components';

// Metrics
import type {
  Metrics,
  Snapshot,
} from '@/views/experiments/robotic-arm/floor/metrics.ts';

// World
import type { World } from '@/views/experiments/robotic-arm/floor/world';

// Constants
import { COPY } from './constants';

/** How often the panel reads the gauges, in milliseconds. */
const EVERY = 500;

const ms = (value: number) => `${value.toFixed(1)} ms`;

const rows = (snapshot: Snapshot, world: World): [string, string][] => [
  [COPY.gauges.fps, snapshot.fps.toFixed(0)],
  [COPY.gauges.frame, `${ms(snapshot.frame)} / ${ms(snapshot.slowest)}`],
  [COPY.gauges.step, ms(snapshot.step)],
  [
    COPY.gauges.dropped,
    `${snapshot.dropped} now, ${snapshot.droppedTotal} in all`,
  ],
  [COPY.gauges.ticks, String(snapshot.ticks)],
  [
    COPY.gauges.roundTrip,
    snapshot.roundTrip === null ? '—' : ms(snapshot.roundTrip),
  ],
  [COPY.gauges.hold, ms(snapshot.hold)],
  [COPY.gauges.late, String(snapshot.late)],
  [COPY.gauges.refused, String(snapshot.refused)],
  [COPY.gauges.cases, String(world.cases.length)],
];

/** What the floor costs to run, read a couple of times a second. */
const Gauges: React.FunctionComponent<{ gauges: Metrics; world: World }> = ({
  gauges,
  world,
}) => {
  const [snapshot, setSnapshot] = useState<Snapshot>(gauges.read);

  useEffect(() => {
    const timer = setInterval(() => setSnapshot(gauges.read()), EVERY);

    return () => clearInterval(timer);
  }, [gauges]);

  return (
    <Details summary={COPY.gauges.statistic} open>
      <List aria-label={COPY.gauges.label}>
        {rows(snapshot, world).map(([name, value]) => (
          <ListItem
            autoFlow='column'
            frames='1fr--max-content'
            gap='narrow'
            key={name}
          >
            <Text is='span' className='kicl-font-size-small'>
              {name}
            </Text>
            <Text
              is='span'
              className='kicl-font-size-small'
              dense
              variant='secondary'
            >
              {value}
            </Text>
          </ListItem>
        ))}
      </List>
    </Details>
  );
};

export { Gauges };
