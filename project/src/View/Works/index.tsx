import {Route} from "@Component/Router";
import * as React from "react";
import {IProps} from './spec';
import View from './View';

const Works = ({}: IProps) => (
  <section>
    <h1>Works</h1>
    <View />
  </section>
);

export default <Route path='/works' render={Works} />;
