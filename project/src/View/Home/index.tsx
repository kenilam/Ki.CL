import {Route} from "@Component/Router";
import * as React from "react";

import {IProps} from './spec';

const Home = ({}: IProps) => (
  <section>Home</section>
);

export default <Route path='/' exact={true} render={Home}/>;
