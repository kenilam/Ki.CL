import data from '$resources/data.json';
import IResources from '$resources/spec';
import {CSSTransition, Navigation} from '@Component';
import {TransitionStyleName} from '@Component/CSSTransition';
import {Route, withRouter} from '@Component/Router';
import * as IHome from '@View/Home/spec';
import React, {useState} from 'react';
import './Style';
import WebGL from './WebGL';

const {view: {home: {path}}}: IResources.Data = data;

const Home: React.FunctionComponent<IHome.Props> = ({history}) => {
  const [renderNavigation, showNavigation] = useState(false);
  
  const isActiveRoute = history.location.pathname === path;
  
  const onComplete = () => {
    showNavigation(isActiveRoute);
  };
  
  return (
    <main data-routes='home'>
      <WebGL onComplete={onComplete} />
      <CSSTransition
        transitionIn={renderNavigation && isActiveRoute}
        transitionStyle={TransitionStyleName.fade}
      >
        <Navigation inline={true} />
      </CSSTransition>
    </main>
  );
};

const Component = withRouter(Home);

export default <Route path={path} exact={true} component={Component} />;
