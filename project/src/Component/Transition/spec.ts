import { CSSTransitionProps } from 'react-transition-group/CSSTransition';

export type ClassName = (
  ClassNames<
    | 'default'
    | 'appear-done'
    | 'enter-done'
    | 'exit-done'
    | 'fade'
    | 'slide-from-bottom'
    | 'slide-from-left'
    | 'slide-from-right'
    | 'slide-from-top'
    | 'zoom-in'
    | 'zoom-out'
  >
)

export type Transition = (
  | 'fade'
  | 'slide-from-bottom'
  | 'slide-from-left'
  | 'slide-from-right'
  | 'slide-from-top'
  | 'zoom-in'
  | 'zoom-out'
)

export type Props = Omit<CSSTransitionProps, 'addEndListener' | 'key' | 'timeout'> & {
  component?: React.ElementType,
  transition?: Transition
  transitionKey?: React.Key
}