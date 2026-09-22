import React from 'react';

type BorderRadius = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'max';

/**
 * `alt` is required: pass `''` for a decorative picture.
 *
 * `onResize` is deliberately absent: `resize` does not fire on an `<img>`, and
 * React 19.2 dropped it from `ImgHTMLAttributes` accordingly.
 */
export type Props = Omit<
  React.ComponentPropsWithoutRef<'span'>,
  'onError' | 'onLoad'
> &
  Pick<
    React.ComponentPropsWithoutRef<'img'>,
    'loading' | 'onError' | 'onLoad'
  > &
  Required<Pick<React.ComponentPropsWithoutRef<'img'>, 'alt'>> & {
    borderRadius?: BorderRadius;
    data?: string;
    isFullscreen?: boolean;
    placeholder?: React.ReactNode;
  };
