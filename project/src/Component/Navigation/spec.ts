import ICSSTransition from '@/Component/CSSTransition/spec';
import ILink from '@/Component/Link/spec';
import {LocationDescriptor} from 'history';
import {MouseEvent} from 'react';

declare module INavigation {
  type Link = ILink.Props;
  type Links = Link[];
  
  interface ClassNames extends IClassNames {
    default: string;
    inline: string;
  }
  
  type ClickHandler = (event: MouseEvent<HTMLAnchorElement>, to: LocationDescriptor) => void;
  
  interface Props extends ICSSTransition.Props {
    className?: string;
    inline?: boolean;
    items?: Links;
    onClick?: ClickHandler;
  }
}

export default INavigation;
