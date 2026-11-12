import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Layout, List } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Partials
import { Beat } from './beat';
import { Header } from './header';
import { Play } from './play';
import { Progress } from './progress';
import { Settings } from './settings';
import { Sound } from './sound';

// Styles
import './styles.scss';

// Constants
import { CLASS_NAME as VIEW } from '@/views/experiments/kinetic-light/constants';

const CLASS_NAME = `${VIEW}__player__chrome`;

const Chrome: React.FunctionComponent = () => {
  const { t } = useTranslation('kinetic-light');

  return (
    <Layout
      alignContent='end'
      alignItems='end'
      display='flex'
      gap='narrow'
      justifyContent='space-between'
      wrap
    >
      <section
        aria-label={t('label', { context: 'player' })}
        className={classNames(
          CLASS_NAME,
          'kicl-background-repeat-no-repeat',
          'kicl-inset-block-end-0',
          'kicl-inset-inline-0',
          'kicl-padding-block-frame',
          'kicl-padding-inline-frame-columns-12',
          'kicl-pointer-events-none',
          'kicl-position-absolute'
        )}
      >
        <Header />
        <Layout autoFlow='row' gap='narrow'>
          <div className='kicl-pointer-events-auto'>
            <Progress />
            <List alignItems='center' display='flex' gap='narrow' wrap>
              <Play />
              <Sound />
              <Beat />
              <Settings />
            </List>
          </div>
        </Layout>
      </section>
    </Layout>
  );
};

export { Chrome };
