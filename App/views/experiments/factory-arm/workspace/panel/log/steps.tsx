import React from 'react';

// Libraries
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

// Components
import { Layout, List, ListItem, Text } from 'design/components';

// Icons
import * as Ri from 'react-icons/ri';

// Context
import type { Entry } from '@/views/experiments/factory-arm/setup';

/** A step's time of day, to the second. */
const time = (at: number, language: string) =>
  new Date(at).toLocaleTimeString(language, {
    hour12: false,
  });

type Props = { entries: Entry[] };

/** Steps in the log, newest first, each with its time and a dot for how it went. */
const Steps: React.FunctionComponent<Props> = ({ entries }) => {
  const { i18n, t } = useTranslation('factory-arm');

  return (
    <List gap='narrower' is='ol'>
      {entries.map(({ at, id, level, note }) => (
        <Layout
          alignItems='baseline'
          autoFlow='column'
          frames='max-content--1fr'
          gap='narrow'
          key={id}
        >
          <ListItem>
            <Text
              className={classNames('kicl-color-grey', 'kicl-font-family-mono')}
              dateTime={new Date(at).toISOString()}
              is='time'
            >
              {time(at, i18n.language)}
            </Text>
            <Text is='span'>
              <Ri.RiCheckboxBlankCircleFill
                aria-hidden
                className={`kicl-color-${level ?? 'grey'}`}
              />{' '}
              {t('step', { ...note.values, context: note.context })}
            </Text>
          </ListItem>
        </Layout>
      ))}
    </List>
  );
};

export { Steps, time };
