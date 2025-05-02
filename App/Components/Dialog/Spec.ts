import React from 'react';

import { AnimationProps, LayoutProps } from '@/Components';

// Icons
import { IconType } from '@/Icons';

export type Props = Omit<
  React.DialogHTMLAttributes<HTMLDialogElement>,
  'onClose'
> &
  LayoutProps &
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
  > & {
    closeIcon?: IconType;
    footer?: React.ReactNode;
    isClosable?: boolean;
    dense?: boolean;
    isFullScreen?: boolean;
    isModal?: boolean;
    onCancel?: React.DialogHTMLAttributes<HTMLDialogElement>['onCancel'];
  };
