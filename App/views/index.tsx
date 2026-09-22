import React from 'react';

// Routes
import { Router, ErrorElement, HttpStatus, Route } from '@/router';

// Views
import { Experiments } from './experiments';
import { Home } from './home';
import { Portfolio } from './portfolio';

// Partials
import { Element } from './element';

// Styles
import './styles.scss';

const Views: React.FunctionComponent = () => {
  return (
    <Router>
      <Route path='/' errorElement={<ErrorElement />} element={<Element />}>
        <Route path='*' element={<HttpStatus.Status404 />} />
        {Experiments}
        {Home}
        {Portfolio}
      </Route>
    </Router>
  );
};

export { Views };
