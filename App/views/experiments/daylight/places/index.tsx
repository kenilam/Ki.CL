import React, { useMemo } from 'react';

// Libraries
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

// Components
import {
  Badge,
  Button,
  Card,
  Details,
  List,
  ListItem,
  Text,
} from 'design/components';

// Hooks
import { useResponsive } from 'design/hooks';

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
 * What the window shows, in words: each place's local time and whether it
 * is day there. Picking one turns the globe to it. Closed on phones, where
 * it would cover the window.
 */
const Places: React.FunctionComponent<Props> = ({ active, date, onPick }) => {
  const { i18n, t } = useTranslation('daylight');
  const { isMobile } = useResponsive();
  const subsolar = useMemo(() => toSubsolar(date), [date]);

  return (
    <Card
      className={classNames(
        CLASS_NAME,
        'kicl-inset-block-end',
        'kicl-inset-inline-start',
        'kicl-position-absolute'
      )}
      size={3}
      variant='ghost'
    >
      <Details
        gap='narrow'
        open={isMobile ? undefined : true}
        summary={t('label', { context: 'places' })}
      >
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
      </Details>
    </Card>
  );
};

export { Places };
