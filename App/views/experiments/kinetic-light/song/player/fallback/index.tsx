import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Heading, HyperLink, Text } from 'design/components';

// Status
import { Status404 } from 'design/status';

// Hooks
import { useTranslation } from 'design/hooks';

// Context
import { useSongContext } from '@/views/experiments/kinetic-light/song/context';

// Constants
import {
  CLASS_NAME as VIEW,
  toPath,
} from '@/views/experiments/kinetic-light/constants';

const CLASS_NAME = `${VIEW}__player__fallback`;

const Fallback: React.FunctionComponent = () => {
  const { song } = useSongContext();
  const translations = {
    common: useTranslation(),
    kineticLight: useTranslation('kinetic-light'),
  };

  if (!song) {
    return <Status404 />;
  }

  return (
    <article
      className={classNames(
        CLASS_NAME,
        'kicl-margin-inline-auto',
        'kicl-max-inline-size-columns-6',
        'kicl-padding-block-end-frame',
        'kicl-padding-block-start-header',
        'kicl-padding-inline-frame'
      )}
    >
      <Heading is='h1' dense className='kicl-font-size-huge'>
        {translations.common.t('experiment', { context: 'kinetic_light' })}
      </Heading>
      <Text is='p' variant='secondary' className='kicl-margin-block-end'>
        {song.failure ??
          translations.kineticLight.t('status', { context: 'waiting' })}
      </Text>
      <HyperLink lookLikeButton to={toPath()}>
        {translations.kineticLight.t('action', { context: 'choose' })}
      </HyperLink>
    </article>
  );
};

export { Fallback };
