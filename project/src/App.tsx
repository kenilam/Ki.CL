import React from 'react';

import { Router } from '@/Component';
import View from '@/View';

const appRoot = document.querySelector('[app-root]');

const App = () => (
  <Router>
    <View/>
  </Router>
);

export { appRoot };
export default App;
