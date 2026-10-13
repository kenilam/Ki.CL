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
  HyperLink,
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
  toPath,
} from '@/views/experiments/daylight/constants';

const CLASS_NAME = `${VIEW}__places`;

const LEVELS = { day: 'warning', night: 'info', twilight: 'error' } as const;

type Props = {
  /** Index of the place the address names. */
  active: number;
  date: Date;
};

/**
 * What the drawing shows, in words: each place's local time and whether it
 * is day there. Each row is a link to that place's address, which turns the
 * globe. The list opens from a button that names the place it faces.
 */
const Places: React.FunctionComponent<Props> = ({ active, date }) => {
  const { i18n, t } = useTranslation('daylight');
  const subsolar = useMemo(() => toSubsolar(date), [date]);

  return (
    <Popover
      className={classNames(
        CLASS_NAME,
        'kicl-inline-size-full',
        'kicl-margin-inline-auto',
        'kicl-max-inline-size-columns-12',
        'kicl-padding-inline-frame',
        'kicl-position-relative'
      )}
    >
      <PopoverTrigger asChild>
        <Button
          after={<Ri.RiArrowDownSLine aria-hidden />}
          size='small'
          variant='primary'
        >
          {t('place', { context: PLACES[active].context })}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        aria-label={t('label', { context: 'places' })}
        placement='block-end'
        variant='ghost'
      >
        <List autoFlow='row' gap='narrower'>
          {PLACES.map((place, index) => {
            const light = toLight(place, subsolar);

            return (
              <ListItem
                alignItems='center'
                autoFlow='column'
                gap='narrow'
                justifyContent='space-between'
                key={place.context}
              >
                <HyperLink
                  aria-current={index === active ? 'page' : undefined}
                  to={toPath(place)}
                >
                  {t('place', { context: place.context })}
                </HyperLink>
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
              </ListItem>
            );
          })}
        </List>
      </PopoverContent>
    </Popover>
  );
};

export { Places };
