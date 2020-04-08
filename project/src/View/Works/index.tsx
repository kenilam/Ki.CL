import resources from "$/resources";
import ICSSTransition from "@/Component/CSSTransition/spec";
import { Route } from "@/Component/Router";
import React from "react";
import "./Style";
import View from "./View";

const {
  view: {
    works: { path },
  },
} = resources;
const transitionType: ICSSTransition.Type = "slideUp";

const Works = (
  <main data-routes="works">
    <h1>Works</h1>
    {View}
  </main>
);

export { path, transitionType };
export default <Route path={path}>{Works}</Route>;
