import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { ListItem } from '@/components';

// Context
import { ScreenProvider } from './context';

// Partials
import { Plate } from './plate';
import { Words } from './words';

// Styles
import './styles.scss';

// Constants
import type { Experiment } from '@/views/experiments/home/constants';
import { CLASS_NAME } from './constants';

type Props = {
  experiment: Experiment;
  /** Position in the stage, from the top. Sets the scroll ranges. */
  index: number;
  number: number;
};

/**
 * One full-screen panel: a background that fades in and drifts, and a
 * text block that rides in from below, holds, and is pushed off by the
 * next panel's block. All of it is scroll-driven CSS; see styles.scss.
 *
 * The item is the grid and ignores the pointer: stacked above the panel
 * below, it would block that panel's link. Only the text block takes it.
 */
const Screen: React.FunctionComponent<Props> = ({
  experiment,
  index,
  number,
}) => (
  <ScreenProvider experiment={experiment} number={number}>
    <ListItem
      alignContent='end'
      autoFlow='row'
      gap='none'
      className={classNames(
        CLASS_NAME,
        `${CLASS_NAME}--${experiment.plate}`,
        // The image agent's scrim is dark in both themes, as on its own page.
        { 'kicl--theme--dark': experiment.plate === 'image-agent' },
        'kicl-pointer-events-none',
        'kicl-position-relative'
      )}
      style={{ '--kicl--views--experiments__home--index': index } as never}
    >
      <div
        className={classNames(`${CLASS_NAME}__crop`, 'kicl-position-absolute')}
      >
        <Plate />
      </div>
      <Words />
    </ListItem>
  </ScreenProvider>
);

export { CLASS_NAME, Screen };
