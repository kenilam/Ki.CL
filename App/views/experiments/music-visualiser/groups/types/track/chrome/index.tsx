import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Layout } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';
import { useChrome } from './use-chrome';

// Partials
import { Controls } from './controls';
import { NowPlaying } from './now-playing';

// Styles
import './styles.scss';

// Constants
import { CLASS_NAME as VIEW } from '@/views/experiments/music-visualiser/constants';

const CLASS_NAME = `${VIEW}__chrome`;

const Chrome: React.FunctionComponent = () => {
  const { t } = useTranslation('music-visualiser');
  const idle = useChrome();

  return (
    <Layout
      alignContent='end'
      alignItems='end'
      autoFlow='row'
      display='flex'
      gap='wide'
      justifyContent='space-between'
      wrap='stack'
    >
      <section
        aria-label={t('label', { context: 'player' })}
        className={classNames(
          CLASS_NAME,
          'kicl-inline-size-full',
          'kicl-padding-block-start-frame',
          'kicl-padding-inline-frame-columns-12',
          'kicl-ease-sine-out',
          'kicl-position-relative',
          'kicl-transition-duration-slow',
          {
            [`${CLASS_NAME}--idle`]: idle,
          }
        )}
      >
        <NowPlaying />
        <Controls />
      </section>
    </Layout>
  );
};

export { CLASS_NAME, Chrome };
