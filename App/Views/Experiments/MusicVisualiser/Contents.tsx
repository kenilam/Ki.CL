import React from 'react';

// Libraries
import classNames from 'classnames';

// Routes
import { Outlet } from '@/Router';

// Components
import { Layout } from '@/Components';

// Context
import { RadioContext } from './Context';

// Partials
import Stage from './Stage';

// Hooks
import useRadio from './useRadio';

// Styles
import './Styles.scss';

// Constants
import { CLASS_NAME } from './constants';

/**
 * The shell: the stage, and the radio the routes beneath it drive. The
 * routes draw the rest - the gates and the controls - through the outlet.
 */
const MusicVisualiser: React.FunctionComponent = () => {
  const radio = useRadio();

  return (
    <RadioContext.Provider value={radio}>
      <Layout autoFlow='row' gap='none'>
        <section className={classNames(CLASS_NAME, 'kicl-position-relative')}>
          <Stage
            engine={radio.engine}
            playing={radio.state === 'playing'}
            track={radio.track}
          />
          <Outlet />
        </section>
      </Layout>
    </RadioContext.Provider>
  );
};

export default MusicVisualiser;
