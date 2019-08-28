import resources from '$/resources';
import {Asynchronizer, Logo} from '@/Component';
import {Route, withRouter} from '@/Component/Router';
import {RandomId} from "@/Helper";
import IHome from '@/View/Home/spec';
import React from 'react';
import './Style';

const {
  view: {
    home: {
      path,
      content: {heading, messages}
    }
  }
} = resources;

const Home: React.FunctionComponent<IHome.Props> = () => {
  return (
    <main data-routes='home'>
      <Asynchronizer awaitFor={require('../../../asset/image/big.sur.png')}>
        <div>
          <Logo isSquare={true}/>
          <h2>{heading}</h2>
          <article>
            {
              messages.map(
                (text: string) => (
                  <p key={RandomId()}>
                <span>
                  {text}
                </span>
                  </p>
                )
              )
            }
          </article>
        </div>
      </Asynchronizer>
    </main>
  );
};

const Component = withRouter(Home);

export default <Route path={path} exact={true} component={Component} />;
