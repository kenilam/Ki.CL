import { TransitionStyle } from '@/Component/CSSTransition';
import IDescription from './spec';
import React from 'react';
import Style from './Style';
import resources from '$/resources';

const {
  view: {
    contact: {
      content: { description },
    },
  },
} = resources;

const Description: React.FunctionComponent<IDescription.Props> = (props) => (
  <TransitionStyle.SlideFromLeft {...props}>
    <p data-view-component={Style.default}>{description}</p>
  </TransitionStyle.SlideFromLeft>
);

export default Description;
