import React from 'react';

// Components
import { Layout, List, ListItem, Text } from '@/components';

// Icons
import { Ri } from '@/icons';

// Context
import type { Entry } from '@/views/experiments/factory-arm/setup';

/** A step's time of day, to the second. */
const time = (at: number) =>
  new Date(at).toLocaleTimeString([], {
    hour12: false,
  });

type Props = { entries: Entry[] };

/** Steps in the log, newest first, each with its time and a dot for how it went. */
const Steps: React.FunctionComponent<Props> = ({ entries }) => (
  <List gap='narrower' is='ol'>
    {entries.map(({ at, id, level, text }) => (
      <ListItem key={id}>
        <Layout
          alignItems='baseline'
          autoFlow='column'
          frames='max-content--1fr'
          gap='narrow'
        >
          <div>
            <time className='kicl-color-grey kicl-font-family-mono kicl-font-size-smaller'>
              {time(at)}
            </time>
            <Text className='kicl-font-size-small' is='span'>
              <Ri.RiCheckboxBlankCircleFill
                aria-hidden
                className={`kicl-color-${level ?? 'grey'}`}
              />{' '}
              {text}
            </Text>
          </div>
        </Layout>
      </ListItem>
    ))}
  </List>
);

export { Steps, time };
