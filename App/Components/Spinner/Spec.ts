import React from 'react';

import { AnimationProps } from '@/Components';

type Position = 'inline' | 'overlay';
type Size = 'small' | 'smaller';

export type Props = Pick<React.HTMLAttributes<HTMLSpanElement>, 'className'> &
  (AnimationProps & {
    position?: Position;
    size?: Size;
    atRoot?: boolean;
    hasBackdrop?: boolean;
  });
