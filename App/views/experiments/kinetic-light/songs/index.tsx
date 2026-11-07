import React from 'react';

// Libraries
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

// Icons
import * as Ri from 'react-icons/ri';

// Routes
import { useParams } from 'design/router';

// Components
import { Details, HyperLink, Layout, List, ListItem } from 'design/components';

// Context
import { useKineticLightContext } from '@/views/experiments/kinetic-light/context';

// Constants
import { PARAM, toPath } from '@/views/experiments/kinetic-light/constants';

const Songs: React.FunctionComponent = () => {
  const { examples, songs } = useKineticLightContext();
  const { t } = useTranslation('kinetic-light');
  const { id } = useParams<typeof PARAM>();

  const listOf = (items: typeof songs) => (
    <List
      alignItems='stretch'
      autoFlow='row'
      gap='narrow'
      justifyContent='stretch'
    >
      {items.map((song) => (
        <ListItem key={song.id}>
          <HyperLink
            after={
              <Ri.RiCheckLine
                aria-hidden
                className={classNames({
                  'kicl-hidden': id !== song.id,
                })}
              />
            }
            before={<Ri.RiMusic2Line aria-hidden />}
            className='kicl-inline-size-full'
            frames='max-content--auto--max-content'
            justifyContent='stretch'
            lookLikeButton
            to={toPath(song.id)}
            variant='secondary'
          >
            <span className='kicl-text-truncate' title={song.title}>
              {song.title}
            </span>
          </HyperLink>
        </ListItem>
      ))}
    </List>
  );

  return (
    <Layout autoFlow='row' gap='normal'>
      <nav aria-label={t('label', { context: 'songs' })}>
        {songs.length ? (
          <Details gap='narrow' open summary={t('title', { context: 'songs' })}>
            {listOf(songs)}
          </Details>
        ) : null}
        <Details
          gap='narrow'
          open
          summary={t('title', { context: 'examples' })}
        >
          {listOf(examples)}
        </Details>
      </nav>
    </Layout>
  );
};

export { Songs };
