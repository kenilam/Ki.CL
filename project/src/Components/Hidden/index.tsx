import classnames from "classnames";
import React from "react";
import Style from "./Style";
import Spec from "./spec";

const Hidden: React.FunctionComponent<Spec.Props> = ({
  children,
  className,
  useClassName,
}) => {
  const Component = React.Children.map(
    children,
    (child: React.DetailedReactHTMLElement<Spec.Child, null>) => {
      const props: Spec.Child = {
        ["data-component"]: Style.default,
      };

      if (useClassName) {
        delete props["data-component"];

        props.className = classnames(
          className,
          child.props.className,
          Style.default
        );
      }

      return React.cloneElement(child, props);
    }
  );

  return <>{Component}</>;
};

export default Hidden;
