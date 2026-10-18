import React from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Components
import { Status, type StatusProps } from 'design/components';

// Spec
import type { Message } from '@/views/experiments/image-agent/chat/conversation/spec';

/** Turns that did not end in a picture, and how each is shown. */
const NOTICES: {
  [kind in string]?: Pick<StatusProps, 'level'> & {
    context: 'failure' | 'refusal';
  };
} = {
  FAILURE: { context: 'failure', level: 'error' },
  REFUSAL: { context: 'refusal', level: 'warning' },
};

type Props = Pick<Message, 'kind' | 'text'>;

/** Whether a turn shows as a notice instead of plain text. */
const isNotice = (kind: Message['kind']) => Boolean(NOTICES[kind]);

/**
 * A refused or failed turn: a title saying what happened, then the agent's
 * explanation.
 */
const Notice: React.FunctionComponent<Props> = ({ kind, text }) => {
  const { t } = useTranslation('image-agent');

  const notice = NOTICES[kind];

  if (!notice) {
    return null;
  }

  return (
    <Status
      in
      headingLevel='h3'
      level={notice.level}
      message={text ?? undefined}
      title={t('title', { context: notice.context })}
    />
  );
};

export { isNotice, Notice };
