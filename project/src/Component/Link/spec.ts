import { ComponentType } from 'react';
import { NavLinkProps } from 'react-router-dom';

declare namespace ILink {
  type ClassNames = IClassNames<'default' | 'active'>;

  interface Props extends NavLinkProps {
    className?: string;
    component?: ComponentType<any>;
  }
}

export default ILink;
