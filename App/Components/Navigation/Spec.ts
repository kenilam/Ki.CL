import React from 'react';

import { AnimationProps, LayoutProps } from '@/Components';

export type Props = React.HTMLAttributes<HTMLElement> &
  LayoutProps & {
    animation?: AnimationProps;
  };
