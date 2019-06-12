import data from '$resources/data.json';
import * as IResources from '$resources/spec';
import {Audio, GlobalHeader} from '@Component';
import React, {Fragment} from 'react';
import View from './View';

const {view}: IResources.Data = data;

const paths = Object.keys(view).filter(
  name => 'home' !== name
).map(
  name => view[name].path
);

const appRoot = document.querySelector('[app-root]');

const App = () => (
  <Fragment>
    <Audio url={`${process.env.API_URL}/api/musics/clam`}/>
    <GlobalHeader transitionInPaths={paths} />
    {View}
  </Fragment>
);

export {appRoot};
export default App;
