import React from 'react';

// Components
import { Status, type StatusProps } from '@/components';

// Spec
import type { Message } from '@/views/experiments/image-agent/chat/conversation/spec';

/** Turns that did not end in a picture, and how each is shown. */
const NOTICES: {
  [kind in string]?: { level: StatusProps['level']; title: string };
} = {
  FAILURE: { level: 'error', title: 'Did not finish' },
  REFUSAL: { level: 'warning', title: 'Can not complete' },
};

type Props = Pick<Message, 'kind' | 'text'>;

/** Whether a turn shows as a notice instead of plain text. */
const isNotice = (kind: Message['kind']) => Boolean(NOTICES[kind]);

/**
 * A refused or failed turn: a title saying what happened, then the agent's
 * explanation.
 */
const Notice: React.FunctionComponent<Props> = ({ kind, text }) => {
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
      title={notice.title}
    />
  );
};

export { isNotice, Notice };
