import {view} from '$resources/data.json';
import {Route} from '@Component/Router';
import * as React from 'react';
import {IProps} from './spec';

const {home} = view;

const Home: React.FC<IProps> = ({content = home.content}) => (
  <section data-routes='home'>
    {content.heading}
  </section>
);

export default <Route path='/' exact={true} render={Home} />;
