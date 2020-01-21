import {CSSTransition} from "@/Component";
import IDescription from './spec';
import React from 'react';
import Style from './Style';
import resources from '$/resources';

const {view: {contact: {content: {description}}}} = resources;

const Description: React.FunctionComponent<IDescription.Props> = props => (
  <CSSTransition {...props} type='slideFromLeft'>
    <p data-view-component={Style.default}>{description}</p>
  </CSSTransition>
);

export default Description;
