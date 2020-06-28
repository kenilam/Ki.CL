import classnames from "classnames";
import React, { FunctionComponent } from "react";
import { CSSTransition as Origin } from "react-transition-group";
import { useHandlers } from "./Hook";
import Style from "./Style";
import * as Types from "./Type";
import { addEndListener } from "./Utility";
import Spec from "./spec";

const CSSTransition: FunctionComponent<Spec.Props> = ({
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

  const props = {
    ...rest,
    onEntered,
    onExited,
    timeout,
    key,
    addEndListener: !timeout ? customEndListener || addEndListener : null,
    classNames: classnames(
      classes,
      Style.default,
      { [Style.standalone]: standalone },
      Style.default
    ),
  };

  if (type && Types[type]) {
    const Component = Types[type];

    return <Component {...props}>{children}</Component>;
  }

  return <Origin {...props}>{children}</Origin>;
};

CSSTransition.defaultProps = {
  unmountOnExit: true,
} as Spec.Props;

export { Types };
export default CSSTransition;
