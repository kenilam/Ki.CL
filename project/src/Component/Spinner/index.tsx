import ISpinner from './spec';
import React from 'react';
import CSSTransition, {TransitionStyleName} from '@/Component/CSSTransition';
import Style from './Style';

const Spinner: React.FunctionComponent<ISpinner.Props> = ({
  show
}) => {
  return (
    <CSSTransition transitionIn={show} transitionStyle={TransitionStyleName.fade}>
      <svg data-component={Style.default}>
        <circle cx='70%' cy='30%' r='30%' />
        <circle cx='70%' cy='70%' r='30%' />
        <text>Loading</text>
      </svg>
    </CSSTransition>
  )
};

export default Spinner;