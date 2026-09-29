import React from 'react';

// Components
import {
  Badge,
  getButtonClassNames,
  Layout,
  List,
  ListItem,
  Text,
} from '@/components';

// Icons
import { Ri } from '@/icons';

// Constants
import { COPY } from '@/views/experiments/factory-arm/floor/constants';

/** The keys and gestures drawn as icons; any other is written as it is. */
const ICONS = {
  click: <Ri.RiCursorLine aria-label='click' />,
  del: <Ri.RiDeleteBack2Line aria-label='del' />,
  down: <Ri.RiArrowDownLine aria-label='down' />,
  drag: <Ri.RiDragMove2Line aria-label='drag' />,
  left: <Ri.RiArrowLeftLine aria-label='left' />,
  right: <Ri.RiArrowRightLine aria-label='right' />,
  shift: (
    <>
      <Text is='span' className='kicl-line-height-narrower'>
        ⇧
      </Text>
      <Ri.RiAddLine />
    </>
  ),
  up: <Ri.RiArrowUpLine aria-label='up' />,
} as const;

/** How to work an obstacle: a row per action, its keys as key caps and what it does beside them. */
const Keys: React.FunctionComponent = () => (
  <List className='kicl-padding-block-narrow' gap='none'>
    {COPY.panel.obstacle.keys.map(({ does, press }) => (
      <ListItem
        autoFlow='column'
        className={getButtonClassNames({ variant: 'tertiary' })}
        key={does}
        gap='narrow'
      >
        <Layout
          alignItems='center'
          autoFlow='column'
          frames='max-content--auto'
          gap='narrower'
        >
          <span>
            {press.map((key) => {
              const Icon = ICONS[key];

              return (
                <Badge variant='outline' key={key} size='small'>
                  {Icon || key}
                </Badge>
              );
            })}
          </span>
        </Layout>
        <Text className='kicl-font-size-small' variant='secondary'>
          {does}
        </Text>
      </ListItem>
    ))}
  </List>
);

export { Keys };
