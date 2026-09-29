import React from 'react';

// Components
import { Badge, Layout, List, ListItem, Text } from '@/components';

// Icons
import { type IconType, Ri } from '@/icons';

// Constants
import { COPY } from '@/views/experiments/factory-arm/floor/constants';

/** The keys and gestures drawn as icons; any other is written as it is. */
const ICONS: Record<string, IconType> = {
  click: Ri.RiCursorLine,
  down: Ri.RiArrowDownLine,
  drag: Ri.RiDragMove2Line,
  left: Ri.RiArrowLeftLine,
  right: Ri.RiArrowRightLine,
  up: Ri.RiArrowUpLine,
};

/** How to work an obstacle: a row per action, its keys as key caps and what it does beside them. */
const Keys: React.FunctionComponent = () => (
  <List>
    {COPY.panel.keys.map(({ does, press }) => (
      <ListItem key={does}>
        <Layout
          alignItems='center'
          autoFlow='column'
          frames='max-content--auto'
          gap='narrow'
        >
          <div>
            <Layout autoFlow='column' gap='narrowest'>
              <div>
                {press.map((key) => {
                  const Icon = ICONS[key];

                  return (
                    <Badge is='kbd' key={key} size='small' variant='outline'>
                      {Icon ? <Icon aria-label={key} /> : key}
                    </Badge>
                  );
                })}
              </div>
            </Layout>
            <Text className='kicl-color-grey kicl-font-size-small' is='span'>
              {does}
            </Text>
          </div>
        </Layout>
      </ListItem>
    ))}
  </List>
);

export { Keys };
