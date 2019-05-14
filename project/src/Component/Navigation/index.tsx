import data from '$resources/data.json';
import IResources from '$resources/spec';
import {Link} from '@Component';
import * as INavigation from "@Component/Navigation/spec";
import {RandomId} from '@Helper';
import React from 'react';
import Style from './Style';

const {view}: IResources.Data = data;

const DEFAULT_ITEMS: INavigation.Links = Object.keys(view).map(
  (viewName) => {
    const {name, path} = view[viewName];
    
    return {
      children: name,
      to: path
    };
  }
).filter(({to}) => Boolean(to));

const Navigation: React.FC<INavigation.Props> = ({className, items, onClick}) => (
  <nav
    className={className}
    data-component={Style.default}
    role='navigation'
  >
    {
      (items || DEFAULT_ITEMS).map(
        ({children, to}) => (
          <Link to={to} onClick={onClick} key={RandomId()}>
            {children}
          </Link>
        )
      )
    }
  </nav>
);

export default Navigation;
