import React from 'react';

// Routes
import { Routes, Route as Origin, useLocation } from '@/Router';

// Animation
import { ANIMATION_STYLES, AnimationGroup } from '@/Animation';

// Views
import RollingBall, { Route as RollingBallRoute } from './RollingBall';
import FishTank, { Route as FishTankRoute } from './FishTank';

const PATH = 'works';

const Works = () => {
  const location = useLocation();

  const [, , animationKey] = location.pathname.split('/');

  return (
    <section className='kicl--view--works'>
      <AnimationGroup
        animationKey={animationKey}
        animationStyle={ANIMATION_STYLES['zoom-out']}
      >
        <Routes location={location}>
          {RollingBall}
          {FishTank}
        </Routes>
      </AnimationGroup>
    </section>
  );
};

const Route = (
  <Origin path={`${PATH}/*`}>
    {RollingBallRoute}
    {FishTankRoute}
  </Origin>
);

export { PATH, Route };
export default <Origin path={`${PATH}/*`} element={<Works />} />;
