import React from 'react';

import { AnimationProps } from '@/components';

type Position = 'inline' | 'overlay';
/** `inherit` takes its size from the element it sits in. */
type Size = 'small' | 'inherit';

export type Props = Pick<React.HTMLAttributes<HTMLSpanElement>, 'className'> &
  (AnimationProps & {
    position?: Position;
    size?: Size;
    atRoot?: boolean;
    backdrop?: boolean;
    /** Read out by assistive tech while the spinner shows. */
    label?: string;
  });
