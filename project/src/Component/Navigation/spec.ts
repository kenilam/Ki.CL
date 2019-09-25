import ICSSTransition from '@/Component/CSSTransition/spec';
import ILink from '@/Component/Link/spec';

declare module INavigation {
  type Link = ILink.Props;
  type Links = Link[];
  
  interface ClassNames extends IClassNames {
    default: string;
    inline: string;
  }
  
  interface Props extends ICSSTransition.Props {
    className?: string;
    inline?: boolean;
    items?: Links;
  }
}

export default INavigation;
