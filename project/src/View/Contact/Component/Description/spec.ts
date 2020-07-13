import * as CSSTransition from '@/Component/Transition/spec';

export type ClassName = ClassNames<'default'>;

export type Props = Omit<CSSTransition.Props, 'type'>;
