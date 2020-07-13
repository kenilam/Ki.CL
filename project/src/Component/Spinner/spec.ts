import * as CSSTransition from '@/Component/CSSTransition/spec';

export type ClassName = ClassNames<'default' | 'withoverlay'>;

export type Props = CSSTransition.Props & {
  withOverlay?: boolean;
};
