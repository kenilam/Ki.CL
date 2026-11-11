import React from 'react';

// Components
import { List } from 'design/components';

// Partials
import { Clip } from '@/views/experiments/music-visualiser/groups/types/track/chrome/controls/clip';
import { Next } from '@/views/experiments/music-visualiser/groups/types/track/chrome/controls/next';
import { Pause } from '@/views/experiments/music-visualiser/groups/types/track/chrome/controls/pause';
import { Progress } from '@/views/experiments/music-visualiser/groups/types/track/chrome/controls/progress';
import { Share } from '@/views/experiments/music-visualiser/groups/types/track/chrome/controls/share';
import { Volume } from '@/views/experiments/music-visualiser/groups/types/track/chrome/controls/volume';

const Narrowest: React.FunctionComponent = () => (
  <>
    <Progress />
    <List alignItems='center' display='flex' gap='narrow' wrap>
      <Pause />
      <Next />
      <Volume />
      <Share />
      <Clip />
    </List>
  </>
);

export { Narrowest };
