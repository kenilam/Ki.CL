import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Frame, Heading } from 'design/components';

// Partials
import { Floor } from './floor';

// Constants
import { CLASS_NAME, COPY } from './constants';

const RoboticArm: React.FunctionComponent = () => (
  <>
    <Heading is='h1' className='kicl-hidden'>
      {COPY.title}
    </Heading>

    <Frame>
      <figure
        aria-label={COPY.floor}
        className={classNames(CLASS_NAME, 'kicl-position-relative')}
      >
        <Floor />
      </figure>
    </Frame>
  </>
);

export { RoboticArm };
