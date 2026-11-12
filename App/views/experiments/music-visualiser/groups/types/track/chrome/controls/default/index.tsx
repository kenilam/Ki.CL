import React from 'react';

// Components
import { List, ListItem } from 'design/components';

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

const CLASS_NAME = `${VIEW}__chrome__controls__default`;

const Default: React.FunctionComponent = () => (
  <List
    alignItems='center'
    className={CLASS_NAME}
    display='flex'
    gap='narrow'
    wrap
  >
    <Pause />
    <Next />
    <ListItem className='kicl-flex-1'>
      <Progress />
    </ListItem>
    <Volume />
    <Share />
    <Clip />
  </List>
);

export { Default };
