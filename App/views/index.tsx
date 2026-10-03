import React from 'react';

// Routes
import { Router, Route } from '@/router';

// Status
import { ErrorElement, Status404 } from 'design/status';

// Views
import { Experiments } from './experiments';
import { Home } from './home';
import { Portfolio } from './portfolio';

// Partials
import { Element } from './element';

const Views: React.FunctionComponent = () => {
  return (
    <Router>
      <Route path='/' errorElement={<ErrorElement />} element={<Element />}>
        <Route path='*' element={<Status404 />} />
        {Experiments}
        {Home}
        {Portfolio}
      </Route>
    </Router>
  );
};

export { Views };
