import React from 'react';

import { PropsWithChildren, PropsWithRef } from 'react';

// Routes
import { NavLinkProps } from '@/Router';

// Components
import { GetButtonClassNamesProps } from '@/Components';

export type Props = Required<PropsWithChildren> &
  GetButtonClassNamesProps &
  PropsWithRef<NavLinkProps> & {
    after?: React.ReactNode;
    before?: React.ReactNode;
    lookLikeButton?: boolean;
    unstyled?: boolean;
  };

export type GetHyperLinkClassNamesProps = Pick<Props, 'className' | 'unstyled'>;
