import resources from "$/resources";
import API, { url, Config } from "@/API/Contact";
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
    actions: { data, onError, onRender, onSuccess, ...actions },
  } = State();

  const { hasChange, shouldRender, shouldSubmit, ...params } = data || {
    email,
    hasChange: false,
    id: null,
    message,
    name,
    shouldRender: false,
    shouldSubmit: false,
  };

  const className = classnames({
    [Style.loading]: shouldSubmit,
  });

  return (
    <main data-routes="contact">
      <Config onEntering={onRender}>
        {(data) => {
          return (
            <form {...actions} action={url} className={className}>
              <Title in={data.success && shouldRender} />
              <Description in={data.success && shouldRender} />
              <Hidden useClassName={true}>
                <Input id="id" in={data.success && shouldRender} label="id" />
              </Hidden>
              <Input
                {...name}
                autoFocus={true}
                disabled={shouldSubmit}
                in={data.success && shouldRender}
                required={true}
                transitionType={types.SlideFromLeft}
              />
              <Input
                {...email}
                disabled={shouldSubmit}
                in={data.success && shouldRender}
                required={true}
                transitionType={types.SlideFromLeft}
              />
              <TextArea
                {...message}
                {...data.result?.message}
                disabled={shouldSubmit}
                in={data.success && shouldRender}
                required={true}
                transitionType={types.SlideUp}
              />
              <CTA
                disabled={shouldSubmit || !hasChange}
                in={data.success && shouldRender}
              />
            </form>
          );
        }}
      </Config>
      <API
        params={params}
        preventFor={shouldSubmit}
        onError={onError}
        onSuccess={onSuccess}
      >
        {({ error, result }) => {
          if (error || result.error) {
            return <span>{error || result.message}</span>;
          }

          return <span>{result.message}</span>;
        }}
      </API>
    </main>
  );
};

export { path, transitionType };
export default (
  <Route path={path}>
    <Contact />
  </Route>
);
