import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { ListItem, Text } from 'design/components';

// Icons
import * as Tb from 'react-icons/tb';

// Hooks
import { useTranslation } from 'design/hooks';

// Context
import { useLogContext } from '@/views/experiments/factory-arm/log-context';
import { type Entry } from '@/views/experiments/factory-arm/spec';

// Helpers
import { time } from '@/views/experiments/factory-arm/workspace/panel/log/time';

type Props = Pick<Entry, 'id'>;

/** One step, with its time and a dot for how it went. */
const Step: React.FunctionComponent<Props> = ({ id }) => {
  const { i18n, t } = useTranslation('factory-arm');
  const { log } = useLogContext();
  const entry = log.find((each) => {
    return each.id === id;
  });

  if (!entry) {
    return null;
  }

  const { at, level, note } = entry;

  return (
    <ListItem
      alignItems='baseline'
      autoFlow='column'
      frames='max-content--1fr'
      gap='narrow'
    >
      <Text
        className={classNames('kicl-color-grey', 'kicl-font-family-mono')}
        dateTime={new Date(at).toISOString()}
        is='time'
      >
        {time(at, i18n.language)}
      </Text>
      <Text is='span'>
        <Tb.TbCircleFilled
          aria-hidden
          className={`kicl-color-${level ?? 'grey'}`}
        />{' '}
        {t('step', { ...note.values, context: note.context })}
      </Text>
    </ListItem>
  );
};

export { Step };
