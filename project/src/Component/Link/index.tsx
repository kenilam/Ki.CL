import React from 'react';
import { NavLink } from 'react-router-dom';
import ILink from './spec';
import Style from './Style';

const Link: React.FunctionComponent<ILink.Props> = ({
  children,
  className: wrapperClassName,
  component: Wrapper,
  onClick,
  onMouseOver,
  to,
  ...rest
}) => {
  const Component = (
    <NavLink
      activeClassName={Style.active}
      className={Wrapper && wrapperClassName}
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
    <Wrapper className={wrapperClassName}>{Component}</Wrapper>
  ) : (
    Component
  );
};

export default Link;
