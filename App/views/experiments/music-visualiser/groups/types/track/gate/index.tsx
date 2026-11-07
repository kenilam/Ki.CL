import React from 'react';

// Libraries
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

// Icons
import * as Ri from 'react-icons/ri';

// Components
import { BackLink, Heading, HyperLink, Layout, Text } from 'design/components';

// Catalog
import { ATTRIBUTION } from '@/views/experiments/music-visualiser/catalog';
import { useNames } from '@/views/experiments/music-visualiser/use-names';

// Context
import { useTrackContext } from '@/views/experiments/music-visualiser/groups/types/track/context';

// Constants
import {
  CLASS_NAME as VIEW,
  toPath,
  toPlayPath,
} from '@/views/experiments/music-visualiser/constants';

const CLASS_NAME = `${VIEW}__gate`;

/**
 * A track's gate: its title, where it is from, and a link to its `/play`.
 * The press on that link is the gesture the browser needs before audio.
 */
const Gate: React.FunctionComponent = () => {
  const { track } = useTrackContext();
  const { t } = useTranslation('music-visualiser');
  const { category, title } = useNames(track);

  return (
    <Layout
      alignContent='center'
      alignItems='center'
      autoFlow='row'
      gap='none'
      justifyContent='center'
      justifyItems='center'
    >
      <section
        className={classNames(
          CLASS_NAME,
          'kicl-inset-0',
          'kicl-margin-inline-auto',
          'kicl-max-inline-size-columns-6',
          'kicl-padding-block-end-frame',
          'kicl-padding-block-start-header',
          'kicl-padding-inline-frame',
          'kicl-position-absolute',
          'kicl-text-align-center'
        )}
      >
        <Layout autoFlow='row' gap='none' justifyItems='center'>
          <header>
            <BackLink className='kicl-margin-block-end' to={toPath()} />
            <Heading is='h1' dense className='kicl-font-size-huge'>
              {title}
            </Heading>
          </header>
        </Layout>
        <Text
          is='p'
          dense
          variant='secondary'
          className={classNames(
            'kicl-font-size-medium',
            'kicl-margin-block-start-wide'
          )}
        >
          {t('source', { category })}
        </Text>
        <HyperLink to={ATTRIBUTION.url}>{t('attribution')}</HyperLink>
        <HyperLink
          aria-label={t('action', { context: 'play', title })}
          className='kicl-margin-block-start-wide'
          lookLikeButton
          size='small'
          to={toPlayPath(track)}
          variant='ghost'
        >
          <Ri.RiPlayFill aria-hidden />
        </HyperLink>
      </section>
    </Layout>
  );
};

export { Gate };
