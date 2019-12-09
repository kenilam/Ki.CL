import resources from '$/resources';
import ICSSTransition from '@/Component/CSSTransition/spec';
import {Route} from '@/Component/Router';
import React from 'react';
import IAbout from './spec';
import './Style';

const {
  view: {
    contact: {path, content: {title, message}}
  }
} = resources;

const transitionType: ICSSTransition.Type = 'slideDown';

const Contact: React.FunctionComponent<IAbout.Props> = () => (
  <main data-routes='contact'>
    <h1>{title}</h1>
    <p>{message}</p>
  </main>
);

export {path, transitionType};
export default (
  <Route path={path}>
    <Contact />
  </Route>
);
