import {Route} from "@Component/Router";
import * as React from 'react';
import {Redirect} from "react-router";

import {IProps} from './spec';

const Work = ({location, match}: IProps) => {
  if (location.search.indexOf('sort') > -1) {
    return <Redirect to={'/wors'} />;
  }
  
  return (
    <section>
      {match.params.projectId}
    </section>
  );
}

export default <Route path='/works/:projectId' exact={true} render={Work} />
