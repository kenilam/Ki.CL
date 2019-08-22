import resources from '$/resources';
import {Logo} from '@/Component';
import {Route, withRouter} from '@/Component/Router';
import {RandomId} from "@/Helper";
import * as IHome from '@/View/Home/spec';
import React from 'react';
import './Style';
import Background from './Background';

const {
  view: {
    home: {
      path,
      content: {heading, messages}
    }
  }
} = resources;

const Home: React.FunctionComponent<IHome.Props> = () => (
  <main data-routes='home'>
    <Background/>
    <div>
      <Logo isSquare={true}/>
      <h2>{heading}</h2>
      <article>
        {
          messages.map(
            (text: string) => (
              <p key={RandomId()}>{text}</p>
            )
          )
        }
      </article>
    </div>
  </main>
);

const Component = withRouter(Home);

export default <Route path={path} exact={true} component={Component} />;
