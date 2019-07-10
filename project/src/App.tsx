import resources from '$/resources';
import {GlobalHeader} from '@/Component';
import React, {Fragment} from 'react';
import View from './View';

const {view} = resources;

const paths = Object.keys(view).filter(
  name => 'home' !== name
).map(
  name => view[name].path
);

const appRoot = document.querySelector('[app-root]');

const App = () => (
  <Fragment>
    <GlobalHeader transitionInPaths={paths} />
    {View}
  </Fragment>
);

export {appRoot};
export default App;
