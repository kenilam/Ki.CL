import classnames from "classnames";
import React, { FunctionComponent } from "react";
import { CSSTransition as Origin } from "react-transition-group";
import Style from "./Style";
import * as Types from "./Type";
import { addEndListener } from "./Utility";
import Spec from "./spec";

const { classNames } = Types;

const DEFAULT_CLASS_LISTS = [
  Style.default,
  Style.appear,
  Style.appearDone,
  Style.enter,
  Style.enterDone,
  Style.exit,
  Style.exitDone,
  Style.standalone,
];

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
  const onEntered: Spec.Enter = (node, isAppearing) => {
    if (node && !customEndListener) {
      node.classList.remove(...DEFAULT_CLASS_LISTS, classNames[type]);
    }

    if (enteredHandler) {
      enteredHandler(node, isAppearing);
    }
  };

  const onExited: Spec.Exit = (node) => {
    if (node && !customEndListener) {
      node.classList.remove(...DEFAULT_CLASS_LISTS, classNames[type]);
    }

    if (exitedHandler) {
      exitedHandler(node);
    }
  };

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
