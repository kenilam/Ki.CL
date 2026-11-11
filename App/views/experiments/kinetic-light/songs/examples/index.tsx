import React from 'react';

// Components
import { Details, List } from 'design/components';

// Partials
import { Item } from '@/views/experiments/kinetic-light/songs/item';

// Hooks
import { useTranslation } from 'design/hooks';

// Context
import { useSongsContext } from '@/views/experiments/kinetic-light/context';

const Examples: React.FunctionComponent = () => {
  const { examples, songs } = useSongsContext();
  const { t } = useTranslation('kinetic-light');

  return (
    <Details
      gap='narrow'
      open={!songs.length}
      summary={t('title', { context: 'examples' })}
    >
      <List
        alignItems='stretch'
        autoFlow='row'
        gap='narrow'
        justifyContent='stretch'
      >
        {examples.map((song) => {
          return <Item id={song.id} key={song.id} />;
        })}
      </List>
    </Details>
  );
};

export { Examples };
