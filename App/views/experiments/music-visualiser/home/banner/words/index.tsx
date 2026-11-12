import React, { useState } from 'react';

// Libraries
import classNames from 'classnames';

// Icons
import * as Tb from 'react-icons/tb';

// Components
import { BackLink, Heading, HyperLink, Layout, Text } from 'design/components';

// Catalog
import { TOTAL, draw } from '@/views/experiments/music-visualiser/catalog';
import { SCENES } from '@/views/experiments/music-visualiser/spec';

// Hooks
import { useTranslation } from 'design/hooks';

// Constants
import { toPath as toExperimentsPath } from '@/views/experiments/constants';
import { CLASS_NAME as HOME } from '@/views/experiments/music-visualiser/home/constants';
import {
  PATH,
  toTrackPath,
} from '@/views/experiments/music-visualiser/constants';

const CLASS_NAME = `${HOME}__banner__words`;

/** The page's header: the title, a line about it, and a link to a random track. */
const Words: React.FunctionComponent = () => {
  const [track] = useState(() => draw());
  const translations = {
    common: useTranslation(),
    musicVisualiser: useTranslation('music-visualiser'),
  };

  return (
    <Layout autoFlow='row' gap='narrow' justifyItems='center'>
      <header
        className={classNames(
          CLASS_NAME,
          'kicl-max-inline-size-columns-12',
          'kicl-padding-block-frame',
          'kicl-padding-inline-frame',
          'kicl-position-relative',
          'kicl-text-align-center'
        )}
      >
        <BackLink
          label={translations.common.t('experiments')}
          to={toExperimentsPath(PATH)}
        />
        <Heading dense is='h1' lookLike='display'>
          {translations.common.t('experiment', { context: 'music_visualiser' })}
        </Heading>
        <Text is='p'>
          {translations.musicVisualiser.t('summary', {
            scenes: SCENES.length,
            tracks: TOTAL,
          })}
        </Text>
        <HyperLink
          after={<Tb.TbPlayerPlayFilled aria-hidden />}
          className='kicl-margin-block-start-narrow'
          lookLikeButton
          size='small'
          to={toTrackPath(track)}
        >
          {translations.musicVisualiser.t('action', { context: 'play_random' })}
        </HyperLink>
      </header>
    </Layout>
  );
};

export { Words };
