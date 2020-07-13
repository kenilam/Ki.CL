import classnames from 'classnames';
import React, { FunctionComponent } from 'react';
import { CSSTransition as Origin } from 'react-transition-group';
import { useHandlers } from './Hook';
import Style from './Style';
import * as Types from './Type';
import { addEndListener } from './Utility';
import { Props } from './spec';

const CSSTransition: FunctionComponent<Props> = ({
  addEndListener: customEndListener,
  children,
  classNames: classes,
  transitionKey: key,
  onEntered: enteredHandler,
  onExited: exitedHandler,
  standalone,
  timeout,
  type,
  ...rest
}) => {
  const { onEntered, onExited } = useHandlers({
    addEndListener: customEndListener,
    onEntered: enteredHandler,
    onExited: exitedHandler,
    type,
  });

  const classNames = classnames(
    classes,
    Style.default,
    { [Style.standalone]: standalone },
    Style.default
  )

  const props = {
    ...rest,
    onEntered,
    onExited,
    timeout,
    key,
    addEndListener: !timeout ? customEndListener || addEndListener : null,
    classNames,
  };

  if (type && Types[type]) {
    const Component = Types[type];

    return <Component {...props}>{children}</Component>;
  }

  return <Origin {...props}>{children}</Origin>;
};

CSSTransition.defaultProps = {
  standalone: false,
  unmountOnExit: true,
} as Props;

export { Types };
export default CSSTransition;
