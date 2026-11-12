import React from 'react';

// Components
import { Layout, List } from 'design/components';

// Partials
import { Clip } from '@/views/experiments/music-visualiser/groups/types/track/chrome/controls/clip';
import { Next } from '@/views/experiments/music-visualiser/groups/types/track/chrome/controls/next';
import { Pause } from '@/views/experiments/music-visualiser/groups/types/track/chrome/controls/pause';
import { Progress } from '@/views/experiments/music-visualiser/groups/types/track/chrome/controls/progress';
import { Share } from '@/views/experiments/music-visualiser/groups/types/track/chrome/controls/share';
import { Volume } from '@/views/experiments/music-visualiser/groups/types/track/chrome/controls/volume';

// Styles
import './styles.scss';

// Constants
import { CLASS_NAME as VIEW } from '@/views/experiments/music-visualiser/constants';

const CLASS_NAME = `${VIEW}__chrome__controls__narrowest`;

/** One root, so the controls' row has one item to fold. */
const Narrowest: React.FunctionComponent = () => (
  <Layout autoFlow='row' gap='narrow'>
    <div className={CLASS_NAME}>
      <Progress />
      <List alignItems='center' display='flex' gap='narrow' wrap>
        <Pause />
        <Next />
        <Volume />
        <Share />
        <Clip />
      </List>
    </div>
  </Layout>
);

export { Narrowest };
