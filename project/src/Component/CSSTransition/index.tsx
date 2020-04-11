import {
  duration,
  getTransitionStyleByType,
} from '@/Component/CSSTransition/Core';
import ICSSTransition from '@/Component/CSSTransition/spec';
import React, { FunctionComponent } from 'react';
import TransitionStyle, { ClassNames as TransitionClassName } from './Style';

const CSSTransition: FunctionComponent<ICSSTransition.Props> = ({
  children,
  type,
  ...props
}) => {
  const Component = getTransitionStyleByType(type);

  return <Component {...props}>{children}</Component>;
};

CSSTransition.defaultProps = {
  type: 'custom',
};

export { duration, TransitionClassName, TransitionStyle };
export default CSSTransition;
