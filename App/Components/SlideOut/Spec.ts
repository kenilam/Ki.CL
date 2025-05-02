import React from 'react';

import { AnimationProps, LayoutProps } from '@/Components';

// Icons
import { IconType } from '@/Icons';

type AnimationStyle = Exclude<
  AnimationProps['animationStyle'],
  'blur' | 'zoom-in' | 'zoom-out'
>;

export type Props = React.DialogHTMLAttributes<HTMLDialogElement> &
  Partial<
    Pick<
      AnimationProps,
      | 'onEnter'
      | 'onEntered'
      | 'onEntering'
      | 'onExit'
      | 'onExited'
      | 'onExiting'
    >
  > &
  LayoutProps & {
    animationStyle?: AnimationStyle;
    closeIcon?: IconType;
    island?: boolean;
  };
