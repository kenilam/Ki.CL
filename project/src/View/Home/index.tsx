import {Route, withRouter} from '@Component/Router';
import hook from '@Hook';
import React from 'react';
import './Style';

const Home: React.FC<IHome.Props> = () => {
  const {windowSizes} = hook();
  
  return (
    <main data-routes='home' style={windowSizes}>
      Home
    </main>
  );
};

const Instance = withRouter(Home);

const Component: React.FC<IHome.Component> = () => <Instance />;

export default <Route path='/' exact={true} render={Component} />;
