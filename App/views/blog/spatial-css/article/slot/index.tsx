import React from 'react';

// Hooks
import { useResponsive } from 'design/hooks';

// Constants
import { SLOT } from '@/views/blog/spatial-css/constants';
import { LOOKS, type Shot } from '@/views/blog/spatial-css/stage/shots';

// Styles
import './styles.scss';

type Props = { id: Shot };

const Slot: React.FunctionComponent<Props> = ({ id }) => {
  const { isNarrow } = useResponsive();

  if (!isNarrow) {
    return null;
  }

  return <div aria-hidden className={SLOT} data-look={LOOKS[id]} />;
};

export { Slot };
