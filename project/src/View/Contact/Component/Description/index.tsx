import resources from '$/resources';
import { Types } from '@/Component/CSSTransition';
import React from 'react';
import Style from './Style';
import { Props } from './spec';

const {
  view: {
    contact: {
      content: { description },
    },
  },
} = resources;

const Description: React.FunctionComponent<Props> = (props) => (
  <Types.SlideUp {...props}>
    <p data-view-component={Style.default}>{description}</p>
  </Types.SlideUp>
);

export default Description;
