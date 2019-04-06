import {ElementType} from "react";
import {NavLinkProps} from "react-router-dom";

export interface IProps extends NavLinkProps {
  className?: string;
  component?: ElementType;
}
