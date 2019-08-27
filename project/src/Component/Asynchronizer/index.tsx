import {CSSTransition} from "@/Component";
import {TransitionStyleName} from "@/Component/CSSTransition";
import Spinner from "@/Component/Spinner";
import IAsynchronizer from "./spec";
import React, {useEffect, useState} from 'react';

const Asynchronizer: React.FunctionComponent<IAsynchronizer.Props> = ({
  awaitFor,
  children
}) => {
  const [
    isLoading,
    stillLoading
  ]: IAsynchronizer.LoadingState = useState<IAsynchronizer.IsLoading>(true);
  
  useEffect(() => {
    awaitFor.then(
      () => {
        stillLoading(false);
      }
    );
  }, [isLoading]);
  
  return (
    <React.Fragment>
      <Spinner show={isLoading}/>
      <CSSTransition transitionIn={!isLoading} transitionStyle={TransitionStyleName.fade}>
        {children}
      </CSSTransition>
    </React.Fragment>
  );
};

export default Asynchronizer;
