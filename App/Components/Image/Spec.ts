import React from 'react';

export type Props = Omit<
  React.ObjectHTMLAttributes<HTMLObjectElement>,
  'onError' | 'onLoad' | 'onResize'
> &
  Pick<
    React.ImgHTMLAttributes<HTMLImageElement>,
    'alt' | 'loading' | 'onError' | 'onLoad' | 'onResize'
  > & {
    isFullscreen?: boolean;
    placeholder?: React.ReactNode;
  };
