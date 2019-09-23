import resources from '$/resources';
import {CSSTransition, Logo, Navigation} from '@/Component';
import {withRouter} from '@/Component/Router';
import React from 'react';
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

const transitionInPaths = [home.path, works.path];

const GlobalHeader: React.FunctionComponent<IGlobalHeader.Props> = ({
  location
}) => (
  <CSSTransition
    transitionIn={
      transitionInPaths.some(
        path => location.pathname === path
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
);

const Component = withRouter(GlobalHeader);

export default Component;