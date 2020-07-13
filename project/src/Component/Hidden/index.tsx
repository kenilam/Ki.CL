import classnames from 'classnames';
import React from 'react';
import Style from './Style';
import { Child, Props } from './spec';

const Hidden: React.FunctionComponent<Props> = ({
  children,
  className,
  useClassName,
}) => {
  const Component = React.Children.map(
    children,
    (child: React.DetailedReactHTMLElement<Child, null>) => {
      const props: Child = {
        ['data-component']: Style.default,
      };

      if (useClassName) {
        delete props['data-component'];

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
