import * as ILink from "@Component/Link/spec";
import {MouseEventHandler} from "react";

declare module INavigation {
  type Link = ILink.Props;
  type Links = Link[];
  
  interface ClassNames extends IClassNames {
    default: string;
  }
  
  type clickHandler = MouseEventHandler<HTMLAnchorElement>;
  
  interface Props {
    className?: string;
    items?: Links;
    onClick?: clickHandler;
  }
}

export = INavigation;
