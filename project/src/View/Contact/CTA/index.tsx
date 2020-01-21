import {CSSTransition} from "@/Component";
import ICTA from './spec';
import React from 'react';
import Style from './Style';
import resources from '$/resources';

const {view: {contact: {content: {reset, submit}}}} = resources;

const CTA: React.FunctionComponent<ICTA.Props> = props => (
  <CSSTransition {...props} type='slideUp'>
    <div data-view-component={Style.default}>
      <button type='submit'>{submit.value}</button>
      <button type='reset'>{reset.value}</button>
    </div>
  </CSSTransition>
);

export default CTA;
