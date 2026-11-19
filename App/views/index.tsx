import React from 'react';

// Routes
import { Router, Route } from 'design/router';

// Status
import { ErrorElement, Status404 } from 'design/status';

// Views
import { About } from './about';
import { Blog } from './blog';
import { Experiments } from './experiments';
import { Home } from './home';
import { Me } from './me';
import { Portfolio } from './portfolio';
import { Resume } from './resume';
import { ResumeRedirect } from './resume/redirect';
import { Workshop } from './workshop';
import { DesignSystemRedirect } from './workshop/design-system/redirect';

// Partials
import { Element } from './element';

const Views: React.FunctionComponent = () => {
  return (
    <Router>
      <Route path='/' errorElement={<ErrorElement />} element={<Element />}>
        <Route path='*' element={<Status404 />} />
        {About}
        {Blog}
        {DesignSystemRedirect}
        {Experiments}
        {Home}
        {Me}
        {Portfolio}
        {Resume}
        {ResumeRedirect}
        {Workshop}
      </Route>
    </Router>
  );
};

export { Views };
