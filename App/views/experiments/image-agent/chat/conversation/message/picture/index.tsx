import React, { useState } from 'react';

// Libraries
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

// Icons
import * as Ri from 'react-icons/ri';

// Components
import { Button, Dialog, Image } from 'design/components';

// Hooks
import { useResponsive } from 'design/hooks';

// Styles
import './styles.scss';

// Constants
import { CLASS_NAME as MESSAGE } from '@/views/experiments/image-agent/chat/conversation/message/constants';

const CLASS_NAME = `${MESSAGE}__picture`;

type Props = {
  /** The conversation's title, as the dialog's heading. */
  title: string;
  url: string;
};

/** A square preview; pressing it opens the whole picture in a dialog. */
const Picture: React.FunctionComponent<Props> = ({ title, url }) => {
  const { t } = useTranslation('image-agent');

  const [open, setOpen] = useState(false);
  const { isMobile } = useResponsive();

  return (
    <figure
      className={classNames(
        CLASS_NAME,
        isMobile ? 'kicl-inline-size-columns-2' : 'kicl-inline-size-columns-3'
      )}
    >
      <Button
        aria-label={t('action', { context: 'open' })}
        className={classNames(
          `${CLASS_NAME}__open`,
          'kicl-cursor-zoom-in',
          'kicl-display-block',
          'kicl-inline-size-full',
          'kicl-position-relative'
        )}
        onClick={() => setOpen(true)}
        title={t('action', { context: 'open' })}
        unstyled
      >
        <Image
          alt={t('alt')}
          borderRadius='sm'
          className={classNames(
            `${CLASS_NAME}__preview`,
            'kicl-aspect-ratio-square',
            'kicl-display-block',
            'kicl-inline-size-full'
          )}
          data={url}
        />
        <Ri.RiZoomInLine
          aria-hidden
          className={classNames(
            'kicl-font-size-medium',
            'kicl-inset-block-end',
            'kicl-inset-inline-end',
            'kicl-position-absolute'
          )}
        />
      </Button>
      <Dialog
        className={`${CLASS_NAME}__dialog`}
        onClose={() => setOpen(false)}
        open={open}
        title={title}
      >
        <Image
          alt={t('alt')}
          borderRadius='sm'
          className={classNames('kicl-display-block', 'kicl-inline-size-full')}
          data={open ? url : undefined}
        />
      </Dialog>
    </figure>
  );
};

export { Picture, type Props as PictureProps };
