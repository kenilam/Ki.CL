import * as React from "react";

import {Route} from "@Component/Router";

import {IProps} from './spec';

const Works = ({}: IProps) => (
  <section>Works</section>
);

export default <Route path={'/'} exact={true} render={Works}/>;
