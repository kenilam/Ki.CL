import { CSSTransitionProps } from 'react-transition-group/CSSTransition';

type AnimationStyle = 'blur' | 'fade' | 'slide-down' | 'zoom-in' | 'zoom-out';

export type AnimationStyles = {
  [name in AnimationStyle]?: AnimationStyle;
};

export type Props = Omit<CSSTransitionProps, 'addEndListener' | 'key'> & {
  animationKey?: CSSTransitionProps['key'];
  animationStyle?: AnimationStyle;
};
