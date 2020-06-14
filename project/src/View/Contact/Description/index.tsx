import resources from "$/resources";
import { Types } from "@/Components/CSSTransition";
import React from "react";
import Style from "./Style";
import Spec from "./spec";

const {
  view: {
    contact: {
      content: { description },
    },
  },
} = resources;

const Description: React.FunctionComponent<Spec.Props> = (props) => (
  <Types.SlideFromLeft {...props}>
    <p data-view-component={Style.default}>{description}</p>
  </Types.SlideFromLeft>
);

export default Description;
