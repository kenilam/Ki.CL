import * as CSSTransition from '@/Component/Transition/spec';
import { Omit } from '@/spec.helpers';

export type ClassName = ClassNames<'default'>;

export type Props = Omit<CSSTransition.Props, 'type'>;
