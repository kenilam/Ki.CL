import React from 'react';

// Components
import { Status } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Context
import { useMessageContext } from '@/views/experiments/image-agent/chat/page/conversation/message/context';

// Constants
import { NOTICES } from '@/views/experiments/image-agent/chat/page/conversation/message/constants';

/**
 * A refused or failed turn: a title saying what happened, then the agent's
 * explanation.
 */
const Notice: React.FunctionComponent = () => {
  const { t } = useTranslation('image-agent');
  const { message } = useMessageContext();

  const notice = NOTICES[message.kind];

  if (!notice) {
    return null;
  }

  return (
    <Status
      in
      headingLevel='h3'
      level={notice.level}
      message={message.text ?? undefined}
      title={t('title', { context: notice.context })}
    />
  );
};

export { Notice };
