import {ElementType} from 'react';
import {NavLinkProps} from 'react-router-dom';

declare module ILink {
  interface ClassNames extends IClassNames {
  }
  
  interface Props extends NavLinkProps {
    className?: string;
    component?: ElementType;
  }
}

export = ILink;
