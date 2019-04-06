import {Router} from "@Component/Router";
import React from 'react';
import {NavLink} from 'react-router-dom';
import {IProps} from "./spec";
import Style from './Style';

const Link: React.FunctionComponent<IProps> = ({
  children,
  className: wrapperClassName,
  component: Wrapper,
  onClick,
  to
}) => {
  const Element = () => (
    <NavLink
      activeClassName={Style.isActive}
      className={Style.link}
      exact={true}
      onClick={onClick}
      to={to}
    >
      {children}
    </NavLink>
  );
  
  return (
    <Router>
      {
        Wrapper ? (
          <Wrapper className={wrapperClassName}>
            <Element />
          </Wrapper>
        ) : <Element />
      }
    </Router>
  );
};

export default Link;
