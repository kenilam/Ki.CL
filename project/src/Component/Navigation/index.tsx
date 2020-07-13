import resources from '$/resources';
import { Link } from '@/Component'
import { Links, Props } from '@/Component/Navigation/spec';
import { RandomId } from '@/Helper';
import classnames from 'classnames';
import React from 'react';
import Style from './Style';

const { view } = resources;

const DEFAULT_ITEMS: Links = Object.values(view)
  .filter(
    route => route?.path && route?.path !== view.home.path
  )
  .map(
    ({ name: children, path: to }) => ({ children, to })
  );

const Navigation: React.FunctionComponent<Props> = ({
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
    {...rest}
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
