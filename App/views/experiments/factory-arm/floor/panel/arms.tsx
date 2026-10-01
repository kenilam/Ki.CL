import React from 'react';

// Components
import {
  Button,
  CardContent,
  Heading,
  List,
  ListItem,
  Text,
} from '@/components';

// Icons
import { Ri } from '@/icons';

// Hub
import type { Capacity } from 'arm/hub';

// Context
import { useHub } from '@/views/experiments/factory-arm/floor/hub';

// Constants
import { COPY } from '@/views/experiments/factory-arm/floor/constants';

/** What every arm starts with, as the station does. */
const DEFAULT: Capacity = { targets: 1, period: 60 };

/** How far each press moves a setting. */
const STEP: Capacity = { targets: 1, period: 10 };

/** How many pallets each arm may pick up per period, set here and sent to it. */
const Arms: React.FunctionComponent = () => {
  const { capacities, configure, stations, targets } = useHub();
  const set = configure;

  return (
    <CardContent>
      <List gap='normal'>
        {stations.map(({ arm }) => {
          const capacity = capacities[arm] ?? DEFAULT;
          const working = targets.filter(({ claimed }) => claimed === arm);

          return (
            <ListItem gap='narrow' key={arm}>
              <Heading is='h3' className='kicl-font-size-small'>
                {arm}
                {working.length > 0 &&
                  ` · ${COPY.panel.running}: ${working.map(({ id }) => id).join(', ')}`}
              </Heading>

              <List>
                {(['targets', 'period'] as const).map((field) => (
                  <ListItem
                    alignItems='center'
                    autoFlow='column'
                    frames='auto--max-content--max-content'
                    gap='narrow'
                    key={field}
                  >
                    <Text className='kicl-font-size-small' is='span'>
                      {field === 'targets'
                        ? COPY.panel.capacity
                        : COPY.panel.period}
                      : {capacity[field]}
                    </Text>
                    <Button
                      disabled={capacity[field] <= 0}
                      onClick={() =>
                        set(arm, {
                          ...capacity,
                          [field]: capacity[field] - STEP[field],
                        })
                      }
                      size='small'
                      variant='ghost'
                    >
                      <Ri.RiSubtractLine aria-hidden />
                      <span className='kicl-hidden'>Less</span>
                    </Button>
                    <Button
                      onClick={() =>
                        set(arm, {
                          ...capacity,
                          [field]: capacity[field] + STEP[field],
                        })
                      }
                      size='small'
                      variant='ghost'
                    >
                      <Ri.RiAddLine aria-hidden />
                      <span className='kicl-hidden'>More</span>
                    </Button>
                  </ListItem>
                ))}
              </List>
            </ListItem>
          );
        })}
      </List>
    </CardContent>
  );
};

export { Arms };
