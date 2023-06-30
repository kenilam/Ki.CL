import { CSSTransitionProps } from 'react-transition-group/CSSTransition';

type AnimationStyle =
  | 'blur'
  | 'fade'
  | 'slide-from-bottom'
  | 'slide-from-left'
  | 'slide-from-right'
  | 'slide-from-top'
  | 'zoom-in'
  | 'zoom-out';

export type AnimationStyles = {
  [name in AnimationStyle]?: AnimationStyle;
};

export type Props = Omit<CSSTransitionProps, 'addEndListener' | 'key'> & {
  animationKey?: CSSTransitionProps['key'];
  animationStyle?: AnimationStyle;
  in?: CSSTransitionProps['in'];
};
