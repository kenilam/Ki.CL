import React, { useId } from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Animation, Heading, Layout } from 'design/components';

// Partials
import { Play } from './play';

// Styles
import './styles.scss';

// Hooks
import { useTranslation } from 'design/hooks';

// Context
import { useTransportContext } from '@/views/experiments/kinetic-light/song/player/context';

// Constants
import { CLASS_NAME as VIEW } from '@/views/experiments/kinetic-light/constants';

const CLASS_NAME = `${VIEW}__player__prompt`;

const Prompt: React.FunctionComponent = () => {
  const { status } = useTransportContext();
  const { t } = useTranslation('kinetic-light');
  const label = useId();

  if (status === 'playing' || status === 'paused') {
    return null;
  }

  return (
    <Layout
      alignContent='center'
      autoFlow='row'
      display='grid'
      gap='narrow'
      justifyItems='center'
    >
      <Animation duration='slow'>
        <div
          className={classNames(
            CLASS_NAME,
            'kicl-backdrop',
            'kicl-inset-0',
            'kicl-position-absolute'
          )}
        >
          <Heading id={label} is='h2' lookLike='h3'>
            {t('prompt', { context: status === 'ended' ? 'replay' : 'start' })}
          </Heading>
          <Play aria-labelledby={label} />
        </div>
      </Animation>
    </Layout>
  );
};

export { Prompt };
