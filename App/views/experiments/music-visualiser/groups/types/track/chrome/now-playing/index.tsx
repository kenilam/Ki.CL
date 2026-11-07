import React from 'react';

// Libraries
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

// Components
import {
  Animation,
  BackLink,
  Heading,
  HyperLink,
  Layout,
  Text,
} from 'design/components';

// Catalog
import { ATTRIBUTION } from '@/views/experiments/music-visualiser/catalog';
import { useNames } from '@/views/experiments/music-visualiser/catalog/use-names';

// Context
import { useTrackContext } from '@/views/experiments/music-visualiser/groups/types/track/context';

// Styles
import './styles.scss';

// Constants
import {
  CLASS_NAME as VIEW,
  toPath,
} from '@/views/experiments/music-visualiser/constants';

const CLASS_NAME = `${VIEW}__chrome__now-playing`;

/** The track's title, category and attribution, and any error playing it. */
const NowPlaying: React.FunctionComponent = () => {
  const {
    control: { error },
    track,
  } = useTrackContext();
  const translations = {
    common: useTranslation(),
    musicVisualiser: useTranslation('music-visualiser'),
  };
  const { category, title } = useNames(track);

  return (
    <Layout autoFlow='row' gap='narrowest' justifyItems='start'>
      <header
        className={classNames(
          CLASS_NAME,
          'kicl-max-inline-size-columns-4',
          'kicl-transition-duration-slow'
        )}
      >
        <BackLink
          className='kicl-margin-block-end'
          label={translations.common.t('experiment', {
            context: 'music_visualiser',
          })}
          to={toPath()}
        />
        <Heading
          aria-live='polite'
          className='kicl-font-size-large'
          dense
          is='h1'
        >
          {title}
        </Heading>
        <Text is='p' dense variant='secondary'>
          {category}
        </Text>
        <HyperLink to={ATTRIBUTION.url}>
          {translations.musicVisualiser.t('attribution')}
        </HyperLink>
        {error ? (
          <Animation property='slide-from-top'>
            <Text className='kicl-color-error' dense is='p' role='alert'>
              {translations.musicVisualiser.t('error', { context: 'playback' })}
            </Text>
          </Animation>
        ) : null}
      </header>
    </Layout>
  );
};

export { NowPlaying };
