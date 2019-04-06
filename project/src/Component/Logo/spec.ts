import {ElementType} from "react";

interface IClassName {
  className?: string;
}

interface IComponent {
  component?: ElementType;
}

export interface IProps extends IClassName, IComponent {
}
