import { TransitionStyle } from '@/Component/CSSTransition';
import ICTA from './spec';
import React from 'react';
import Style from './Style';
import resources from '$/resources';

const {
  view: {
    contact: {
      content: { reset, submit },
    },
  },
} = resources;

const CTA: React.FunctionComponent<ICTA.Props> = ({ success, ...props }) => (
  <TransitionStyle.SlideUp {...props}>
    <div data-view-component={Style.default}>
      <button type='reset'>{reset.value}</button>
      <button type='submit'>{submit.value}</button>
    </div>
  </TransitionStyle.SlideUp>
);

export default CTA;
