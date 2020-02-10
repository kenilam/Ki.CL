import resources from '$/resources';
import {CSSTransition, Logo, Navigation} from '@/Component';
import {useLocation} from '@/Component/Router';
import React from 'react';
import IGlobalHeader from './spec';
import Style from './Style';

const {
  view: { about, contact, home, works }
} = resources;

const INVALID_PATHS = [home.path];

const GlobalHeader: React.FunctionComponent<IGlobalHeader.Props> = () => {
  const {pathname} = useLocation();
  
  return (
    <CSSTransition
      in={!INVALID_PATHS.some(path => pathname === path)}
      standAlone={true}
      type='slideDown'
    >
      <header role='banner' data-component={Style.default}>
        <Logo isSquare={true} />
        <Navigation
          inline={true}
          items={[
            {children: works.name, to: works.path},
            {children: about.name, to: about.path},
            {children: contact.name, to: contact.path}
          ]}
        />
      </header>
    </CSSTransition>
  );
};

export default GlobalHeader;
