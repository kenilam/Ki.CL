import {Route} from "@Component/Router";
import * as React from 'react';
import {IProps} from './spec';

const Work = ({match}: IProps) => (
  <section>
    {match.params.projectId}
  </section>
);

export default <Route path='/works/:projectId' exact={true} render={Work} />
