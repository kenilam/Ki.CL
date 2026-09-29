import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import {
  Badge,
  BadgeLabel,
  Button,
  CardContent,
  Heading,
  Layout,
  List,
  ListItem,
  Text,
} from '@/components';

// Icons
import { Ri } from '@/icons';

// Grid
import { index } from '@/views/experiments/factory-arm/cell/grid/hex';

// Hub
import type { Target } from '@/views/experiments/factory-arm/cell/hub';

// Context
import { useHub } from '@/views/experiments/factory-arm/floor/hub';

// Constants
import { COPY } from '@/views/experiments/factory-arm/floor/constants';

/**
 * Every pallet on the board: where it stands, where it's bound, who has
 * it, and its queue in order. A case moves up the queue or comes off it
 * from here, and the arm working the pallet follows the change.
 */
const Pallets: React.FunctionComponent = () => {
  const { targets } = useHub();

  return (
    <CardContent>
      {targets.length === 0 ? (
        <Text
          className={classNames('kicl-color-grey', 'kicl-font-size-small')}
          is='p'
        >
          {COPY.panel.empty}
        </Text>
      ) : (
        <List gap='normal'>
          {targets.map((target) => (
            <ListItem key={target.id}>
              <Pallet target={target} />
            </ListItem>
          ))}
        </List>
      )}
    </CardContent>
  );
};

/** One pallet's card: its place, its state, and its queue. */
const Pallet: React.FunctionComponent<{ target: Target }> = ({ target }) => {
  const { plan, stations, takeOff } = useHub();

  const name = (hex: { q: number; r: number }) =>
    stations.find((station) => index(station.hex) === index(hex))?.arm ??
    index(hex);

  const swap = (position: number) => {
    const queue = [...target.queue];

    [queue[position - 1], queue[position]] = [
      queue[position],
      queue[position - 1],
    ];
    plan(target.id, { queue });
  };

  return (
    <Layout gap='narrow'>
      <section>
        <Layout
          alignItems='center'
          autoFlow='column'
          frames='auto--max-content'
          gap='narrow'
        >
          <header>
            <Heading is='h3' className='kicl-font-size-small'>
              {target.id} · {name(target.at.parent)} · {COPY.panel.slot}{' '}
              {target.at.slot}
            </Heading>
            <Badge
              variant={target.claimed ? 'default' : 'outline'}
              level={target.claimed ? 'confirm' : 'warning'}
              size='small'
            >
              {target.claimed ? (
                <>
                  <BadgeLabel>{COPY.panel.running}</BadgeLabel>
                  {target.claimed}
                </>
              ) : (
                COPY.panel.unclaimed
              )}
            </Badge>
          </header>
        </Layout>

        <Text className='kicl-font-size-small' is='p'>
          {COPY.panel.destination} {name(target.to)} · {target.cases.length}{' '}
          cases · {COPY.panel.queue} {target.queue.length}
        </Text>

        <List>
          {target.queue.map((id, position) => (
            <ListItem
              key={id}
              alignItems='center'
              autoFlow='column'
              frames='auto--max-content--max-content'
              gap='narrow'
            >
              <Text className='kicl-font-size-small' is='span'>
                {position + 1}. {id}
              </Text>
              <Button
                disabled={position === 0}
                onClick={() => swap(position)}
                size='small'
                variant='ghost'
              >
                <Ri.RiArrowUpLine aria-hidden />
                <Text is='span' className='kicl-hidden' unstyled>
                  Move up
                </Text>
              </Button>
              <Button
                onClick={() =>
                  plan(target.id, {
                    queue: target.queue.filter((one) => one !== id),
                  })
                }
                size='small'
                variant='ghost'
              >
                <Ri.RiCloseLine aria-hidden />
                <Text is='span' className='kicl-hidden' unstyled>
                  {COPY.panel.remove}
                </Text>
              </Button>
            </ListItem>
          ))}
        </List>

        <Button
          onClick={() => takeOff({ kind: 'pallet', id: target.id })}
          size='small'
          variant='tertiary'
          level='error'
        >
          {COPY.panel.remove}
        </Button>
      </section>
    </Layout>
  );
};

export { Pallets };
