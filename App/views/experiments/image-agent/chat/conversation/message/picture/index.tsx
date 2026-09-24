import React, { useState } from 'react';

// Libraries
import classNames from 'classnames';

// Icons
import { Ri } from '@/icons';

// Components
import { Button, Dialog, Image } from '@/components';

// Styles
import './styles.scss';

// Constants
import { CLASS_NAME as MESSAGE } from '@/views/experiments/image-agent/chat/conversation/message/constants';

const CLASS_NAME = `${MESSAGE}__picture`;

const COPY = {
  alt: 'The picture the agent drew',
  open: 'View full size',
};

type Props = {
  /** The conversation's title, as the dialog's heading. */
  title: string;
  url: string;
};

/** A square preview; pressing it opens the whole picture in a dialog. */
const Picture: React.FunctionComponent<Props> = ({ title, url }) => {
  const [open, setOpen] = useState(false);

  return (
    <figure className={CLASS_NAME}>
      <Button
        aria-label={COPY.open}
        className={classNames(
          `${CLASS_NAME}__open`,
          'kicl-inline-size-full',
          'kicl-position-relative'
        )}
        onClick={() => setOpen(true)}
        title={COPY.open}
        unstyled
      >
        <Image
          alt={COPY.alt}
          borderRadius='sm'
          className={`${CLASS_NAME}__preview`}
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
          alt={COPY.alt}
          borderRadius='sm'
          className={`${CLASS_NAME}__large`}
          data={open ? url : undefined}
        />
      </Dialog>
    </figure>
  );
};

export { Picture, type Props as PictureProps };
