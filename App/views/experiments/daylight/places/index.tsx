import React, { useMemo } from 'react';

// Libraries
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

// Icons
import * as Ri from 'react-icons/ri';

// Components
import {
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

/** The light at a place, as a small mark before its name. */
const MARKS = {
  day: Ri.RiSunLine,
  night: Ri.RiMoonLine,
  twilight: Ri.RiSunFoggyLine,
} as const;

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
        <List autoFlow='row' gap='narrow'>
          {PLACES.map((place, index) => {
            const light = toLight(place, subsolar);
            const Mark = MARKS[light];

            return (
              <ListItem
                alignItems='center'
                autoFlow='column'
                display='grid'
                frames='max-content--auto--max-content'
                gap='wide'
                key={place.context}
              >
                <Mark aria-label={t('light', { context: light })} role='img' />
                <HyperLink
                  aria-current={index === active ? 'page' : undefined}
                  to={toPath(place)}
                >
                  {t('place', { context: place.context })}
                </HyperLink>
                <Text
                  className={classNames(
                    'kicl-color-grey',
                    'kicl-font-size-small'
                  )}
                  dense
                  is='span'
                >
                  {new Intl.DateTimeFormat(i18n.language, {
                    hour: '2-digit',
                    minute: '2-digit',
                    timeZone: place.timeZone,
                  }).format(date)}
                </Text>
              </ListItem>
            );
          })}
        </List>
      </PopoverContent>
    </Popover>
  );
};

export { Places };
