import React from 'react';

// Libraries
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

// Components
import { Animation, Heading, HyperLink, Layout, Text } from 'design/components';

// Catalog
import { ATTRIBUTION } from '@/views/experiments/music-visualiser/catalog';
import { useNames } from '@/views/experiments/music-visualiser/catalog/use-names';

// Context
import { useTrackContext } from '@/views/experiments/music-visualiser/groups/types/track/context';

// Styles
import './styles.scss';

// Constants
import { CLASS_NAME as VIEW } from '@/views/experiments/music-visualiser/constants';

const CLASS_NAME = `${VIEW}__chrome__now-playing`;

/** The track's title, category and attribution, and any error playing it. */
const NowPlaying: React.FunctionComponent = () => {
  const {
    control: { error },
    track,
  } = useTrackContext();
  const { t } = useTranslation('music-visualiser');
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
        <Heading
          aria-live='polite'
          className='kicl-font-size-large'
          dense
          is='h1'
        >
          {title}
        </Heading>
        <Text is='p' dense variant='secondary' className='kicl-font-size-small'>
          {category}
        </Text>
        <HyperLink className='kicl-font-size-smaller' to={ATTRIBUTION.url}>
          {t('attribution')}
        </HyperLink>
        {error ? (
          <Animation property='slide-from-top'>
            <Text
              className={classNames('kicl-color-error', 'kicl-font-size-small')}
              dense
              is='p'
              role='alert'
            >
              {t('error', { context: 'playback' })}
            </Text>
          </Animation>
        ) : null}
      </header>
    </Layout>
  );
};

export { NowPlaying };
