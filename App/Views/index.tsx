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

  return (
    <>
      <GlobalHeader />
      <AnimationGroup
        animationKey={location.pathname}
        animationStyle={ANIMATION_STYLES['zoom-in']}
      >
        <Routes location={location}>
          <Route path='about' element={<About />} />
          <Route path='works' element={<Works />} />
        </Routes>
      </AnimationGroup>
    </>
  );
};

const ErrorElement: React.FunctionComponent = () => {
  return (
    <>
      <GlobalHeader />
      <ERROR_ELEMENT />
    </>
  );
};

const App: React.FunctionComponent = () => {
  return (
    <Router>
      <Route path='/' errorElement={<ErrorElement />} element={<Layout />}>
        <Route path='about' />
        <Route path='works' />
      </Route>
    </Router>
  );
};

export default App;
