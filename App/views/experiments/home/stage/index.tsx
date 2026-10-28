import React from 'react';

// Libraries
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

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
import {
  CLASS_NAME as HOME,
  EXPERIMENTS,
} from '@/views/experiments/home/constants';

const CLASS_NAME = `${HOME}__stage`;

/** Newest first; the number shown keeps the order they were made in. */
const SCREENS = EXPERIMENTS.map((experiment, index) => ({
  ...experiment,
  number: index + 1,
})).reverse();

/**
 * A sticky stage, one screen tall, framed below the global header, that stays pinned while the page
 * scrolls one screen height per panel. Screen does the per-panel motion.
 */
const Stage: React.FunctionComponent = () => {
  const { t: common } = useTranslation();

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
          {SCREENS.map((screen, index) => (
            <Screen
              experiment={screen}
              index={index}
              key={screen.to}
              number={screen.number}
            />
          ))}
        </List>
      </Frame>
      <Pages
        pages={SCREENS.map(({ context, plate }) => ({
          id: plate,
          label: common('experiment', { context }),
        }))}
      />
      {SCREENS.map((screen, index) => (
        <Anchor id={screen.plate} index={index} key={screen.to} />
      ))}
    </section>
  );
};

export { CLASS_NAME, Stage };
