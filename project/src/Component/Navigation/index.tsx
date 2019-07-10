import resources from '$/resources';
import {Link} from '@/Component';
import * as INavigation from '@/Component/Navigation/spec';
import {RandomId} from '@/Helper';
import classnames from 'classnames';
import React from 'react';
import Style from './Style';

const {view} = resources;

const DEFAULT_ITEMS: INavigation.Links = Object.keys(view).map(
  (viewName) => {
    const {name, path} = view[viewName];
    
    return {
      children: name,
      to: path
    };
  }
).filter(({to}) => Boolean(to) && to !== view.home.path);

const Navigation: React.FunctionComponent<INavigation.Props> = ({className, inline = false, items, onClick}) => (
  <nav
    className={classnames(
      className,
      {
        'is-inline': inline
      }
    )}
    data-component={Style.default}
    role='navigation'
  >
    {
      (items || DEFAULT_ITEMS).map(
        ({children, to}) => (
          <Link
            to={to}
            onClick={onClick && (event => {
              event.preventDefault();
              onClick(event, to);
            })}
            key={RandomId()}
          >
            {children}
          </Link>
        )
      )
    }
  </nav>
);

export default Navigation;
