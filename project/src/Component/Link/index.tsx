import {Provider} from '@Component/Router';
import React from 'react';
import {NavLink} from 'react-router-dom';
import * as ILink from './spec';
import Style from './Style';

const Link: React.FunctionComponent<ILink.Props> = (
  {
    children,
    className: wrapperClassName,
    component: Wrapper,
    onClick,
    to
  }) => {
  const Element = () => (
    <NavLink
      activeClassName={Style.active}
      data-component={Style.default}
      exact={true}
      onClick={onClick}
      to={to}
    >
      {children}
    </NavLink>
  );
  
  return (
    <Provider>
      {
        Wrapper ? (
          <Wrapper className={wrapperClassName}>
            <Element />
          </Wrapper>
        ) : <Element />
      }
    </Provider>
  );
};

export default Link;
