import resources from "$/resources";
import * as API from "@/API";
import { Logo, Navigation } from "@/Components";
import { types } from "@/Components/CSSTransition/Type";
import { Route } from "@/Components/Router";
import React from "react";
import "./Style";
import Spec from "./spec";

const {
  view: {
    about: {
      path,
      content: { action, heading },
    },
  },
} = resources;

const transitionType = types.SlideFromRight;

const About: React.FunctionComponent<Spec.Props> = () => (
  <main data-routes="about">
    <API.About>
      {({ result }) => (
        <article>
          <Logo />
          <h2>{heading}</h2>
          <p>{result.sections.About}</p>
          <Navigation
            inline={true}
            items={[{ children: action.name, to: action.path }]}
          />
        </article>
      )}
    </API.About>
  </main>
);

export { path, transitionType };
export default (
  <Route path={path}>
    <About />
  </Route>
);
