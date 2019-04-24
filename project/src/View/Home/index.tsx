import data from '$resources/data.json';
import {IResourcesData} from '$resources/spec';
import {Route, withRouter} from '@Component/Router';
import {windowSizes} from '@Hook';
import * as IHome from '@View/Home/spec';
import * as React from 'react';
import './Style';

const {view: {home: {path}}} = (data as IResourcesData);

const Home: React.FC<IHome.Props> = () => {
  const {windowSizes: {height, width}} = windowSizes();
  
  return (
    <main data-routes='home' style={{height, width}}>
      Home
    </main>
  );
};

const Instance = withRouter(Home);

const Component: React.FC<IHome.Component> = () => <Instance />;

export default <Route path={path} exact={true} render={Component} />;
