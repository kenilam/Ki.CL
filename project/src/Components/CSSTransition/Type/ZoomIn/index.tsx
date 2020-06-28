import CSSTransition from '@/Components/CSSTransition';
import classnames from 'classnames';
import React, { FunctionComponent } from 'react';
import { useHandlers } from '../../Hook';
import Style from './Style';
import Spec from './spec';

const { default: className } = Style;

const type: Spec.Type = 'ZoomIn';

const ZoomIn: FunctionComponent<Spec.Props> = ({
  addEndListener,
  children,
  classNames,
  onEntered: enteredHandler,
  onExited: exitedHandler,
  ...props
}) => {
  const { onEntered, onExited } = useHandlers({
    addEndListener,
    onEntered: enteredHandler,
    onExited: exitedHandler,
    type,
  });

  return (
    <CSSTransition
      {...props}
      classNames={classnames(classNames, className)}
      onEntered={onEntered}
      onExited={onExited}
    >
      {children}
    </CSSTransition>
  );
};

export { className, type };
export default ZoomIn;
