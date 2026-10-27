import React, { useState } from 'react';

// Libraries
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

// Icons
import * as Fa from 'react-icons/fa6';
import * as Ri from 'react-icons/ri';

// Components
import { Heading, HyperLink, Layout, Text } from 'design/components';

// Catalog
import { TOTAL, draw } from '@/views/experiments/music-visualiser/catalog';
import { SCENES } from '@/views/experiments/music-visualiser/groups/types/track/visualiser/spec';

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
  const { t } = useTranslation('music-visualiser');
  const { t: common } = useTranslation();

  return (
    <Layout autoFlow='row' gap='none' justifyItems='center'>
      <header
        className={classNames(
          CLASS_NAME,
          'kicl-max-inline-size-columns-12',
          'kicl-padding-block-start-header',
          'kicl-padding-inline-frame',
          'kicl-position-relative',
          'kicl-text-align-center'
        )}
      >
        <HyperLink
          before={<Ri.RiArrowLeftSFill aria-hidden />}
          to={toExperimentsPath(PATH)}
        >
          {common('experiments')}
        </HyperLink>
        <Heading is='h1' dense className='kicl-font-size-huge'>
          {common('experiment', { context: 'music_visualiser' })}
        </Heading>
        <Text is='p' className='kicl-margin-block-start-wide'>
          {t('summary', { scenes: SCENES.length, tracks: TOTAL })}
        </Text>
        <HyperLink
          after={<Fa.FaPlay aria-hidden />}
          className='kicl-margin-block-start-wide'
          lookLikeButton
          size='small'
          to={toTrackPath(track)}
        >
          {t('action', { context: 'play_random' })}
        </HyperLink>
      </header>
    </Layout>
  );
};

export { Words };
