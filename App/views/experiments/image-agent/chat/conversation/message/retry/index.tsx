import React from 'react';

// Icons
import { Ri } from '@/icons';

// Components
import { Button } from '@/components';

const COPY = {
  retry: 'Ask this again',
};

type Props = {
  onRetry: () => unknown;
};

/** Beside the person's last message, when the turn after it failed. */
const Retry: React.FunctionComponent<Props> = ({ onRetry }) => (
  <Button
    aria-label={COPY.retry}
    onClick={() => void onRetry()}
    title={COPY.retry}
    type='button'
    variant='tertiary'
  >
    <Ri.RiCornerUpRightLine aria-hidden />
  </Button>
);

export { Retry };
