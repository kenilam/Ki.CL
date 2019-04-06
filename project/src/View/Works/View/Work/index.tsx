import {Route} from "@Component/Router";
import * as React from 'react';
import {IProps} from './spec';

const Work = ({match}: IProps) => {
  const {params: {projectId}} = match;
  
  return (
    <section data-routes={`works.${projectId}`}>
      {projectId}
    </section>
  );
}

export default <Route path='/works/:projectId' exact={true} render={Work} />
