import React from 'react';
import { NavLink } from 'react-router-dom';
import Style from './Style';
import Spec from './spec';

const Link: React.FunctionComponent<Spec.Props> = ({
  children,
  className,
  component: Wrapper,
  onClick,
  onMouseOver,
  to,
  ...rest
}) => {
  const Component = (
    <NavLink
      activeClassName={Style.active}
      className={Wrapper && className}
      data-component={Style.default}
      exact={true}
      onClick={onClick}
      onMouseOver={onMouseOver}
      to={to}
      {...rest}
    >
      {children}
    </NavLink>
  );

  return Wrapper ? (
    <Wrapper className={className}>{Component}</Wrapper>
  ) : (
    Component
  );
};

export default Link;
