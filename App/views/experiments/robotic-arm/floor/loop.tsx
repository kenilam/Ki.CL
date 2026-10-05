import React, { useEffect, useRef } from 'react';

// Libraries
import { useFrame } from '@react-three/fiber';

// Brains
import { brains, type Status } from 'arm/brains';
import type { Commands } from 'arm/frames';

// Metrics
import type { Metrics } from './metrics';

// World
import { map, sense, step, type World } from './world';

/** Bus ticks a second: how often robots report and brains answer. */
const RATE = 50;

/** Frames longer than this are clamped, so a background tab doesn't jump the floor ahead. */
const MAX_DT = 1 / 20;

const apply = (world: World, commands: Commands[]) =>
  commands.forEach((command) => {
    if (command.robot === 'arm') {
      const arm = world.arms.find(({ id }) => id === command.id);

      if (arm) {
        arm.command = command;
      }
    } else {
      const amr = world.amrs.find(({ id }) => id === command.id);

      if (amr) {
        amr.command = command;
      }
    }
  });

type Props = {
  world: World;
  gauges: Metrics;
  /** The robots on the twin; every other robot stays on its classic brain. */
  twinned: string[];
  /** The bridge's path; without one the robots stay on their classic brains. */
  path?: string;
  onStatus: (status: Status) => void;
};

/**
 * The floor's one loop. Every frame it advances the plant on the commands due
 * by now; every bus tick it sends each robot's sensors to its brain, classic
 * or across the link, whose answers land a tick or more later, as on a real
 * fieldbus.
 */
const Loop: React.FunctionComponent<Props> = ({
  gauges,
  onStatus,
  twinned,
  path,
  world,
}) => {
  const bus = useRef<ReturnType<typeof brains>>(null);
  const clock = useRef({ owed: 0, tick: 0 });

  useEffect(() => {
    const all = brains({ path, onStatus });
    const blocked = map(world);

    world.arms.forEach(({ id }) =>
      all.attach({ type: 'attach', robot: 'arm', id })
    );
    world.amrs.forEach(({ id }) =>
      all.attach({ type: 'attach', robot: 'amr', id, config: { blocked } })
    );
    bus.current = all;

    return () => {
      all.close();
      bus.current = null;
    };
  }, [onStatus, path, world]);

  useEffect(() => {
    bus.current?.use(
      'classic',
      world.arms.map(({ id }) => id).filter((id) => !twinned.includes(id))
    );
    bus.current?.use('physical', twinned);
  }, [path, twinned, world]);

  useFrame((_, delta) => {
    const { current } = clock;

    const started = performance.now();

    apply(world, bus.current?.take(current.tick) ?? []);
    step(world, Math.min(delta, MAX_DT));
    current.owed += delta;

    if (current.owed >= 1 / RATE) {
      current.owed %= 1 / RATE;
      current.tick += 1;
      bus.current?.send(sense(world, current.tick), current.tick);
      gauges.tick(started);

      if (bus.current) {
        gauges.brains(bus.current.counts());
      }
    }

    gauges.frame(delta * 1000, performance.now() - started);
  }, -1);

  return null;
};

export { Loop };
