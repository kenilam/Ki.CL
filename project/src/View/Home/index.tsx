import resources from "$/resources";
import { Logo, Navigation } from "@/Components";
import { types } from "@/Components/CSSTransition/Type";
import { Route } from "@/Components/Router";
import Slogan from "@/View/Home/Slogan";
import React from "react";
import "./Style";

const {
  view: {
    home: { path },
  },
} = resources;

const api = "/asset/image/big.sur.png";

const transitionType = types.Fade;

const Home = (
  <main data-routes="home">
    <Logo isSquare={true} />
    <Navigation />
    <Slogan />
    <section>
      <img src={`../../..${api}`} alt="show" />
    </section>
  </main>
);

export { path, transitionType };
export default (
  <Route path={path} exact={true}>
    {Home}
  </Route>
);
