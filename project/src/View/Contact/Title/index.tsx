import {CSSTransition} from "@/Component";
import ITitle from './spec';
import React from 'react';
import Style from './Style';
import resources from '$/resources';

const {view: {contact: {content: {title}}}} = resources;

const Title: React.FunctionComponent<ITitle.Props> = props => (
  <CSSTransition {...props} type='slideFromLeft'>
    <h1 data-view-component={Style.default}>{title}</h1>
  </CSSTransition>
);

export default Title;
