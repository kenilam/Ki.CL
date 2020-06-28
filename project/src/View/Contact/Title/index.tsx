import resources from '$/resources';
import { Types } from '@/Components/CSSTransition';
import React from 'react';
import Style from './Style';
import Spec from './spec';

const {
  view: {
    contact: {
      content: { title },
    },
  },
} = resources;

const Title: React.FunctionComponent<Spec.Props> = (props) => (
  <Types.Fade {...props}>
    <h1 data-view-component={Style.default}>{title}</h1>
  </Types.Fade>
);

export default Title;
