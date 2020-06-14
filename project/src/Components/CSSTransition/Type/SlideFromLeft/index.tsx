import CSSTransition from "@/Components/CSSTransition";
import classnames from "classnames";
import React, { FunctionComponent } from "react";
import Style from "./Style";
import Spec from "./spec";

const { default: className } = Style;

const type: Spec.Type = "SlideFromLeft";

const SlideFromLeft: FunctionComponent<Spec.Props> = ({
  children,
  classNames,
  ...props
}) => (
  <CSSTransition {...props} classNames={classnames(classNames, className)}>
    {children}
  </CSSTransition>
);

export { className, type };
export default SlideFromLeft;
