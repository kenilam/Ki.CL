import { Router } from '@/Component'
import React, { FunctionComponent } from 'react';
import { useLocation } from 'react-router-dom';
import About, * as AboutSettings from './About';
import Contact, * as ContactSettings from './Contact';
import Home, * as HomeSettings from './Home';
import Works, * as WorksSettings from './Works';
import { Props, Types } from './spec';

const transitionTypes: Types = {
  [AboutSettings.path]: AboutSettings.transitionType,
  [ContactSettings.path]: ContactSettings.transitionType,
  [HomeSettings.path]: HomeSettings.transitionType,
  [WorksSettings.path]: WorksSettings.transitionType,
};

const View: FunctionComponent<Props> = () => {
  const { pathname } = useLocation();
  return (
    <Router
      appear={true}
      routeIndex={0}
      transitionType={transitionTypes[pathname]}
    >
      {About}
      {Contact}
      {Home}
      {Works}
    </Router>
  );
};

export default View;
