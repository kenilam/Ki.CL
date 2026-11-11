import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Text } from 'design/components';

// Context
import { useThreadContext } from '@/views/experiments/image-agent/chat/context';

// Hooks
import { useTranslation } from 'design/hooks';
import { useElapsed } from './use-elapsed';

/** Seconds before the elapsed time shows. */
const SHOW_ELAPSED_AFTER = 3;

const Elapsed: React.FunctionComponent = () => {
  const { t } = useTranslation('image-agent');
  const { thread } = useThreadContext();
  const last = thread?.messages.at(-1);
  const seconds = useElapsed(last?.role === 'USER' ? last.at : undefined);

  if (seconds < SHOW_ELAPSED_AFTER) {
    return null;
  }

  return (
    <Text
      aria-hidden
      dense
      is='span'
      className={classNames('kicl-font-family-mono', 'kicl-color-grey-700')}
    >
      {t('elapsed', { seconds })}
    </Text>
  );
};

export { Elapsed };
