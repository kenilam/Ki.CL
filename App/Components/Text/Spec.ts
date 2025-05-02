import React from 'react';

import { PropsWithChildren, PropsWithRef } from 'react';

type Is = Extract<keyof React.JSX.IntrinsicElements, 'p' | 'span'>;

type LookLike = Extract<
  keyof React.JSX.IntrinsicElements,
  'h1' | 'h2' | 'h3' | 'h3' | 'h4' | 'h5' | 'h6'
>;

type Variant = 'primary' | 'secondary';

export type TextNode = HTMLParagraphElement & HTMLSpanElement;

export type Props = Required<PropsWithChildren> &
  PropsWithRef<React.HTMLAttributes<TextNode>> & {
    dense?: boolean;
    is?: Is;
    lookLike?: LookLike;
    variant?: Variant;
  };
