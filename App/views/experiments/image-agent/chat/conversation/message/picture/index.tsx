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
  title: 'The picture',
};

type Props = {
  url: string;
};

/** A square preview; the magnifier opens the whole picture in a dialog. */
const Picture: React.FunctionComponent<Props> = ({ url }) => {
  const [open, setOpen] = useState(false);

  return (
    <figure className={classNames(CLASS_NAME, 'kicl-position-relative')}>
      <Image
        alt={COPY.alt}
        borderRadius='md'
        className={`${CLASS_NAME}__preview`}
        data={url}
      />
      <Button
        aria-label={COPY.open}
        className={classNames(
          'kicl-inset-block-end-narrow',
          'kicl-inset-inline-end-narrow',
          'kicl-position-absolute'
        )}
        onClick={() => setOpen(true)}
        size='small'
        title={COPY.open}
        variant='secondary'
      >
        <Ri.RiZoomInLine aria-hidden />
      </Button>
      <Dialog
        className={`${CLASS_NAME}__dialog`}
        onClose={() => setOpen(false)}
        open={open}
        title={COPY.title}
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

export { Picture };
