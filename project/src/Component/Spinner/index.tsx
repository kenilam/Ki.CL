import {TransitionStyle} from '@/Component/CSSTransition';
import React from 'react';
import ISpinner from './spec';
import Style from './Style';

const Spinner: React.FunctionComponent<ISpinner.Props> = props => {
  return (
    <TransitionStyle.ZoomIn {...props}>
      <svg data-component={Style.default}>
        <circle cx='70%' cy='30%' r='30%' />
        <circle cx='70%' cy='70%' r='30%' />
        <text>Loading</text>
      </svg>
    </TransitionStyle.ZoomIn>
  )
};

export default Spinner;
