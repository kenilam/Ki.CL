import resources from '$/resources';
import { Logo, Navigation } from '@/Components';
import { Types } from '@/Components/CSSTransition';
import { useLocation } from '@/Components/Router';
import React from 'react';
import Style from './Style';
import Spec from './spec';

const {
  view: { about, contact, home, works },
} = resources;

const INVALID_PATHS = [home.path];

const GlobalHeader: React.FunctionComponent<Spec.Props> = () => {
  const { pathname } = useLocation();

  return (
    <Types.SlideDown
      in={!INVALID_PATHS.some((path) => pathname === path)}
      standalone={true}
    >
      <header role='banner' data-component={Style.default}>
        <Logo isSquare={true} />
        <Navigation
          inline={true}
          items={[
            { children: works.name, to: works.path },
            { children: about.name, to: about.path },
            { children: contact.name, to: contact.path },
          ]}
        />
      </header>
    </Types.SlideDown>
  );
};

export default GlobalHeader;
