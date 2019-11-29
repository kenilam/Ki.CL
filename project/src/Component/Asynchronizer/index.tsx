import {CSSTransition, Spinner} from '@/Component';
import {CSSUnit, Fetch} from '@/Helper';
import React, {useEffect, useState} from 'react';
import IAsynchronizer from './spec';
import Style from './Style';

const awaitDelay = CSSUnit(Style.delay);

const Asynchronizer: React.FunctionComponent<IAsynchronizer.Props> = ({
  awaitFor,
  children,
  transitionType
}) => {
  let awaitTimer: number;
  
  const [data, updateData] = useState(null);
  
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
          <CSSTransition type={transitionType} in={Boolean(data)}>
            {children(data)}
          </CSSTransition>
        )
      }
    </React.Fragment>
  );
};

Asynchronizer.defaultProps = {
  transitionType: 'zoomIn'
};

export default Asynchronizer;
