import React from 'react';
import classnames from 'classnames';
import IHidden from './spec';
import Style from './Style';

const Hidden: React.FunctionComponent<IHidden.Props> = ({
  children,
  className,
  useClassName,
}) => {
  const Component = React.Children.map(
    children,
    (child: React.DetailedReactHTMLElement<IHidden.Child, null>) => {
      const props: IHidden.Child = {
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

  return <React.Fragment>{Component}</React.Fragment>;
};

export default Hidden;
