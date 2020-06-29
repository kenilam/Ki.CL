import resources from '$/resources';
import { Link } from '@/Component'
import Spec from '@/Component/Navigation/spec';
import { RandomId } from '@/Helper';
import classnames from 'classnames';
import React from 'react';
import Style from './Style';

const { view } = resources;

const DEFAULT_ITEMS: Spec.Links = Object.keys(view)
  .map((item) => {
    const { name, path } = view[item];

    return {
      children: name,
      to: path,
    };
  })
  .filter(({ to }) => Boolean(to) && to !== view.home.path);

const Navigation: React.FunctionComponent<Spec.Props> = ({
  className,
  inline,
  items,
  onClick,
  onMouseOver,
  ...rest
}) => (
  <nav
    className={classnames(className, {
      'is-inline': inline,
    })}
    data-component={Style.default}
    role='navigation'
  >
    {(items || DEFAULT_ITEMS).map(({ children, to }) => (
      <Link
        to={to}
        onMouseOver={
          onMouseOver &&
          ((event) => {
            event.preventDefault();
            onMouseOver(event);
          })
        }
        onClick={
          onClick &&
          ((event) => {
            event.preventDefault();
            onClick(event);
          })
        }
        key={RandomId()}
        {...rest}
      >
        {children}
      </Link>
    ))}
  </nav>
);

Navigation.defaultProps = {
  inline: false,
};

export default Navigation;
