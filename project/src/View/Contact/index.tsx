import resources from "$/resources";
import * as API from "@/API";
import { url, Config } from "@/API/Contact";
import { Hidden, Input, TextArea } from "@/Components";
import { types } from "@/Components/CSSTransition/Type";
import { Route } from "@/Components/Router";
import classnames from "classnames";
import React from "react";
import CTA from "./CTA";
import Description from "./Description";
import State from "./State";
import Style from "./Style";
import Title from "./Title";
import Spec from "./spec";

const {
  view: {
    contact: {
      content: { email, message, name },
      path,
    },
  },
} = resources;

const transitionType = types.Fade;

const Contact: React.FunctionComponent<Spec.Props> = () => {
  const {
    actions: { data, onError, onSuccess, ...actions },
  } = State();

  const { hasChange, shouldSubmit, ...params } = data || {
    hasChange: false,
    shouldSubmit: false,
    id: null,
    email,
    message,
    name,
  };

  const className = classnames({
    [Style.loading]: shouldSubmit,
  });

  return (
    <main data-routes="contact">
      <Config>
        {({ result }) => (
          <form {...actions} action={url} className={className}>
            <Title />
            <Description in={Boolean(result)} />
            <Hidden useClassName={true}>
              <Input id="id" in={Boolean(result)} label="id" />
            </Hidden>
            <Input
              {...name}
              disabled={shouldSubmit}
              in={Boolean(result)}
              required={true}
              transitionType={types.SlideFromLeft}
            />
            <Input
              {...email}
              disabled={shouldSubmit}
              in={Boolean(result)}
              required={true}
              transitionType={types.SlideFromLeft}
            />
            <TextArea
              {...message}
              {...result.message}
              disabled={shouldSubmit}
              in={Boolean(result)}
              required={true}
              transitionType={types.SlideUp}
            />
            <CTA disabled={shouldSubmit || !hasChange} in={Boolean(result)} />
          </form>
        )}
      </Config>
      <API.Contact
        params={params}
        preventBy={shouldSubmit}
        onError={onError}
        onSuccess={onSuccess}
      >
        {({ error, result }) => {
          if (error || result.error) {
            return <span>{error || result.message}</span>;
          }

          return <span>{result.message}</span>;
        }}
      </API.Contact>
    </main>
  );
};

export { path, transitionType };
export default (
  <Route path={path}>
    <Contact />
  </Route>
);
