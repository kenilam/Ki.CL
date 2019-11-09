import {TransitionStyle} from '@/Component/CSSTransition';
import Spinner from '@/Component/Spinner';
import {CSSUnit, Fetch} from '@/Helper';
import React, {useEffect, useState} from 'react';
import IAsynchronizer from './spec';
import Style from './Style';

const awaitDelay = CSSUnit(Style.delay);

const Asynchronizer: React.FunctionComponent<IAsynchronizer.Props> = ({
  awaitFor,
  children
}) => {
  let awaitTimer: number;
  
  const [data, updateData]: IAsynchronizer.DataState = useState<IAsynchronizer.Data>(null);
  
  const awaitComplete = (data: any) => () => {
    updateData(data);
  };
  
  useEffect(() => {
    if (!data) {
      const {cancel, promise} = Fetch(awaitFor);
      
      promise.then(data => {
        awaitTimer = window.setTimeout(awaitComplete(data), awaitDelay);
      });
      
      return () => {
        window.clearTimeout(awaitTimer);
        cancel();
      };
    }
  }, [data]);
  
  return (
    <React.Fragment>
      <Spinner in={Boolean(!data)} />
      {
        Boolean(data) && (
          <TransitionStyle.ZoomIn in={Boolean(data)}>
            {children(data)}
          </TransitionStyle.ZoomIn>
        )
      }
    </React.Fragment>
  );
};

export default Asynchronizer;
