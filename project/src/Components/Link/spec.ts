import { ComponentType } from 'react';
import { NavLinkProps } from 'react-router-dom';

declare module Spec {
  type ClassName = ClassNames<'default' | 'active'>;

  type Props = NavLinkProps & {
    className?: string;
    component?: ComponentType<any>;
  };
}

export default Spec;
