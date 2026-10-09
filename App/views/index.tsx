import React from 'react';

// Routes
import { Router, Route } from 'design/router';

// Status
import { ErrorElement, Status404 } from 'design/status';

// Views
import { Experiments } from './experiments';
import { Home } from './home';
import { Me } from './me';
import { Portfolio } from './portfolio';
import { Resume } from './resume';

// Partials
import { Element } from './element';

const Views: React.FunctionComponent = () => {
  return (
    <Router>
      <Route path='/' errorElement={<ErrorElement />} element={<Element />}>
        <Route path='*' element={<Status404 />} />
        {Experiments}
        {Home}
        {Me}
        {Portfolio}
        {Resume}
      </Route>
    </Router>
  );
};

export { Views };
