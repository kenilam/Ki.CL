import {CSSTransition, Navigation as Origin} from '@/Component';
import INavigation from '@/View/Home/Navigation/spec';
import '@/View/Home/Navigation/Style';
import React from 'react';

const Navigation: React.FunctionComponent<INavigation.Props> = ({render}) => (
  <CSSTransition type='slideDown' in={render}>
    <Origin />
  </CSSTransition>
);

export default Navigation;
