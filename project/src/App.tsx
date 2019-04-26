import data from '$resources/data.json';
import * as IResources from '$resources/spec';
import {GlobalHeader} from '@Component';
import {history} from '@Hook';
import React, {Fragment} from 'react';
import View from './View';

const {view} = (data as IResources.data);

const paths = Object.keys(view).filter(
  name => name !== 'home'
).map(
  name => view[name].path
);

const appRoot = document.querySelector('[app-root]');

const App = () => {
  history();
  
  return (
    <Fragment>
      <GlobalHeader transitionInPaths={paths} />
      <View />
    </Fragment>
  );
};

export {appRoot};
export default App;
