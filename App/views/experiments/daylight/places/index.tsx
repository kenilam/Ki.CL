import React, { useMemo } from 'react';

// Libraries
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

// Icons
import * as Ri from 'react-icons/ri';

// Components
import {
  Badge,
  Button,
  List,
  ListItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
} from 'design/components';

// Utilities
import { toLight, toSubsolar } from '@/views/experiments/daylight/sun';

// Constants
import {
  CLASS_NAME as VIEW,
  PLACES,
} from '@/views/experiments/daylight/constants';

const CLASS_NAME = `${VIEW}__places`;

const LEVELS = { day: 'warning', night: 'info', twilight: 'error' } as const;

type Props = {
  /** Index of the place the globe was turned to, or -1. */
  active: number;
  date: Date;
  onPick(index: number): void;
};

/**
 * What the drawing shows, in words: each place's local time and whether it
 * is day there. Picking one turns the globe to it. The list opens from a
 * button, which names the place picked, so it never covers the drawing
 * unasked.
 */
const Places: React.FunctionComponent<Props> = ({ active, date, onPick }) => {
  const { i18n, t } = useTranslation('daylight');
  const subsolar = useMemo(() => toSubsolar(date), [date]);

  return (
    <Popover
      className={classNames(
        CLASS_NAME,
        'kicl-inline-size-full',
        'kicl-margin-inline-auto',
        'kicl-max-inline-size-columns-12',
        'kicl-padding-block-end-wide',
        'kicl-padding-inline-frame',
        'kicl-position-relative'
      )}
    >
      <PopoverTrigger asChild>
        <Button
          after={<Ri.RiArrowUpSLine aria-hidden />}
          size='small'
          variant='secondary'
        >
          {active < 0
            ? t('label', { context: 'places' })
            : t('place', { context: PLACES[active].context })}
        </Button>
      </PopoverTrigger>
      <PopoverContent placement='block-start' variant='ghost'>
        <List autoFlow='row' gap='narrower'>
          {PLACES.map((place, index) => {
            const light = toLight(place, subsolar);

            return (
              <ListItem key={place.context}>
                <Button
                  aria-pressed={index === active}
                  autoFlow='column'
                  className='kicl-inline-size-full'
                  gap='narrow'
                  justifyContent='space-between'
                  onClick={() => onPick(index)}
                  size='small'
                  variant={index === active ? 'secondary' : 'ghost'}
                >
                  <Text dense is='span'>
                    {t('place', { context: place.context })}
                  </Text>
                  <Text dense is='span'>
                    {new Intl.DateTimeFormat(i18n.language, {
                      hour: '2-digit',
                      minute: '2-digit',
                      timeZone: place.timeZone,
                    }).format(date)}
                  </Text>
                  <Badge level={LEVELS[light]} size='small' variant='outline'>
                    {t('light', { context: light })}
                  </Badge>
                </Button>
              </ListItem>
            );
          })}
        </List>
      </PopoverContent>
    </Popover>
  );
};

export { Places };
