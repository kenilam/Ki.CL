import resources from '$/resources';
import CSSTransition from '@/Component/CSSTransition';
import React, {useState} from 'react';
import {MdClose} from 'react-icons/md';
import ICloseButton from './spec';
import Style from './Style';

const {component: {closeButton: {content: {message}}}} = resources;

const CloseButton: React.FunctionComponent<ICloseButton.Props> = ({
  onExit
}) => {
  const [transitionIn, updateTransitionIn] = useState(true);
  
  const clickHandler = () => {
    updateTransitionIn(false);
  };
  
  return (
    <CSSTransition
      in={transitionIn}
      onExited={onExit}
      unmountOnExit={false}
    >
      <button
        data-component={Style.default}
        onClick={clickHandler}
        title={message}
      >
        <MdClose />
        <span>{message}</span>
      </button>
    </CSSTransition>
  );
};

export default CloseButton;
