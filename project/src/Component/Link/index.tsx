import React from 'react';
import { NavLink } from 'react-router-dom';
import Style from './Style';
import { Props } from './spec';

const Link: React.FunctionComponent<Props> = ({
  children,
  className,
  component: Wrapper,
  onClick,
  onMouseOver,
  to,
  ...rest
}) => {
  return (
    <NavLink
      {...rest}
      activeClassName={Style.active}
      className={Wrapper && className}
      data-component={Style.default}
      exact={true}
      onClick={onClick}
      onMouseOver={onMouseOver}
      to={to}
    >
      {children}
    </NavLink>
  );
};

export default Link;
