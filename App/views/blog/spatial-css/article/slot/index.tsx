import React from 'react';

// Libraries
import classNames from 'classnames';

// Hooks
import { useResponsive } from 'design/hooks';

// Constants
import { SLOT } from '@/views/blog/spatial-css/constants';
import { LOOKS, type Shot } from '@/views/blog/spatial-css/stage/shots';

// Styles
import './styles.scss';

type Props = { id: Shot };

const Slot: React.FunctionComponent<Props> = ({ id }) => {
  const { isWider } = useResponsive();

  if (!isWider) {
    return null;
  }

  return (
    <div
      aria-hidden
      className={classNames(SLOT, 'kicl-justify-self-stretch')}
      data-look={LOOKS[id]}
    />
  );
};

export { Slot };
