import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Dialog, Heading, Image } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Context
import { useThreadContext } from '@/views/experiments/image-agent/chat/context';
import { useMessageContext } from '@/views/experiments/image-agent/chat/page/conversation/message/context';

// Styles
import './styles.scss';

// Constants
import { toLabel } from '@/views/experiments/image-agent/constants';
import {
  CLASS_NAME,
  toFullId,
} from '@/views/experiments/image-agent/chat/page/conversation/message/bubble/image/picture/constants';

const Full: React.FunctionComponent = () => {
  const { t } = useTranslation('image-agent');
  const { thread } = useThreadContext();
  const { message } = useMessageContext();

  return (
    <Dialog
      className={`${CLASS_NAME}__full`}
      header={
        <Heading dense is='h2' lookLike='h4'>
          {thread ? toLabel(thread) : null}
        </Heading>
      }
      id={toFullId(message.id)}
    >
      <Image
        alt={t('alt')}
        className={classNames('kicl-display-block', 'kicl-inline-size-full')}
        data={message.asset?.url}
      />
    </Dialog>
  );
};

export { Full };
