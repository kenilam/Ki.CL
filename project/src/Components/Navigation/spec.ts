import CSSTransition from '@/Components/CSSTransition/spec';
import Child from '@/Components/Link/spec';

declare module Spec {
  type ClassName = ClassNames<'default' | 'inline'>;
  type Link = Child.Props;
  type Links = Link[];

  type ExtendedProps = Omit<Child.Props, 'type'> & CSSTransition.Props;

  type Props = Omit<
    ExtendedProps,
    'in' | 'timeout' | 'title' | 'to' | 'type'
  > & {
    inline?: boolean;
    items?: Links;
  };
}

export default Spec;
