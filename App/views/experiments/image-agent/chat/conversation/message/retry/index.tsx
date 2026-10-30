import React from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Icons
import * as Ri from 'react-icons/ri';

// Components
import { Button } from 'design/components';

type Props = {
  onRetry: () => unknown;
};

/** Beside the person's last message, when the turn after it failed. */
const Retry: React.FunctionComponent<Props> = ({ onRetry }) => {
  const { t } = useTranslation('image-agent');
  const label = t('action', { context: 'retry' });

  return (
    <Button
      aria-label={label}
      onClick={() => void onRetry()}
      title={label}
      type='button'
      variant='tertiary'
    >
      <Ri.RiCornerUpRightLine aria-hidden className='kicl-rtl-mirror' />
    </Button>
  );
};

export { Retry };
