import React from 'react';

// Components
import { Details, List } from 'design/components';

// Partials
import { Item } from '@/views/experiments/kinetic-light/songs/item';

// Hooks
import { useTranslation } from 'design/hooks';

// Context
import { useSongsContext } from '@/views/experiments/kinetic-light/context';

const Yours: React.FunctionComponent = () => {
  const { songs } = useSongsContext();
  const { t } = useTranslation('kinetic-light');

  if (!songs.length) {
    return null;
  }

  return (
    <Details gap='narrow' open summary={t('title', { context: 'songs' })}>
      <List
        alignItems='stretch'
        autoFlow='row'
        gap='narrow'
        justifyContent='stretch'
      >
        {songs.map((song) => {
          return <Item id={song.id} key={song.id} />;
        })}
      </List>
    </Details>
  );
};

export { Yours };
