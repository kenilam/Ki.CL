import CSSTransition from "@/Components/CSSTransition";
import classnames from "classnames";
import React, { FunctionComponent } from "react";
import Style from "./Style";
import Spec from "./spec";

const { default: className } = Style;

const type: Spec.Type = "ZoomOut";

const ZoomOut: FunctionComponent<Spec.Props> = ({
  children,
  classNames,
  ...props
}) => (
  <CSSTransition {...props} classNames={classnames(classNames, className)}>
    {children}
  </CSSTransition>
);

export { className, type };
export default ZoomOut;
