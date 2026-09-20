import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { List } from '@/Components';

// Partials
import Screen from './Screen';

// Styles
import './Styles.scss';

// Constants
import {
  CLASS_NAME as HOME,
  EXPERIMENTS,
} from '@/Views/Experiments/Home/constants';

const CLASS_NAME = `${HOME}__stage`;

/** Newest first; the number shown keeps the order they were made in. */
const SCREENS = EXPERIMENTS.map((experiment, index) => ({
  ...experiment,
  number: index + 1,
})).reverse();

/**
 * A sticky stage, one screen tall, that stays pinned while the page
 * scrolls one screen height per panel. Screen does the per-panel motion.
 */
const Stage: React.FunctionComponent = () => (
  <div
    className={`${CLASS_NAME}__scroll`}
    style={
      { '--kicl--views--experiments__home--screens': SCREENS.length } as never
    }
  >
    <div className={classNames(CLASS_NAME, 'kicl-position-sticky')}>
      <List is='ol' className={`${CLASS_NAME}__list`} gap='none'>
        {SCREENS.map((screen, index) => (
          <Screen
            experiment={screen}
            index={index}
            key={screen.to}
            number={screen.number}
            titleIs={index === 0 ? 'h1' : 'h2'}
          />
        ))}
      </List>
    </div>
  </div>
);

export { CLASS_NAME };
export default Stage;
