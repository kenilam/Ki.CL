import type { ComponentPropsWithoutRef, PropsWithChildren } from 'react';

import { LayoutProps } from '@/components';

type Size = 'large' | 'small';
type Level = 'confirm' | 'error' | 'info' | 'warning';
type Variant = 'primary' | 'secondary' | 'tertiary' | 'ghost';

export type Props = Required<PropsWithChildren> &
  ComponentPropsWithoutRef<'button'> &
  Pick<
    LayoutProps,
    | 'autoFlow'
    | 'alignContent'
    | 'alignItems'
    | 'gap'
    | 'justifyContent'
    | 'justifyItems'
  > & {
    bold?: boolean;
    level?: Level;
    lookLikeHyperLink?: boolean;
    size?: Size;
    unstyled?: boolean;
    variant?: Variant;
  };

export type GetButtonClassNamesProps = Pick<
  Props,
  'bold' | 'className' | 'disabled' | 'level' | 'size' | 'variant' | 'unstyled'
>;
