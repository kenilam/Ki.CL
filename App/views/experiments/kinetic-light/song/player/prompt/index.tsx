import React, { useEffect, useId, useRef } from 'react';

// Libraries
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

// Icons
import * as Bs from 'react-icons/bs';

// Components
import { Animation, Button, Heading, Layout } from 'design/components';

// Styles
import './styles.scss';

// Context
import { usePlayerContext } from '@/views/experiments/kinetic-light/song/player/context';

// Constants
import { CLASS_NAME as VIEW } from '@/views/experiments/kinetic-light/constants';

const CLASS_NAME = `${VIEW}__player__prompt`;

const Prompt: React.FunctionComponent = () => {
  const { arranger, transport } = usePlayerContext();
  const { t } = useTranslation('kinetic-light');
  const { play, status } = transport;
  const button = useRef<HTMLButtonElement>(null);
  const label = useId();
  const shown = status !== 'playing' && status !== 'paused';
  const busy = status === 'loading' || arranger.arranging;
  const ended = status === 'ended';

  useEffect(() => {
    if (!shown || busy) {
      return;
    }

    button.current?.focus({ focusVisible: true, preventScroll: true });
  }, [busy, shown]);

  if (!shown) {
    return null;
  }

  let icon = <Bs.BsPlayFill aria-hidden />;

  if (ended) {
    icon = <Bs.BsArrowRepeat aria-hidden />;
  }

  if (busy) {
    icon = <Bs.BsArrowClockwise aria-hidden className='is-revolving' />;
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
            {t('prompt', { context: ended ? 'replay' : 'start' })}
          </Heading>
          <Button
            aria-labelledby={label}
            disabled={busy}
            onClick={() => void play()}
            ref={button}
            size='large'
            variant='secondary'
          >
            {icon}
          </Button>
        </div>
      </Animation>
    </Layout>
  );
};

export { Prompt };
