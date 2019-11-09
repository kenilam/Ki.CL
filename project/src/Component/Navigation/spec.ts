import ICSSTransition from '@/Component/CSSTransition/spec';
import ILink from '@/Component/Link/spec';

declare module INavigation {
  type Link = ILink.Props;
  type Links = Link[];
  
  interface ClassNames extends IClassNames {
    default: string;
    inline: string;
  }
  
  interface ExtendedProps extends Omit<ILink.Props, 'type'>, ICSSTransition.Props {
  }
  
  interface Props extends Omit<ExtendedProps, 'in' | 'timeout' | 'title' | 'to' | 'type'> {
    inline?: boolean;
    items?: Links;
  }
}

export default INavigation;
