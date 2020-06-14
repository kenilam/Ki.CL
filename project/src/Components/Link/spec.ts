import { ComponentType } from "react";
import { NavLinkProps } from "react-router-dom";

declare namespace ILink {
  type ClassName = ClassNames<"default" | "active">;

  type Props = NavLinkProps & {
    className?: string;
    component?: ComponentType<any>;
  };
}

export default ILink;
