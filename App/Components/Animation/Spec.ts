import { PropsWithChildren } from 'react';
import { CSSTransitionProps } from 'react-transition-group/CSSTransition';

export type AnimationDuration =
  | 'extreme'
  | 'fast'
  | 'faster'
  | 'fastest'
  | 'instant'
  | 'slow'
  | 'slower'
  | 'slowest';

export type AnimationEasing =
  | 'ease-in'
  | 'ease-out'
  | 'ease-back-in'
  | 'ease-back-out'
  | 'ease-back-in-out'
  | 'ease-circ-in'
  | 'ease-circ-out'
  | 'ease-circ-in-out'
  | 'ease-cubic-in'
  | 'ease-cubic-out'
  | 'ease-cubic-in-out'
  | 'ease-expo-in'
  | 'ease-expo-out'
  | 'ease-expo-in-out'
  | 'ease-quad-in'
  | 'ease-quad-out'
  | 'ease-quad-in-out'
  | 'ease-quart-in'
  | 'ease-quart-out'
  | 'ease-quart-in-out'
  | 'ease-quint-in'
  | 'ease-quint-out'
  | 'ease-quint-in-out'
  | 'ease-sine-in'
  | 'ease-sine-out'
  | 'ease-sine-in-out';

export type AnimationStyle =
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

export type Props = PropsWithChildren<
  Omit<CSSTransitionProps, 'addEndListener' | 'key'> & {
    animationEasing?: AnimationEasing;
    animationKey?: string;
    animationStyle?: AnimationStyle;
    animationDelay?: number;
    animationDuration?: AnimationDuration;
  }
>;
