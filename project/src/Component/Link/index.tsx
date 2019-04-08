import {RouterProvider} from '@Component/Router';
import React from 'react';
import {NavLink} from 'react-router-dom';
import {IProps} from './spec';
import Style from './Style';

const Link: React.FC<IProps> = ({
  children,
  className: wrapperClassName,
  component: Wrapper,
  onClick,
  to
}) => {
  const Element = () => (
    <NavLink
      activeClassName={Style.active}
      className={Style.link}
      exact={true}
      onClick={onClick}
      to={to}
    >
      {children}
    </NavLink>
  );
  
  return (
    <RouterProvider>
      {
        Wrapper ? (
          <Wrapper className={wrapperClassName}>
            <Element />
          </Wrapper>
        ) : <Element />
      }
    </RouterProvider>
  );
};

export default Link;
