import data from '$resources/data.json';
import IResources from '$resources/spec';
import {Navigation} from "@Component";
import {Route, withRouter} from '@Component/Router';
import * as IHome from '@View/Home/spec';
import * as React from 'react';
import {Background} from './Component';
import './Style';

const {view: {home: {path}}}: IResources.Data = data;

const Home: React.FC<IHome.Props> = () => {
  const clickHandler: IHome.clickHandler = event => {
    console.log(event);
    debugger;
  };
  
  return (
    <main data-routes='home'>
      <Background zoomIn={true} />
      <Navigation onClick={clickHandler} />
    </main>
  );
};

const Instance = withRouter(Home);

const Component: React.FC<IHome.Component> = () => <Instance />;

export default <Route path={path} exact={true} render={Component} />;
