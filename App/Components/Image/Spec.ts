import React from 'react';

type BorderRadius = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'max';

/**
 * `onResize` is deliberately absent: `resize` does not fire on an `<img>`, and
 * React 19.2 dropped it from `ImgHTMLAttributes` accordingly. It was only ever
 * forwarded here, so nothing was listening.
 */
export type Props = Omit<
  React.ObjectHTMLAttributes<HTMLObjectElement>,
  'onError' | 'onLoad'
> &
  Pick<
    React.ImgHTMLAttributes<HTMLImageElement>,
    'alt' | 'loading' | 'onError' | 'onLoad'
  > & {
    isFullscreen?: boolean;
    placeholder?: React.ReactNode;
    borderRadius?: BorderRadius;
  };
