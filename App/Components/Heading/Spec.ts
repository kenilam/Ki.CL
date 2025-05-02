import React, { PropsWithChildren } from 'react';

type Is = Extract<
  keyof React.JSX.IntrinsicElements,
  'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
>;

export type HTMLAttributes = React.JSX.IntrinsicElements[Is];

export type Props = Required<PropsWithChildren> &
  HTMLAttributes & {
    dense?: boolean;
    is?: Is;
  };
