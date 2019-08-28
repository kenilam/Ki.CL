import {CSSTransition} from "@/Component";
import {TransitionStyleName} from "@/Component/CSSTransition";
import Spinner from "@/Component/Spinner";
import IAsynchronizer from "./spec";
import React, {useEffect, useState} from 'react';
import {CSSUnit, Fetch} from "@/Helper";
import Style from './Style';

const delay = CSSUnit(Style.delay);

const Asynchronizer: React.FunctionComponent<IAsynchronizer.Props> = ({
  awaitFor,
  children
}) => {
  let stillLoadingTimer: number;
  
  const [
    isLoading,
    stillLoading
  ]: IAsynchronizer.LoadingState = useState<IAsynchronizer.IsLoading>(true);
  
  const [
    spinnerRemoved,
    removeSpinner
  ]: IAsynchronizer.SpinnerState = useState<IAsynchronizer.SpinnerRemoved>(false);
  
  const showChildren = () => {
    removeSpinner(true);
  };
  
  const awaitComplete = () => {
    stillLoading(false);
  };
  
  useEffect(() => {
    if (isLoading && !spinnerRemoved) {
      const { cancel, promise } = Fetch(awaitFor);
      
      promise
      .then(
        () => {
          stillLoadingTimer = window.setTimeout(
            awaitComplete,
            delay
          );
        }
      );
  
      return () => {
        window.clearTimeout(stillLoadingTimer);
        cancel();
      };
    }
  });
  
  return (
    <React.Fragment>
      <Spinner transitionIn={isLoading} onExited={showChildren}/>
      <CSSTransition transitionIn={spinnerRemoved} transitionStyle={TransitionStyleName.fade}>
        {children}
      </CSSTransition>
    </React.Fragment>
  );
};

export default Asynchronizer;
