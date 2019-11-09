import {ComponentType} from 'react';
import {NavLinkProps} from 'react-router-dom';

declare module ILink {
  interface ClassNames extends IClassNames {
    default: string;
    active: string;
  }
  
  interface Props extends NavLinkProps {
    className?: string;
    component?: ComponentType<any>;
  }
}

export default ILink;
