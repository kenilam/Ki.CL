import resources from '$/resources';
import {CSSTransition, Logo, Navigation} from '@/Component';
import {useLocation} from '@/Component/Router';
import React, {useMemo} from 'react';
import IGlobalHeader from './spec';
import Style from './Style';

const {
  view: {
    about,
    contact,
    home,
    works
  },
  component: {
    globalHeader: {
      content: {heading}
    }
  }
} = resources;

const RENDER_PATHS = [home.path, works.path];

const GlobalHeader: React.FunctionComponent<IGlobalHeader.Props> = () => {
  const {pathname} = useLocation();
  
  return useMemo(
    () => (
      <CSSTransition in={RENDER_PATHS.some(path => pathname === path)}>
        <header role='banner' data-component={Style.default}>
          <Logo isSquare={true} />
          <h2>{heading}</h2>
          <Navigation
            inline={true}
            items={[
              {children: about.name, to: about.path},
              {children: contact.name, to: contact.path}
            ]}
          />
        </header>
      </CSSTransition>
    ),
    [pathname]
  );
};

export default GlobalHeader;
