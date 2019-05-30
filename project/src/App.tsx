import data from '$resources/data.json';
import * as IResources from '$resources/spec';
import { GlobalHeader } from '@Component';
import React, { Fragment } from 'react';
import View from './View';

const { view }: IResources.Data = data;

const paths = Object.keys( view ).filter(
  name => 'home' !== name
).map(
  name => view[ name ].path
);

const appRoot = document.querySelector( '[app-root]' );

const App = () => (
  <Fragment>
    <GlobalHeader transitionInPaths={paths}/>
    {View}
  </Fragment>
);

export { appRoot };
export default App;
