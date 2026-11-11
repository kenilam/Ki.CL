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
import { usePictureContext } from '@/views/experiments/image-agent/chat/page/conversation/message/bubble/image/picture/context';

// Constants
import { toLabel } from '@/views/experiments/image-agent/constants';
import { CLASS_NAME } from '@/views/experiments/image-agent/chat/page/conversation/message/bubble/image/picture/constants';

const Full: React.FunctionComponent = () => {
  const { t } = useTranslation('image-agent');
  const { thread } = useThreadContext();
  const { message } = useMessageContext();
  const { open, setOpen } = usePictureContext();

  return (
    <Dialog
      className={`${CLASS_NAME}__dialog`}
      header={
        <Heading dense is='h2' lookLike='h4'>
          {thread ? toLabel(thread) : null}
        </Heading>
      }
      onClose={() => {
        setOpen(false);
      }}
      open={open}
    >
      <Image
        alt={t('alt')}
        className={classNames('kicl-display-block', 'kicl-inline-size-full')}
        data={open ? message.asset?.url : undefined}
      />
    </Dialog>
  );
};

export { Full };
