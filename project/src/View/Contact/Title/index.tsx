import { TransitionStyle } from '@/Component/CSSTransition';
import ITitle from './spec';
import React from 'react';
import Style from './Style';
import resources from '$/resources';

const {
  view: {
    contact: {
      content: { title },
    },
  },
} = resources;

const Title: React.FunctionComponent<ITitle.Props> = (props) => (
  <TransitionStyle.SlideFromLeft {...props}>
    <h1 data-view-component={Style.default}>{title}</h1>
  </TransitionStyle.SlideFromLeft>
);

export default Title;
