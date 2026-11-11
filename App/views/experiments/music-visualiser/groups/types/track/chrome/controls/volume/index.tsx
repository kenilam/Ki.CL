import React from 'react';

// Components
import { ListItem, VolumeButton } from 'design/components';

// Context
import { useTrackContext } from '@/views/experiments/music-visualiser/groups/types/track/context';

const Volume: React.FunctionComponent = () => {
  const { control } = useTrackContext();

  return (
    <ListItem>
      <VolumeButton
        onChange={(event) => control.setValue(Number(event.target.value))}
        size='small'
        value={control.value}
        variant='secondary'
      />
    </ListItem>
  );
};

export { Volume };
