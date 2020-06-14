import resources from "$/resources";
import { Types } from "@/Components/CSSTransition";
import React from "react";
import Style from "./Style";
import Spec from "./spec";

const {
  view: {
    contact: {
      content: { reset, submit },
    },
  },
} = resources;

const CTA: React.FunctionComponent<Spec.Props> = ({ disabled, ...props }) => (
  <Types.SlideUp {...props}>
    <fieldset data-view-component={Style.default}>
      <button type="reset">{reset.value}</button>
      <button type="submit" disabled={disabled}>
        {submit.value}
      </button>
    </fieldset>
  </Types.SlideUp>
);

export default CTA;
