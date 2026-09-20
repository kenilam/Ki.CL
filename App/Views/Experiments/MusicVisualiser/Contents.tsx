import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Layout } from '@/Components';

// Partials
import Chrome from './Chrome';
import Stage from './Stage';

// Hooks
import useRadio from './useRadio';

// Styles
import './Styles.scss';

// Constants
import { CLASS_NAME } from './constants';

const MusicVisualiser: React.FunctionComponent = () => {
  const radio = useRadio();

  return (
    <Layout autoFlow='row' gap='none'>
      <section className={classNames(CLASS_NAME, 'kicl-position-relative')}>
        <Stage
          engine={radio.engine}
          playing={radio.state === 'playing'}
          track={radio.track}
        />
        <Chrome {...radio} />
      </section>
    </Layout>
  );
};

export default MusicVisualiser;
