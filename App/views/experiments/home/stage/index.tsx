import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Frame, List } from 'design/components';

// Hooks
import { useHashScroll } from './use-hash-scroll';

// Partials
import { Anchor } from './anchor';
import { Pages } from './pages';
import { Screen } from './screen';

// Styles
import './styles.scss';

// Constants
import { CLASS_NAME as HOME } from '@/views/experiments/home/constants';
import { SCREENS } from './screens';

const CLASS_NAME = `${HOME}__stage`;

/**
 * A sticky stage, one screen tall, framed below the global header, that stays pinned while the page
 * scrolls one screen height per panel. Screen does the per-panel motion.
 */
const Stage: React.FunctionComponent = () => {
  useHashScroll();

  return (
    <section
      className={classNames(
        `${CLASS_NAME}__scroll`,
        // Keeps the frame's top margin inside the stage.
        'kicl-display-flow-root',
        'kicl-position-relative'
      )}
      style={
        { '--kicl--views--experiments__home--screens': SCREENS.length } as never
      }
    >
      <Frame>
        <List
          className={classNames(
            CLASS_NAME,
            'kicl-inset-block-start-frame',
            'kicl-position-sticky'
          )}
          is='ol'
          gap='none'
        >
          {SCREENS.map(({ experiment }) => {
            return <Screen key={experiment.plate} plate={experiment.plate} />;
          })}
        </List>
      </Frame>
      <Pages />
      {SCREENS.map(({ experiment }) => {
        return <Anchor key={experiment.plate} plate={experiment.plate} />;
      })}
    </section>
  );
};

export { Stage };
