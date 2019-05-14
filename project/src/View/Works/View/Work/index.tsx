import {Route} from '@Component/Router';
import React from 'react';
import * as IWork from './spec';

const Work = ({match}: IWork.Props) => {
  const {params: {projectId}} = match;
  
  return (
    <section data-routes={`works.${projectId}`}>
      {projectId}
    </section>
  );
};

export default <Route path='/works/:projectId' exact={true} render={Work} />
