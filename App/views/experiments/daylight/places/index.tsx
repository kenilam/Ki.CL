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

/**
 * The light at a place, as a small mark before its name, in the drawing's own
 * colours: orange for the sun's side and blue for the moon's.
 */
const MARKS = {
  day: { Icon: Ri.RiSunLine, colour: 'kicl-color-orange' },
  night: { Icon: Ri.RiMoonLine, colour: 'kicl-color-blue' },
  twilight: { Icon: Ri.RiSunFoggyLine, colour: 'kicl-color-red' },
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
        <Button after={<Ri.RiArrowDownSLine aria-hidden />} variant='primary'>
          {t('place', { context: PLACES[active].context })}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        aria-label={t('label', { context: 'places' })}
        placement='block-end'
        variant='ghost'
      >
        <List alignContent='stretch' autoFlow='row'>
          {PLACES.map((place, index) => {
            const light = toLight(place, subsolar);
            const { Icon, colour } = MARKS[light];

            return (
              <ListItem
                alignItems='center'
                autoFlow='column'
                display='grid'
                frames='1fr--max-content'
                justifyItems='stretch'
                key={place.context}
              >
                <HyperLink
                  before={
                    <Icon
                      aria-label={t('light', { context: light })}
                      className={colour}
                      role='img'
                    />
                  }
                  aria-current={index === active ? 'page' : undefined}
                  className='kicl-inline-size-full'
                  to={toPath(place)}
                  lookLikeButton
                  variant={active === index ? 'ghost' : 'secondary'}
                >
                  {t('place', { context: place.context })}
                </HyperLink>
                <Text
                  className={classNames(
                    'kicl-color-grey',
                    'kicl-font-family-mono',
                    'kicl-font-size-small',
                    'kicl-text-align-end',
                    colour
                  )}
                  dateTime={date.toISOString()}
                  dense
                  is='time'
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
