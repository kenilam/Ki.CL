import ICSSTransition from '@/Component/CSSTransition/spec';
import ILink from '@/Component/Link/spec';

declare namespace INavigation {
  type ClassNames = IClassNames<'default' | 'inline'>;
  type Link = ILink.Props;
  type Links = Link[];

  interface ExtendedProps
    extends Omit<ILink.Props, 'type'>,
      ICSSTransition.Props {}

  interface Props
    extends Omit<ExtendedProps, 'in' | 'timeout' | 'title' | 'to' | 'type'> {
    inline?: boolean;
    items?: Links;
  }
}

export default INavigation;
