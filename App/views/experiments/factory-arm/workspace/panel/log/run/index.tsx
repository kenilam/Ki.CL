import React from 'react';

// Components
import { Details, Text } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Context
import { useLogContext } from '@/views/experiments/factory-arm/log-context';
import { type Entry } from '@/views/experiments/factory-arm/spec';

// Partials
import { Steps } from '@/views/experiments/factory-arm/workspace/panel/log/steps';

// Helpers
import { time } from '@/views/experiments/factory-arm/workspace/panel/log/time';

type Props = {
  /** The run's number in the log. */
  id: Entry['run'];
};

/** An earlier run, folded into a disclosure named by how it started, to open when wanted. */
const Run: React.FunctionComponent<Props> = ({ id: run }) => {
  const { i18n, t } = useTranslation('factory-arm');
  const { log } = useLogContext();
  const entries = log.filter((entry) => entry.run === run);
  // Oldest last: the step that started that run. A run the page opened with wasn't started by a step.
  const first = entries[entries.length - 1];
  const name = first.start
    ? t('step', { ...first.note.values, context: first.note.context })
    : t('run', { context: 'opened' });

  return (
    <Details
      summary={
        <Text dense is='span'>
          {t('run', {
            context: 'summary',
            count: entries.length,
            name,
            time: time(first.at, i18n.language),
          })}
        </Text>
      }
    >
      <Steps run={run} />
    </Details>
  );
};

export { Run };
