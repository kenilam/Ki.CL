import { hot } from 'react-hot-loader';

import renderer from './renderer';
import App from './App';

const Component = hot(module)(App);

renderer(Component);
