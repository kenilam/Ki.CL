import React from 'react';

// Grid
import { type Line, onLine } from 'arm/grid/layout';

// Context
import { useHub } from '@/views/experiments/factory-arm/floor/hub';

// Partials
import { Case } from './case';

type Props = { line: Line };

/** How far ahead of the hub's last word a rider is drawn at most, in seconds: a missed message or two, not a runaway. */
const AHEAD = 0.2;

/**
 * The cases riding a line, where the hub last put them, carried on at belt
 * speed between its messages while the belt runs, so they move smoothly.
 */
const Riders: React.FunctionComponent<Props> = ({ line }) => {
  // Read once per revision: the set of riders changes only when the hub says so.
  const { revision, riders } = useHub();
  const riding = riders.current.get(line.id)?.riders ?? [];

  void revision;

  return riding.map((rider) => (
    <Case
      glow={() => 'none'}
      key={rider.id}
      own={rider.own}
      pose={() => {
        const told = riders.current.get(line.id);
        const now = told?.riders.find((one) => one.id === rider.id);

        if (!told || !now) {
          return null;
        }

        const since = Math.min(AHEAD, (performance.now() - told.at) / 1000);
        const point = onLine(
          line,
          Math.min(line.end, now.at + (told.running ? line.speed * since : 0))
        );

        return {
          at: { ...point, y: line.height + rider.own.size[1] / 2 },
          yaw: now.yaw,
        };
      }}
    />
  ));
};

export { Riders };
