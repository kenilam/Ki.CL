import React from 'react';

import { PropsWithChildren } from 'react';

// Routes
import { NavLinkProps } from '@/router';

// Components
import { GetButtonClassNamesProps } from '@/components';

export type Props = Required<PropsWithChildren> &
  GetButtonClassNamesProps &
  NavLinkProps & {
    after?: React.ReactNode;
    before?: React.ReactNode;
    lookLikeButton?: boolean;
    unstyled?: boolean;
  };

export type GetHyperLinkClassNamesProps = Pick<Props, 'className' | 'unstyled'>;
