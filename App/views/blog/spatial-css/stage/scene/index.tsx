import React from 'react';

// Views
import { Pause } from '@/views/mark';

// Partials
import { Effects } from './effects';
import { Rig } from './rig';
import { Anchor } from './scenes/anchor';
import { Exploded } from './scenes/exploded';
import { Flat } from './scenes/flat';
import { Lighting } from './scenes/lighting';
import { Model } from './scenes/model';
import { Orbit } from './scenes/orbit';
import { Portal } from './scenes/portal';
import { Room } from './scenes/room';
import { Transition } from './scenes/transition';
import { Studio } from './studio';

const Scene: React.FunctionComponent = () => {
  return (
    <>
      <Studio />
      <Rig>
        <Exploded />
        <Flat />
        <Model />
        <Portal />
        <Anchor />
        <Lighting />
        <Orbit />
        <Room />
        <Transition />
      </Rig>
      <Effects />
      <Pause />
    </>
  );
};

export { Scene };
