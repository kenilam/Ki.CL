import React from 'react';

// Libraries
import classNames from 'classnames';

// Icons
import * as Tb from 'react-icons/tb';

// Components
import { Layout, Text } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';
import { useTime } from './use-time';

// Constants
import type { PLACES } from '@/views/experiments/daylight/constants';

/**
 * The light at a place, as a small mark before its name, in the drawing's own
 * colours: orange for the sun's side and blue for the moon's.
 */
const MARKS = {
  day: { Icon: Tb.TbSun, colour: 'kicl-color-orange' },
  night: { Icon: Tb.TbMoon, colour: 'kicl-color-blue' },
  twilight: { Icon: Tb.TbSunset, colour: 'kicl-color-red' },
} as const;

type Props = Pick<(typeof PLACES)[number], 'context'>;

const Time: React.FunctionComponent<Props> = ({ context }) => {
  const { i18n, t } = useTranslation('daylight');
  const time = useTime(context);

  if (!time) {
    return null;
  }

  const { Icon, colour } = MARKS[time.light];

  return (
    <Layout alignItems='center' autoFlow='column' gap='narrower'>
      <Text
        className={classNames(
          'kicl-color-grey',
          'kicl-font-family-mono',
          'kicl-text-align-end'
        )}
        dateTime={time.now.toISOString()}
        dense
        is='time'
      >
        <Icon
          aria-label={t('light', { context: time.light })}
          className={colour}
          role='img'
        />
        {new Intl.DateTimeFormat(i18n.language, {
          hour: '2-digit',
          minute: '2-digit',
          timeZone: time.place.timeZone,
        }).format(time.now)}
      </Text>
    </Layout>
  );
};

export { Time };
