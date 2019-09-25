import resources from '$/resources';
import {CSSTransition, Logo, Navigation} from '@/Component';
import {useLocation} from '@/Component/Router';
import {paths} from '@/View';
import React, {useMemo} from 'react';
import IGlobalHeader from './spec';
import Style from './Style';

const {
  view: {
    about,
    contact,
  },
  component: {
    globalHeader: {
      content: {heading}
    }
  }
} = resources;

const transitionInPaths = [paths.home, paths.works];

const GlobalHeader: React.FunctionComponent<IGlobalHeader.Props> = () => {
  const {pathname} = useLocation();
  
  return useMemo(
    () => (
      <CSSTransition
        transitionIn={
          transitionInPaths.some(
            path => pathname === path
          )
        }
      >
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
