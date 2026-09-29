import React from 'react';

// Components
import {
  Badge,
  Button,
  Card,
  CardContent,
  Details,
  Heading,
  Layout,
  Text,
} from '@/components';

// Icons
import { Ri } from '@/icons';

// Grid
import { index } from '@/views/experiments/factory-arm/cell/grid/hex';

// Context
import {
  type Simulation,
  useHub,
} from '@/views/experiments/factory-arm/floor/hub';

// Partials
import { Arms } from './arms';
import { Obstacles } from './obstacles';
import { Pallets } from './pallets';

// Drag
import { useDrag } from '@/views/experiments/factory-arm/floor/scene/drag';

// Constants
import { COPY } from '@/views/experiments/factory-arm/floor/constants';
import classNames from 'classnames';

/**
 * Every floor there is to play, one group each: its name, a button that
 * starts it, or starts it over when it's the one playing, and its pallets
 * and arms folded under it. The one playing shows them live, and goes red
 * when an arm's alarm has stopped the floor.
 */
const Simulations: React.FunctionComponent = () => {
  const { active, finished, simulations, stopped } = useHub();

  return (
    <Layout alignContent='start' gap='normal'>
      <CardContent className='kicl-padding-block-end'>
        {simulations.map((simulation) => (
          <Group
            key={simulation.id}
            chosen={simulation.id === active.id}
            playing={simulation.id === active.id && !finished}
            simulation={simulation}
            stopped={simulation.id === active.id && stopped}
          />
        ))}
      </CardContent>
    </Layout>
  );
};

/** One simulation: play or start over, and what's in it. `chosen` is the one on the floor; `playing` while it still has work; `stopped` when an alarm holds it. */
const Group: React.FunctionComponent<{
  chosen: boolean;
  playing: boolean;
  simulation: Simulation;
  stopped: boolean;
}> = ({ chosen, playing, simulation, stopped }) => {
  const { coming, discard, obstacles, play } = useHub();
  const { grab } = useDrag();
  const standing = chosen ? obstacles : (simulation.obstacles ?? []);
  const name = (hex: { q: number; r: number }) =>
    simulation.cells.find((cell) => index(cell.hex) === index(hex))?.arm ??
    index(hex);

  const level = stopped ? 'error' : playing ? 'confirm' : undefined;

  return (
    <Card level={level} variant='ghost'>
      <Details
        open={chosen}
        summary={
          <Layout
            alignItems='center'
            autoFlow='column'
            gap='narrow'
            justifyContent='space-between'
          >
            <div>
              <Button
                aria-pressed={playing}
                className={classNames({
                  'kicl-pointer-event-none': playing && !stopped,
                })}
                onClick={(event) => {
                  // In the summary: the click plays, and doesn't fold the group.
                  event.preventDefault();
                  event.stopPropagation();

                  if (playing) {
                    return;
                  }

                  play(simulation);
                }}
                variant={playing && !stopped ? 'secondary' : 'ghost'}
                size='small'
              >
                {playing && !stopped ? (
                  <Ri.RiLoader4Line aria-hidden className='is-revolving' />
                ) : (
                  <Ri.RiPlayFill aria-hidden />
                )}
                <span className='kicl-hidden'>
                  {playing ? COPY.panel.running : COPY.panel.play}
                </span>
              </Button>
              <Layout alignItems='center' autoFlow='column' gap='narrow'>
                <Heading is='h4' dense>
                  {simulation.name}
                  {level ? (
                    <Badge level={level} size='small' variant='ghost'>
                      {stopped ? COPY.panel.stopped : COPY.panel.running}
                    </Badge>
                  ) : null}
                </Heading>
              </Layout>
            </div>
          </Layout>
        }
      >
        <Card>
          <Details
            summary={
              <Text className='kicl-font-size-small' is='span'>
                {COPY.panel.pallets} · {simulation.pallets.length}
              </Text>
            }
          >
            {chosen ? (
              <Pallets />
            ) : (
              <Text className='kicl-font-size-small' is='p'>
                {simulation.pallets
                  .map(
                    ({ cases, id, at, to }) =>
                      `${id} on ${name(at.parent)}, ${cases.length} cases, ${COPY.panel.destination.toLowerCase()} ${name(to)}`
                  )
                  .join('; ')}
              </Text>
            )}
          </Details>

          <Details
            summary={
              <Text className='kicl-font-size-small' is='span'>
                {COPY.panel.arms} · {simulation.cells.length}
              </Text>
            }
          >
            {chosen ? (
              <Arms />
            ) : (
              <Text className='kicl-font-size-small' is='p'>
                {simulation.cells.map(({ arm }) => arm).join(', ')}
              </Text>
            )}
          </Details>

          <Details
            summary={
              <Text className='kicl-font-size-small' is='span'>
                {COPY.panel.obstacles} · {standing.length}
              </Text>
            }
          >
            {chosen ? (
              <Obstacles />
            ) : (
              <Text className='kicl-font-size-small' is='p'>
                {standing.map(({ id }) => id).join(', ') || COPY.panel.empty}
              </Text>
            )}
          </Details>

          {chosen && (
            <Layout
              autoFlow='column'
              gap='narrow'
              justifyContent='stretch'
              justifyItems='center'
            >
              <div>
                <Button
                  onClick={() => grab('arm', coming.arm, true)}
                  size='small'
                  variant='secondary'
                >
                  <Ri.RiAddLine aria-hidden />
                  {COPY.panel.addArm}
                </Button>
                <Button
                  onClick={() => grab('pallet', coming.pallet, true)}
                  size='small'
                  variant='secondary'
                >
                  <Ri.RiAddLine aria-hidden />
                  {COPY.panel.addPallet}
                </Button>

                {simulation.saved && !chosen && (
                  <Button
                    onClick={() => discard(simulation.id)}
                    size='small'
                    variant='ghost'
                  >
                    {COPY.panel.remove}
                  </Button>
                )}
              </div>
            </Layout>
          )}
        </Card>
      </Details>
    </Card>
  );
};

export { Simulations };
