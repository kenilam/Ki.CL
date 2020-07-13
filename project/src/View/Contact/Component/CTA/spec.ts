import * as CSSTransition from '@/Component/CSSTransition/spec';

export type ClassName = ClassNames<'default'>;

export type Props = Omit<CSSTransition.Props, 'type'> & {
  disabled: boolean;
};
