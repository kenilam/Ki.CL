import resources from '$/resources';
import {CSSTransition} from '@/Component';
import {TransitionStyleName} from '@/Component/CSSTransition';
import {Route, withRouter} from '@/Component/Router';
import * as IHome from '@/View/Home/spec';
import React, {useState} from 'react';
import './Style';
import WebGL from './WebGL';

const {view: {home: {path}}} = resources;

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
        <p>Coming Soon!</p>
        {/*<Navigation inline={true} />*/}
      </CSSTransition>
    </main>
  );
};

const Component = withRouter(Home);

export default <Route path={path} exact={true} component={Component} />;
