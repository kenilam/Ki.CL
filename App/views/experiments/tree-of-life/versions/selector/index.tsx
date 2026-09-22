import React from 'react';

// Styles
import './styles.scss';

// Partials
import { Panel } from './panel';
import { Toggle } from './toggle';

const Selector: React.FunctionComponent = () => (
  <>
    <Toggle />
    <Panel />
  </>
);

export { Selector };
