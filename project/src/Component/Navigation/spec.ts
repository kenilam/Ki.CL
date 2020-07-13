import * as CSSTransition from '@/Component/CSSTransition/spec';
import * as Child from '@/Component/Link/spec';
import { FunctionComponent } from 'react';

export type ClassName = ClassNames<'default' | 'inline'>;
export type Link = Child.Props;
export type Links = Link[];

export type Extended = Omit<Child.Props, 'type'> & CSSTransition.Props;

export type Props = (
  Omit<FunctionComponent, 'children'> &
  Omit<
    Extended,
    'in' | 'timeout' | 'title' | 'to' | 'type'
  > & {
    inline?: boolean;
    items?: Links;
  }
);
