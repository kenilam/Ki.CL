import React, { useEffect } from 'react';

// Routes
import Router, {
  useLocation,
  ErrorElement as ERROR_ELEMENT,
  Routes,
  Route,
} from '@/Router';

// Animation
import { ANIMATION_STYLES, AnimationGroup } from '@/Animation';

// Widgets
import { GlobalHeader } from '@/Widgets';

// Views
import About from './About';
import Home from './Home';
import Works from './Works';

// Styles
import './Styles.scss';

const Layout: React.FunctionComponent = () => {
  const location = useLocation();

  useEffect(() => {
    const root = document.querySelector('body');

    if (!root) {
      return;
    }

    const routes = (location.pathname.replace('/', '') || 'home').split('/');

    root.dataset.routes = routes.join('.');

    document.title = `Ki.CL | ${routes.join(' | ').toUpperCase()}`;
  });

  const [, animationKey] = location.pathname.split('/');

  return (
    <>
      <GlobalHeader />
      <main className='kicl--view'>
        <AnimationGroup
          animationKey={animationKey}
          animationStyle={ANIMATION_STYLES['zoom-out']}
        >
          <Routes location={location}>
            {About}
            {Home}
            {Works}
          </Routes>
        </AnimationGroup>
      </main>
    </>
  );
};

const ErrorElement: React.FunctionComponent = () => {
  return (
    <>
      <GlobalHeader />
      <main className='kicl--view'>
        <ERROR_ELEMENT />
      </main>
    </>
  );
};

const App: React.FunctionComponent = () => {
  return (
    <Router>
      <Route path='/' errorElement={<ErrorElement />} element={<Layout />} />
    </Router>
  );
};

export default App;
