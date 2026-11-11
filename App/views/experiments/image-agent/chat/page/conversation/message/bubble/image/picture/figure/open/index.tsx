import React from 'react';

// Libraries
import classNames from 'classnames';

// Icons
import * as Tb from 'react-icons/tb';

// Components
import { Button, Image } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Context
import { useMessageContext } from '@/views/experiments/image-agent/chat/page/conversation/message/context';
import { usePictureContext } from '@/views/experiments/image-agent/chat/page/conversation/message/bubble/image/picture/context';

// Constants
import { CLASS_NAME } from '@/views/experiments/image-agent/chat/page/conversation/message/bubble/image/picture/constants';

const Open: React.FunctionComponent = () => {
  const { t } = useTranslation('image-agent');
  const { message } = useMessageContext();
  const { setOpen } = usePictureContext();

  return (
    <Button
      aria-label={t('action', { context: 'open' })}
      className={classNames(
        `${CLASS_NAME}__open`,
        'kicl-cursor-zoom-in',
        'kicl-display-block',
        'kicl-inline-size-full',
        'kicl-position-relative'
      )}
      onClick={() => {
        setOpen(true);
      }}
      title={t('action', { context: 'open' })}
      unstyled
    >
      <Image
        alt={t('alt')}
        className={classNames(
          `${CLASS_NAME}__preview`,
          'kicl-aspect-ratio-square',
          'kicl-display-block',
          'kicl-inline-size-full'
        )}
        data={message.asset?.url}
      />
      <Tb.TbZoomIn
        aria-hidden
        className={classNames(
          'kicl-font-size-medium',
          'kicl-inset-block-end',
          'kicl-inset-inline-end',
          'kicl-position-absolute'
        )}
      />
    </Button>
  );
};

export { Open };
