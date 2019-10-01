import ICSSTransition from '@/Component/CSSTransition/spec';
import React, {FunctionComponent} from 'react';
import Core, {duration} from './Core';
import * as TransitionStyle from './Style';

const CSSTransition: FunctionComponent<ICSSTransition.Props> = ({
  children,
  style = 'custom',
  ...props
}) => (
  <Core {...props}>
    {children}
  </Core>
);

export {duration, TransitionStyle};
export default CSSTransition;
